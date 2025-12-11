#!/bin/bash
# Installation & Setup Script for Wedding Invitation App

echo "🎉 Wedding Invitation - Setup Script"
echo "===================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo "📦 Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js not found. Please install Node.js 14+${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v) found${NC}"

# Check npm
echo "📦 Checking npm..."
if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ npm not found${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm $(npm -v) found${NC}"

# Check MongoDB
echo ""
echo "🗄️  Checking MongoDB..."
if ! command -v mongosh &> /dev/null; then
    echo -e "${YELLOW}⚠ MongoDB shell not found. You can install it or use MongoDB Atlas${NC}"
    echo "   To install locally: brew install mongodb-community"
    echo "   To use MongoDB Atlas: Get connection string from https://www.mongodb.com/cloud/atlas"
else
    echo -e "${GREEN}✓ MongoDB found${NC}"
fi

# Setup Backend
echo ""
echo "🔧 Setting up Backend..."
cd backend

if [ ! -d "node_modules" ]; then
    echo "📥 Installing backend dependencies..."
    npm install
    echo -e "${GREEN}✓ Backend dependencies installed${NC}"
else
    echo -e "${GREEN}✓ Backend dependencies already installed${NC}"
fi

if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo -e "${GREEN}✓ .env file created. Please edit with your MongoDB URI${NC}"
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi

cd ..

# Setup Frontend
echo ""
echo "🔧 Setting up Frontend..."
cd frontend

if [ ! -d "node_modules" ]; then
    echo "📥 Installing frontend dependencies..."
    npm install
    echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
else
    echo -e "${GREEN}✓ Frontend dependencies already installed${NC}"
fi

if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    echo "VITE_API_URL=http://localhost:5000/api" > .env
    echo -e "${GREEN}✓ .env file created${NC}"
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi

cd ..

echo ""
echo "✅ Setup Complete!"
echo ""
echo "📚 Next Steps:"
echo "=============="
echo ""
echo "1. Start MongoDB (if using local):"
echo "   brew services start mongodb-community"
echo ""
echo "2. Start Backend (Terminal 1):"
echo "   cd backend && npm run dev"
echo ""
echo "3. Start Frontend (Terminal 2):"
echo "   cd frontend && npm run dev"
echo ""
echo "4. Open browser:"
echo "   http://localhost:5173"
echo ""
echo "📖 Documentation:"
echo "=================="
echo "   - QUICK_REFERENCE.md - Quick commands"
echo "   - FULL_SETUP.md - Complete setup guide"
echo "   - BACKEND_SETUP.md - Backend documentation"
echo "   - FRONTEND_INTEGRATION.md - Integration details"
echo ""
echo -e "${GREEN}Happy wedding! 🎉💕${NC}"
