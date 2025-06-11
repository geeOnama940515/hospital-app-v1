#!/bin/bash

# Hospital Management Docker Setup Script

echo "🏥 Setting up Hospital Management System with Docker..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p docker/nginx/ssl
mkdir -p backups
mkdir -p data

# Set executable permissions for backup script
chmod +x docker/backup/backup.sh

# Function to setup development environment
setup_dev() {
    echo "🔧 Setting up development environment..."
    docker-compose -f docker-compose.dev.yml down
    docker-compose -f docker-compose.dev.yml build
    docker-compose -f docker-compose.dev.yml up -d
    
    echo "⏳ Waiting for services to start..."
    sleep 30
    
    echo "✅ Development environment is ready!"
    echo "🌐 Application: http://localhost:3000"
    echo "🗄️  Database Admin: http://localhost:8080"
    echo "   - Server: postgres-dev"
    echo "   - Username: hospital_dev_user"
    echo "   - Password: hospital_dev_password"
    echo "   - Database: hospital_dev_db"
}

# Function to setup production environment
setup_prod() {
    echo "🚀 Setting up production environment..."
    docker-compose down
    docker-compose build
    docker-compose up -d
    
    echo "⏳ Waiting for services to start..."
    sleep 30
    
    echo "✅ Production environment is ready!"
    echo "🌐 Application: http://localhost"
    echo "🔒 For HTTPS, configure SSL certificates in docker/nginx/ssl/"
}

# Function to show logs
show_logs() {
    echo "📋 Showing application logs..."
    if [ "$1" = "dev" ]; then
        docker-compose -f docker-compose.dev.yml logs -f hospital-app-dev
    else
        docker-compose logs -f hospital-app
    fi
}

# Function to backup database
backup_db() {
    echo "💾 Creating database backup..."
    docker-compose exec postgres pg_dump -U hospital_user hospital_db > "backups/manual_backup_$(date +%Y%m%d_%H%M%S).sql"
    echo "✅ Backup completed!"
}

# Function to restore database
restore_db() {
    if [ -z "$1" ]; then
        echo "❌ Please provide backup file path"
        echo "Usage: $0 restore <backup_file>"
        exit 1
    fi
    
    echo "🔄 Restoring database from $1..."
    docker-compose exec -T postgres psql -U hospital_user -d hospital_db < "$1"
    echo "✅ Database restored!"
}

# Function to clean up
cleanup() {
    echo "🧹 Cleaning up Docker resources..."
    docker-compose down
    docker-compose -f docker-compose.dev.yml down
    docker system prune -f
    echo "✅ Cleanup completed!"
}

# Main script logic
case "$1" in
    "dev")
        setup_dev
        ;;
    "prod")
        setup_prod
        ;;
    "logs")
        show_logs "$2"
        ;;
    "backup")
        backup_db
        ;;
    "restore")
        restore_db "$2"
        ;;
    "cleanup")
        cleanup
        ;;
    "stop")
        echo "🛑 Stopping all services..."
        docker-compose down
        docker-compose -f docker-compose.dev.yml down
        echo "✅ All services stopped!"
        ;;
    *)
        echo "🏥 Hospital Management System Docker Setup"
        echo ""
        echo "Usage: $0 {dev|prod|logs|backup|restore|cleanup|stop}"
        echo ""
        echo "Commands:"
        echo "  dev      - Setup development environment"
        echo "  prod     - Setup production environment"
        echo "  logs     - Show application logs (add 'dev' for dev logs)"
        echo "  backup   - Create database backup"
        echo "  restore  - Restore database from backup file"
        echo "  cleanup  - Clean up Docker resources"
        echo "  stop     - Stop all services"
        echo ""
        echo "Examples:"
        echo "  $0 dev                              # Start development environment"
        echo "  $0 prod                             # Start production environment"
        echo "  $0 logs dev                         # Show development logs"
        echo "  $0 restore backups/backup.sql       # Restore from backup"
        ;;
esac