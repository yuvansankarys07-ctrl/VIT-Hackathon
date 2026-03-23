import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Styles API
export const stylesAPI = {
  getAll: () => apiClient.get('/styles'),
  getById: (styleId) => apiClient.get(`/styles/${styleId}`),
};

// Furniture API
export const furnitureAPI = {
  getAll: () => apiClient.get('/furniture'),
  getByCategory: (category) => apiClient.get(`/furniture/category/${category}`),
  search: (query, filters = {}) => apiClient.get('/furniture/search', { params: { query, ...filters } }),
  getById: (id) => apiClient.get(`/furniture/${id}`),
};

// Plans API
export const plansAPI = {
  getAll: () => apiClient.get('/plans'),
  analyzeRoom: (roomData) => apiClient.post('/plans/analyze', roomData),
  generatePlan: (data) => apiClient.post('/plans/generate', data),
  customizePlan: (planId, modifications) => apiClient.put(`/plans/${planId}/customize`, modifications),
};

// Projects API
export const projectsAPI = {
  getAll: () => apiClient.get('/projects'),
  getById: (projectId) => apiClient.get(`/projects/${projectId}`),
  create: (projectData) => apiClient.post('/projects', projectData),
  update: (projectId, data) => apiClient.put(`/projects/${projectId}`, data),
  delete: (projectId) => apiClient.delete(`/projects/${projectId}`),
};

// Analysis API
export const analysisAPI = {
  getMetrics: (planId) => apiClient.get(`/analysis/metrics/${planId}`),
  calculateBudget: (budgetData) => apiClient.post('/analysis/budget', budgetData),
  getSpaceReport: (spaceData) => apiClient.post('/analysis/space-report', spaceData),
};

// Health check
export const healthCheck = () => apiClient.get('/health');

export default apiClient;
