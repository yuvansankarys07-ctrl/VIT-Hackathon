#!/bin/bash

# SpaceCraft AI - Quick Start Script
# This script sets up both backend and frontend

echo "🚀 SpaceCraft AI - Quick Setup!"
echo "================================"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js from https://nodejs.org"
    exit 1
fi

echo -e "${GREEN}✓ Node.js found: $(node -v)${NC}"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ npm found: $(npm -v)${NC}"

# Setup Backend
echo -e "\n${BLUE}Setting up Backend...${NC}"
cd backend
if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Backend dependencies installed${NC}"
    else
        echo -e "${RED}❌ Failed to install backend dependencies${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✓ Backend dependencies already installed${NC}"
fi

# Create .env if doesn't exist
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo -e "${GREEN}✓ Created .env file${NC}"
fi

cd ..

# Setup Frontend
echo -e "\n${BLUE}Setting up Frontend...${NC}"
cd frontend
if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
    else
        echo -e "${RED}❌ Failed to install frontend dependencies${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✓ Frontend dependencies already installed${NC}"
fi

# Create .env if doesn't exist
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo -e "${GREEN}✓ Created .env file${NC}"
fi

cd ..

echo -e "\n${GREEN}================================${NC}"
echo -e "${GREEN}✓ Setup Complete!${NC}"
echo -e "${GREEN}================================${NC}"

echo -e "\n${BLUE}To start the project:${NC}"
echo -e "1. ${BLUE}Backend${NC}: cd backend && npm run dev"
echo -e "2. ${BLUE}Frontend${NC}: cd frontend && npm run dev"
echo -e "\n${BLUE}Then open:${NC} http://localhost:5173"
