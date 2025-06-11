#!/bin/bash

# Health Check Script for Hospital Management System

echo "🏥 Hospital Management System Health Check"
echo "=========================================="

# Check if services are running
check_service() {
    local service_name=$1
    local port=$2
    local host=${3:-localhost}
    
    if curl -f -s "http://${host}:${port}/health" > /dev/null 2>&1 || \
       curl -f -s "http://${host}:${port}" > /dev/null 2>&1; then
        echo "✅ $service_name is healthy"
        return 0
    else
        echo "❌ $service_name is not responding"
        return 1
    fi
}

# Check database connection
check_database() {
    if docker-compose exec -T postgres pg_isready -U hospital_user -d hospital_db > /dev/null 2>&1; then
        echo "✅ PostgreSQL database is healthy"
        return 0
    else
        echo "❌ PostgreSQL database is not responding"
        return 1
    fi
}

# Check Redis connection
check_redis() {
    if docker-compose exec -T redis redis-cli ping > /dev/null 2>&1; then
        echo "✅ Redis is healthy"
        return 0
    else
        echo "❌ Redis is not responding"
        return 1
    fi
}

# Check disk space
check_disk_space() {
    local usage=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
    if [ $usage -lt 80 ]; then
        echo "✅ Disk space is healthy ($usage% used)"
        return 0
    else
        echo "⚠️  Disk space is getting low ($usage% used)"
        return 1
    fi
}

# Check memory usage
check_memory() {
    local usage=$(free | awk 'NR==2{printf "%.0f", $3*100/$2}')
    if [ $usage -lt 80 ]; then
        echo "✅ Memory usage is healthy ($usage% used)"
        return 0
    else
        echo "⚠️  Memory usage is high ($usage% used)"
        return 1
    fi
}

# Main health check
main() {
    local failed=0
    
    echo "Checking services..."
    check_service "Hospital App" 3000 || failed=$((failed + 1))
    check_service "Nginx" 80 || failed=$((failed + 1))
    check_database || failed=$((failed + 1))
    check_redis || failed=$((failed + 1))
    
    echo ""
    echo "Checking system resources..."
    check_disk_space || failed=$((failed + 1))
    check_memory || failed=$((failed + 1))
    
    echo ""
    echo "=========================================="
    if [ $failed -eq 0 ]; then
        echo "🎉 All systems are healthy!"
        exit 0
    else
        echo "⚠️  $failed issue(s) detected"
        exit 1
    fi
}

main