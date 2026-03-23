# SpaceCraft AI - Getting Started Guide

## ✨ Welcome!

Thank you for using **SpaceCraft AI** - the AI-powered interior design visualization platform!

This guide will help you get started quickly.

---

## 📋 Prerequisites

Before you begin, make sure you have:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org)
- **npm** (comes with Node.js)
- A modern web browser (Chrome, Firefox, Safari, Edge)

---

## 🚀 Quick Start (Recommended)

### For Mac/Linux:
```bash
chmod +x setup.sh    # Make script executable (first time only)
./setup.sh           # Run setup script
```

### For Windows:
```cmd
setup.bat            # Run setup script
```

This will automatically:
- ✓ Install backend dependencies
- ✓ Install frontend dependencies
- ✓ Create environment files

---

## 🔧 Manual Setup

### Step 1: Backend Setup
```bash
cd backend
npm install
npm run dev
```
✓ Backend will start on `http://localhost:5000`

### Step 2: Frontend Setup (in a new terminal)
```bash
cd frontend
npm install
npm run dev
```
✓ Frontend will start on `http://localhost:5173`

### Step 3: Open Application
Go to your browser and open:
```
http://localhost:5173
```

---

## 📁 Project Structure

```
spacecraft-ai/
├── backend/          ← API server (runs on port 5000)
├── frontend/         ← React app (runs on port 5173)
├── README.md         ← Full documentation
└── FOLDER_STRUCTURE.md ← Detailed file listing
```

---

## 🎯 First Steps

1. **Landing Page** - Explore the features
2. **Design Wizard** - Create your first design
   - Step 1: Enter room dimensions
   - Step 2: Choose design style
   - Step 3: Set budget and mood
   - Step 4: Review and generate
3. **Results** - View AI recommendations
4. **Customize** - Modify colors and flooring
5. **Save** - Store your project

---

## 🔌 API Health Check

After starting the backend, verify it's running:

**Browser**: `http://localhost:5000/api/health`

**Terminal (curl)**:
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-03-23T...",
  "version": "1.0.0"
}
```

---

## 🎨 Create Your First Design

### Room Input
- Select room type (Bedroom, Study, Living, etc.)
- Enter dimensions or upload room photo
- Specify doors and windows

### Style Selection
- Choose from 7 design styles
- Each has unique characteristics
- Preview colors for each style

### Budget & Preferences
- Select budget (₹5k, ₹10k, ₹25k, ₹50k, or custom)
- Choose mood (Calm, Productive, Luxury, Cozy, Aesthetic)
- Set priority (Aesthetics, Storage, Comfort, Budget)

### Generate Design
- Click "Generate Design"
- Get AI recommendations including:
  - Furniture suggestions with prices
  - Color palette
  - Budget breakdown charts
  - Space analysis scores
  - Customization options

---

## 💡 Tips & Tricks

### For Best Results
1. **Be accurate** with room dimensions
2. **Upload a real room photo** if possible for better analysis
3. **Choose budget realistically** for practical recommendations
4. **Explore customization** options to refine design
5. **Save multiple versions** to compare designs

### Student/Budget Mode
- Use ₹5,000 - ₹10,000 budget
- Select "Hostel Room" for small spaces
- Choose "Budget First" priority
- Explore compact furniture options

### Demo Suggestions
Try these combinations for impressive demos:
- **Small Modern Study**: 10m², Modern style, ₹15,000
- **Cozy Bedroom**: 15m², Scandinavian style, ₹35,000
- **Hostel Makeover**: 8m², Minimal style, ₹8,000
- **Premium Living Room**: 25m², Traditional style, ₹60,000

---

## 🐛 Troubleshooting

### Backend Won't Start
```bash
# Check if port 5000 is in use
# Linux/Mac:
lsof -i :5000

# Windows:
netstat -ano | findstr :5000

# Kill the process and try again
```

### Frontend Shows Blank Page
- Check browser console (F12) for errors
- Ensure backend is running on port 5000
- Clear browser cache (Ctrl+Shift+Delete)
- Refresh page (Ctrl+R)

### CORS Errors
- Make sure backend `.env` has correct `FRONTEND_URL`
- Default: `http://localhost:5173`
- Restart backend after changing `.env`

### Dependencies Installation Failed
```bash
# Clear npm cache and try again
npm cache clean --force
npm install
```

---

## 📚 Documentation

- **Full README**: See [README.md](README.md)
- **API Documentation**: See [README.md - API Endpoints section](README.md#api-endpoints)
- **Folder Structure**: See [FOLDER_STRUCTURE.md](FOLDER_STRUCTURE.md)
- **Project Overview**: See [README.md - Project Overview](README.md#project-overview)

---

## 🎮 Try the Demo

### Demo Room Data
```
- Type: Bedroom
- Size: 15m² (4m × 3.75m)
- Height: 2.8m
- Doors: 1
- Windows: 1
- Budget: ₹25,000
- Style: Modern
- Mood: Productive
```

---

##  Useful Commands

### Backend Commands
```bash
cd backend
npm install              # Install dependencies
npm run dev              # Start development server
npm run build            # Build for production
```

### Frontend Commands
```bash
cd frontend
npm install              # Install dependencies
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
```

---

## 📞 Need Help?

1. Check the **Troubleshooting** section above
2. Review **README.md** for detailed documentation
3. Look at component examples in `frontend/src/components`
4. Check backend routes in `backend/src/routes`

---

## 🎉 Ready to Design?

Everything is set up! 

Open **`http://localhost:5173`** and start creating beautiful room designs! ✨

---

**Happy designing with SpaceCraft AI! 🚀**
