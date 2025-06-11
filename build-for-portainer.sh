#!/bin/bash

echo "🏥 Building Hospital Management System for Portainer..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Build the Docker image
echo "🔧 Building Docker image..."
docker build -f Dockerfile.portainer -t hospital-management:latest .

if [ $? -eq 0 ]; then
    echo "✅ Docker image built successfully!"
    echo ""
    echo "📋 Next steps for Portainer:"
    echo "1. Copy the contents of 'portainer-stack.yml'"
    echo "2. In Portainer, go to Stacks → Add Stack"
    echo "3. Paste the YAML content"
    echo "4. Deploy the stack"
    echo ""
    echo "🌐 Your app will be available at: http://your-server:3000"
else
    echo "❌ Failed to build Docker image"
    exit 1
fi