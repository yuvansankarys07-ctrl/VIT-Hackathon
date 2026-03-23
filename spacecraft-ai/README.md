# SpaceCraft AI - AI-Based Home Decor & Interior Visualization Platform

🚀 **Transform rooms with AI-powered interior design that respects your budget!**

## Project Overview

SpaceCraft AI is a full-stack hackathon project that helps users redesign and visualize room interiors before actual implementation. Unlike typical AI image generators, this platform provides **budget-aware recommendations**, **space optimization analysis**, and **practical customization controls**.

### Key Features

✨ **AI Interior Design Generation** - Get intelligent room redesign suggestions
💰 **Budget-Aware Recommendations** - Furniture and decor tailored to your budget
📐 **Space Optimization** - Walkability, storage, and lighting scores
🎨 **Full Customization** - Modify colors, furniture, and layout
📊 **Before & After** - Visual comparison with interactive slider
💾 **Save Projects** - Store and manage your design projects
🎯 **Multiple Design Styles** - Modern, Minimal, Scandinavian, Boho, Industrial, Traditional, Cozy

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 + Vite + Tailwind CSS |
| **Backend** | Node.js + Express.js |
| **State Management** | Zustand |
| **Animations** | Framer Motion |
| **Charts** | Recharts |
| **Database** | Mock JSON (in-memory) |
| **Styling** | Tailwind CSS + Custom CSS |

---

## Project Structure

```
spacecraft-ai/
├── backend/              # Node.js API server
│   ├── src/
│   │   ├── controllers/  # Route handlers
│   │   ├── routes/       # API endpoints
│   │   ├── services/     # Mock AI engine
│   │   ├── data/         # Mock databases
│   │   └── server.js     # Express app
│   └── package.json
├── frontend/             # React app
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── store/        # State management
│   │   └── utils/        # API client
│   └── package.json
└── README.md
```

See [FOLDER_STRUCTURE.md](FOLDER_STRUCTURE.md) for detailed file organization.

---

## Quick Start Guide

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### 1. Backend Setup

```bash
cd backend
npm install
npm run dev
```

**Backend runs on:** `http://localhost:5000`

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

**Frontend runs on:** `http://localhost:5173`

### 3. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

---

## API Endpoints

### Styles API
- `GET /api/styles` - Get all design styles
- `GET /api/styles/:styleId` - Get specific style details

### Furniture API
- `GET /api/furniture` - Get all furniture items
- `GET /api/furniture/category/:category` - Get by category
- `GET /api/furniture/search?query=...` - Search furniture
- `GET /api/furniture/:id` - Get specific furniture

### Plans API
- `POST /api/plans/analyze` - Analyze room
- `POST /api/plans/generate` - Generate interior plan
- `PUT /api/plans/:planId/customize` - Customize plan

### Projects API
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `GET /api/projects/:projectId` - Get specific project
- `PUT /api/projects/:projectId` - Update project
- `DELETE /api/projects/:projectId` - Delete project

### Analysis API
- `GET /api/analysis/metrics/:planId` - Get space metrics
- `POST /api/analysis/budget` - Calculate budget analysis
- `POST /api/analysis/space-report` - Generate space report

---

## Feature Walkthrough

### 📱 Landing Page (`/`)
- Hero section with project tagline
- 6 key feature highlights
- Statistics and testimonials
- Call-to-action buttons

### 🎨 Design Wizard (`/design`)
Four-step wizard:

1. **Room Input** - Upload image or enter dimensions
   - Room type selection
   - Dimensions input (length, width, height)
   - Doors and windows count
   - Optional: Upload room photo

2. **Style Selection** - Choose design aesthetic
   - 7 different styles
   - Style characteristics preview
   - Visual icons for each style

3. **Budget & Preferences** - Set budget and priorities
   - Budget presets (₹5k, ₹10k, ₹25k, ₹50k) + custom
   - Mood selection (Calm, Productive, Luxury, Cozy, Aesthetic)
   - Priority selection (Aesthetics, Storage, Comfort, Budget)

4. **Review** - Preview all selections before generation
   - Summary of room data
   - Selected preferences
   - Budget breakdown preview

### 📊 Results Page (`/results`)
Comprehensive design plan with:

- **AI Recommendations**
  - Style summary and reasoning
  - Color palette with hex codes
  - Essential furniture list with prices
  - Optional furniture suggestions
  - Decor and lighting recommendations

- **Budget Breakdown**
  - Total budget allocation
  - Category-wise distribution
  - Pie and bar charts
  - Percentage breakdown

- **Space Analysis**
  - Walkability score
  - Storage efficiency score
  - Natural light score
  - Visual openness score
  - Overall usability recommendation

- **Customization Panel**
  - Wall color picker
  - Flooring type selector
  - Real-time preview

- **Before & After Comparison**
  - Interactive slider
  - Before (original) vs After (redesigned)

### 💾 Saved Projects (`/saved`)
- View all saved design projects
- Load previous designs
- Delete projects
- Project metadata (date, style, budget)

### ℹ️ About Page (`/about`)
- Project mission and vision
- Key differentiators
- Target audience
- Tech stack display

---

## Mock AI Recommendation Engine

The `InteriorPlanGenerator` service simulates AI by:

1. **Analyzing Room Data**
   - Calculates room area
   - Assesses space constraints
   - Identifies natural lighting
   - Evaluates existing furniture

2. **Generating Recommendations**
   - Selects appropriate furniture based on style + budget
   - Creates color palettes matching mood
   - Suggests decor items
   - Provides lighting advice
   - Generates storage solutions

3. **Calculating Scores**
   - Walkability score (0-100)
   - Storage efficiency (0-100)
   - Natural lighting (0-100)
   - Visual openness (0-100)
   - Overall usability score

4. **Providing Warnings & Tips**
   - Space constraints warnings
   - Budget notifications
   - Style-specific tips
   - Furniture placement advice

### Example Output
```json
{
  "id": "plan-1234567890",
  "styleSummary": "Modern design emphasizes clean lines...",
  "colorPalette": {
    "colors": ["#FFFFFF", "#2C2C2C", "#A0A0A0"],
    "walls": "#FFFFFF",
    "accents": "#2C2C2C"
  },
  "recommendedFurniture": {
    "essentials": [
      {
        "id": "bed-1",
        "name": "Minimalist Metal Bed Frame",
        "price": 4500,
        "reason": "Essential for bedroom"
      }
    ]
  },
  "budgetBreakdown": {
    "totalBudget": 25000,
    "allocation": {
      "furniture": 11250,
      "storage": 3750,
      "lighting": 3750,
      "decor": 3750,
      "miscellaneous": 2500
    }
  },
  "scores": {
    "walkabilityScore": 78,
    "storageEfficiency": 72,
    "naturalLight": 85,
    "visualOpenness": 75,
    "overallUsability": 77,
    "recommendation": "Good"
  }
}
```

---

## State Management (Zustand)

### Design Store
```javascript
useDesignStore - Main wizard state
├── roomData - Room dimensions and details
├── styleData - Selected design style
├── budgetData - Budget and preferences
├── currentPlan - Generated AI plan
├── customizations - User modifications
└── step - Current wizard step
```

### Projects Store
```javascript
useProjectsStore - Saved projects
├── projects - Array of saved projects
├── addProject - Add new project
├── updateProject - Update existing
└── deleteProject - Remove project
```

### UI Store
```javascript
useUIStore - Global UI state
├── loading - Loading indicator
├── notification - Toast notifications
└── theme - Light/dark mode
```

---

## Styling System

### Tailwind CSS
- Utility-first approach
- Custom theme colors (Purple, Indigo)
- Responsive grid system
- Pre-defined component classes

### Custom Classes
```css
.btn-primary      - Blue gradient button
.btn-secondary    - White bordered button
.input-base       - Form input styling
.card-soft        - Card with shadow
.glass            - Glassmorphism effect
.text-gradient    - Purple gradient text
```

### Animations (Framer Motion)
- Slide in / Fade in effects
- Hover scale transforms
- Staggered list animations
- Loading spinners
- Progress indicators

---

## Mock Data

### Furniture Database (20+ items)
- **Categories**: Beds, Desks, Chairs, Sofas, Lighting, Storage, Decor
- **Properties**: Price, Style tags, Dimensions, Rental-friendly flag, Student-friendly flag
- **Example**: Minimalist Metal Bed - ₹4,500, 200x120x40cm, student & rental friendly

### Styles Database (7 styles)
- Modern, Minimal, Scandinavian, Boho, Industrial, Traditional, Cozy
- Each with color palettes, furniture preferences, decor suggestions

### Room Types (5 types)
- Bedroom, Study, Living, Office Corner, Hostel
- Pre-defined average sizes

### Budgets (4 presets + custom)
- ₹5,000, ₹10,000, ₹25,000, ₹50,000

### Moods (5 options)
- Calm, Productive, Luxury, Cozy, Aesthetic

---

## Unique Features for Hackathon

### 🎯 Key Differentiators
1. **Budget-First Approach** - All recommendations consider budget constraints
2. **Space Optimization** - Specific scores for walkability and storage
3. **Student/Hostel Mode** - Special presets for budget-conscious users
4. **Practical Warnings** - Furniture placement advice and constraints
5. **Interactive Customization** - Real-time design modifications
6. **No AI API Dependency** - Works with mock AI (future-ready for real APIs)

### 🏆 Hackathon-Ready Features
- ✅ Beautiful modern UI with smooth animations
- ✅ Fast load times with optimized components
- ✅ Fully functional without external AI services
- ✅ Complete project save/load system
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Impressive demo-ready visualizations
- ✅ Practical, unique value proposition
- ✅ Clean, well-organized codebase

---

## How to Extend/Improve

### Future Enhancements

1. **Real AI Integration**
   ```javascript
   // Replace mock engine with real APIs
   - OpenAI Vision for image analysis
   - Stable Diffusion for room visualization
   - Google Cloud Vision for space detection
   ```

2. **E-Commerce Integration**
   ```
   - Link furniture recommendations to Amazon/Flipkart
   - One-click shopping cart
   - Price comparison across platforms
   ```

3. **3D Visualization**
   ```
   - Three.js room models
   - Interactive furniture placement
   - Virtual walkthrough
   ```

4. **Mobile App**
   ```
   - React Native version
   - Camera integration for room capture
   - AR preview of designs
   ```

5. **Database**
   ```
   - MongoDB for projects
   - Authentication system
   - User profiles
   ```

6. **Advanced Features**
   ```
   - Voice input for room description
   - AI chat assistant
   - Design sharing/collaboration
   - Social portfolio system
   ```

---

## Development Guide

### Adding a New Component

1. Create file in appropriate folder: `src/components/feature/ComponentName.jsx`
2. Import Framer Motion for animations
3. Use Tailwind classes for styling
4. Export as default export

Example:
```jsx
import React from 'react';
import { motion } from 'framer-motion';

function MyComponent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 bg-white rounded-lg"
    >
      Content here
    </motion.div>
  );
}

export default MyComponent;
```

### Adding an API Endpoint

1. Create route in `backend/src/routes/nameRoutes.js`
2. Create controller in `backend/src/controllers/nameController.js`
3. Add to server.js route mounting
4. Test with postman/curl

### Deploying

**Frontend (Vercel)**
```bash
npm run build
# Deploy dist/ folder to Vercel
```

**Backend (Render/Railway)**
```bash
npm run build
# Deploy to cloud platform
# Set environment variables
```

---

## Testing

### Local Testing Checklist
- [ ] Fresh npm install works
- [ ] Backend starts without errors
- [ ] Frontend connects to backend
- [ ] Landing page loads
- [ ] Design wizard all 4 steps work
- [ ] Plan generation completes
- [ ] Results page displays properly
- [ ] Save project functionality works
- [ ] Customization panel updates design
- [ ] Before/after slider works
- [ ] Mobile responsive on devices

### API Testing
```bash
# Check backend health
curl http://localhost:5000/api/health

# Get all styles
curl http://localhost:5000/api/styles

# Get all furniture
curl http://localhost:5000/api/furniture

# Generate plan
curl -X POST http://localhost:5000/api/plans/generate \
  -H "Content-Type: application/json" \
  -d '{"roomData":{...}, "styleData":{...}, "budgetData":{...}}'
```

---

## Environment Variables

### Backend (.env)
```
PORT=5000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

---

## Troubleshooting

### Backend Issues

**Port Already in Use**
```bash
# Change PORT in .env or:
lsof -i :5000  # Find process
kill -9 <PID>  # Kill process
```

**Module Not Found**
```bash
cd backend
npm install
```

### Frontend Issues

**CORS Errors**
- Ensure backend is running on port 5000
- Check FRONTEND_URL in backend .env

**Blank Page**
- Check browser console for errors
- Ensure Vite dev server is running
- Clear cache and reload

**Styles Not Loading**
- Rebuild Tailwind CSS: `npm run build`
- Check tailwind.config.js paths

---

## Performance Tips

1. **Code Splitting** - React lazy load pages
2. **Image Optimization** - Use next/image or similar
3. **Memoization** - React.memo for expensive components
4. **Debouncing** - Debounce API calls
5. **Caching** - Browser caching headers
6. **Bundle Size** - Tree shaking, minification

---

## Hackathon Presentation

### 🎤 Pitch (2 minutes)
"SpaceCraft AI is an AI-powered interior design platform that solves a real problem: helping budget-conscious people redesign their rooms. Unlike generic AI image generators, we provide budget-aware furniture recommendations, space optimization analysis, and practical customization controls. Perfect for students, renters, and homeowners."

### 📊 Demo Flow
1. Open landing page - Show features
2. Navigate to design wizard
3. Input room data (use example values)
4. Select style and budget
5. Generate plan - Show loading animation
6. Display results with charts
7. Customize colors and flooring
8. Show before/after slider
9. Save project

### ⭐ Talking Points
- Budget-aware AI (key differentiator)
- Space optimization scores
- Student/hostel targeting (user segment)
- Mock AI architecture (future-ready)
- Beautiful, responsive UI
- Complete project from landing to results
- Practical value for real users

---

## License

MIT License - Built for VIT Hackathon

---

## Support & Questions

For issues or questions about the project:
1. Check the troubleshooting section
2. Review API documentation
3. Examine component prop types
4. Check browser console for errors

---

**Happy designing! 🚀**

Built with ❤️ for the VIT Hackathon
SpaceCraft AI - Transform Your Space with AI
