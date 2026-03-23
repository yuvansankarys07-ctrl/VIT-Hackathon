import { create } from 'zustand';

// Design wizard store
export const useDesignStore = create((set) => ({
  // Room data
  roomData: {
    roomType: 'bedroom',
    area: 15,
    length: 4,
    width: 3.75,
    height: 2.8,
    doors: 1,
    windows: 1,
    existingFurniture: [],
    imageUrl: null,
  },
  setRoomData: (data) => set((state) => ({
    roomData: { ...state.roomData, ...data },
  })),

  // Style preferences
  styleData: {
    styleId: 'style-modern',
  },
  setStyleData: (data) => set({
    styleData: data,
  }),

  // Budget data
  budgetData: {
    amount: 25000,
    mood: 'mood-productive',
    priority: 'balanced',
  },
  setBudgetData: (data) => set((state) => ({
    budgetData: { ...state.budgetData, ...data },
  })),

  // Generated plan
  currentPlan: null,
  setCurrentPlan: (plan) => set({
    currentPlan: plan,
  }),

  // Customizations
  customizations: {},
  setCustomizations: (mods) => set((state) => ({
    customizations: { ...state.customizations, ...mods },
  })),

  // Wizard step
  step: 1,
  setStep: (step) => set({
    step,
  }),

  // Reset store
  reset: () => set({
    roomData: {
      roomType: 'bedroom',
      area: 15,
      length: 4,
      width: 3.75,
      height: 2.8,
      doors: 1,
      windows: 1,
      existingFurniture: [],
      imageUrl: null,
    },
    styleData: { styleId: 'style-modern' },
    budgetData: { amount: 25000, mood: 'mood-productive', priority: 'balanced' },
    currentPlan: null,
    customizations: {},
    step: 1,
  }),
}));

// Projects store
export const useProjectsStore = create((set) => ({
  projects: [],
  setProjects: (projects) => set({ projects }),
  addProject: (project) => set((state) => ({
    projects: [...state.projects, project],
  })),
  updateProject: (id, updates) => set((state) => ({
    projects: state.projects.map((p) =>
      p.id === id ? { ...p, ...updates } : p
    ),
  })),
  deleteProject: (id) => set((state) => ({
    projects: state.projects.filter((p) => p.id !== id),
  })),
}));

// UI Store
export const useUIStore = create((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
  
  notification: null,
  setNotification: (notification) => set({ notification }),
  
  theme: 'light',
  setTheme: (theme) => set({ theme }),
}));
