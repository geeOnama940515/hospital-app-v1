#!/bin/bash

echo "🏥 Starting Hospital Management System..."

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

# Build and start the application
echo "🔧 Building and starting the application..."
docker-compose -f docker-compose.simple.yml up --build

echo "✅ Hospital Management System is running!"
echo "🌐 Open your browser and go to: http://localhost:3000"