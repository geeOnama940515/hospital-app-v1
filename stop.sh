#!/bin/bash

echo "🛑 Stopping Hospital Management System..."

# Stop all containers
docker-compose -f docker-compose.simple.yml down

echo "✅ Hospital Management System stopped!"