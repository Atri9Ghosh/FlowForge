#!/bin/bash

# FlowForge Setup Script

echo "🚀 Setting up FlowForge - Mini Zapier Clone"

# Check if Docker is installed
if ! command -v docker &> /dev/null
then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null
then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p redis

# Build and start services
echo "🐳 Building and starting services..."
docker-compose up -d

echo "⏳ Waiting for services to start..."
sleep 10

# Check if services are running
echo "🔍 Checking service status..."
docker-compose ps

echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Update the .env files in frontend/ and backend/ with your API keys"
echo "2. Access the application at http://localhost:3000"
echo "3. The API is available at http://localhost:5000"
echo ""
echo "🔧 To stop the services, run: docker-compose down"
echo "🔄 To rebuild the services, run: docker-compose up -d --build"