@echo off
title FlowForge Setup

echo 🚀 Setting up FlowForge - Mini Zapier Clone

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed. Please install Docker first.
    pause
    exit /b 1
)

echo ✅ Docker is installed

REM Create necessary directories
echo 📁 Creating directories...
mkdir redis 2>nul

REM Build and start services
echo 🐳 Building and starting services...
docker-compose up -d

echo ⏳ Waiting for services to start...
timeout /t 10 /nobreak >nul

REM Check if services are running
echo 🔍 Checking service status...
docker-compose ps

echo ✅ Setup complete!
echo.
echo 📝 Next steps:
echo 1. Update the .env files in frontend/ and backend/ with your API keys
echo 2. Access the application at http://localhost:3000
echo 3. The API is available at http://localhost:5000
echo.
echo 🔧 To stop the services, run: docker-compose down
echo 🔄 To rebuild the services, run: docker-compose up -d --build
echo.
pause