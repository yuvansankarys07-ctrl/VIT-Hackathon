@echo off
REM SpaceCraft AI - Quick Start Script for Windows
REM This script sets up both backend and frontend

echo.
echo ========================================
echo   SpaceCraft AI - Quick Setup for Windows
echo ========================================
echo.

REM Check Node.js
node -v >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo OK: Node.js found - %NODE_VERSION%

REM Check npm
npm -v >nul 2>&1
if errorlevel 1 (
    echo ERROR: npm is not installed
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo OK: npm found - %NPM_VERSION%

echo.
echo Setting up Backend...
cd backend

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo ERROR: Failed to install backend dependencies
        cd ..
        pause
        exit /b 1
    )
    echo OK: Backend dependencies installed
) else (
    echo OK: Backend dependencies already installed
)

if not exist ".env" (
    copy .env.example .env
    echo OK: Created .env file
)

cd ..

echo.
echo Setting up Frontend...
cd frontend

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo ERROR: Failed to install frontend dependencies
        cd ..
        pause
        exit /b 1
    )
    echo OK: Frontend dependencies installed
) else (
    echo OK: Frontend dependencies already installed
)

if not exist ".env" (
    copy .env.example .env
    echo OK: Created .env file
)

cd ..

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo To start the project:
echo 1. Backend: cd backend ^&^& npm run dev
echo 2. Frontend: cd frontend ^&^& npm run dev
echo.
echo Then open: http://localhost:5173
echo.
pause
