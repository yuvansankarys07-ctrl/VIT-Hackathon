# SpaceCraft AI - Complete Folder Structure

```
spacecraft-ai/
├── backend/
│   ├── src/
│   │   ├── controllers/           # Business logic handlers
│   │   │   ├── analysisController.js
│   │   │   ├── furnitureController.js
│   │   │   ├── planController.js
│   │   │   ├── projectController.js
│   │   │   └── styleController.js
│   │   ├── routes/                # API endpoint definitions
│   │   │   ├── analysisRoutes.js
│   │   │   ├── furnitureRoutes.js
│   │   │   ├── planRoutes.js
│   │   │   ├── projectRoutes.js
│   │   │   └── styleRoutes.js
│   │   ├── services/              # Business logic services
│   │   │   └── interiorPlanGenerator.js
│   │   ├── data/                  # Mock database
│   │   │   ├── furniture.js
│   │   │   └── styles.js
│   │   ├── utils/                 # Utility functions
│   │   └── server.js              # Express server entry
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── shared/            # Global components
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   ├── landing/           # Landing page components
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── FeatureCard.jsx
│   │   │   │   ├── StatsSection.jsx
│   │   │   │   └── CTASection.jsx
│   │   │   ├── design/            # Design wizard components
│   │   │   │   ├── StepIndicator.jsx
│   │   │   │   ├── RoomInputStep.jsx
│   │   │   │   ├── StyleSelectionStep.jsx
│   │   │   │   ├── BudgetStep.jsx
│   │   │   │   └── ReviewStep.jsx
│   │   │   └── results/           # Results display components
│   │   │       ├── ResultsDashboard.jsx
│   │   │       ├── BeforeAfterComparison.jsx
│   │   │       ├── BudgetBreakdown.jsx
│   │   │       ├── SpaceAnalysisCard.jsx
│   │   │       └── CustomizationPanel.jsx
│   │   ├── pages/                 # Page components
│   │   │   ├── LandingPage.jsx
│   │   │   ├── DesignPage.jsx
│   │   │   ├── ResultsPage.jsx
│   │   │   ├── SavedPage.jsx
│   │   │   └── AboutPage.jsx
│   │   ├── store/                 # Zustand state management
│   │   │   └── designStore.js
│   │   ├── utils/                 # Utilities
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── package.json                   # Root workspaces
├── .gitignore
└── README.md

```

## Key Files Explanation

### Backend Files
- **server.js**: Main Express server setup with middleware and route mounting
- **interiorPlanGenerator.js**: Mock AI engine that generates interior design plans
- **furniture.js**: Mock furniture database with 20+ items across categories
- **styles.js**: Design styles, room types, moods, and budget presets
- **Controllers**: Handle API request logic and responses

### Frontend Files
- **App.jsx**: Main app router with all page routes
- **designStore.js**: Zustand store for wizard state management
- **api.js**: Axios instance with all API endpoints
- **Pages**: Full-page components for different routes
- **Components**: Reusable components organized by feature

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations
- **Custom CSS**: Global styles and theme variables
