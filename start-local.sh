#!/bin/bash

# Local development script for testing before AWS deployment

echo "🚀 Starting TPshop Local Development Environment"
echo "================================================"

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

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cat > .env << EOL
# Email Configuration
TO_EMAIL=ginoludik@gmail.com
FROM_EMAIL=noreply@tpshop.be

# For testing with Gmail (get app password from Google Account settings)
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-app-password

# Database (for future use)
DB_PASSWORD=localpassword123

# Bot Token (if you have a bot)
BOT_TOKEN=your-bot-token-here
EOL
    echo "✅ .env file created. Please edit it with your credentials."
    echo "   For Gmail, get an app password from: https://myaccount.google.com/apppasswords"
    exit 0
fi

# Start only the essential services for local testing
echo "🐳 Starting email server..."
cd server
npm install
node server.js &
SERVER_PID=$!

echo "🌐 Starting web server..."
python3 -m http.server 8000 &
WEB_PID=$!

echo ""
echo "✅ Local environment started!"
echo ""
echo "📧 Email server: http://localhost:3001/api/health"
echo "🌐 Website: http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop all services"

# Cleanup function
cleanup() {
    echo ""
    echo "🛑 Stopping services..."
    kill $SERVER_PID 2>/dev/null
    kill $WEB_PID 2>/dev/null
    echo "✅ All services stopped"
    exit 0
}

# Set up trap to call cleanup on Ctrl+C
trap cleanup INT

# Wait for interrupt
while true; do
    sleep 1
done