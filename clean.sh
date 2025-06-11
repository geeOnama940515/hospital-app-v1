#!/bin/bash

echo "🧹 Cleaning up Docker resources..."

# Stop and remove containers
docker-compose -f docker-compose.simple.yml down

# Remove unused Docker resources
docker system prune -f

echo "✅ Cleanup completed!"