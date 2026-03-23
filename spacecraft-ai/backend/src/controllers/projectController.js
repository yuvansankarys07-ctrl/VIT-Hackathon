// In-memory project storage
const projectsStore = new Map();

// Get all projects
export const getAllProjects = (req, res) => {
  try {
    const projects = Array.from(projectsStore.values());
    res.json({
      success: true,
      data: projects,
      metadata: {
        total: projects.length
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get specific project
export const getProjectById = (req, res) => {
  try {
    const { projectId } = req.params;
    const project = projectsStore.get(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new project
export const createProject = (req, res) => {
  try {
    const {
      name,
      description,
      roomData,
      plan
    } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Project name is required' });
    }

    const projectId = `project-${Date.now()}`;
    const newProject = {
      id: projectId,
      name,
      description: description || '',
      roomData: roomData || {},
      plan: plan || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    projectsStore.set(projectId, newProject);

    res.status(201).json({
      success: true,
      data: newProject,
      message: 'Project created successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update project
export const updateProject = (req, res) => {
  try {
    const { projectId } = req.params;
    const updates = req.body;

    const project = projectsStore.get(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const updatedProject = {
      ...project,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    projectsStore.set(projectId, updatedProject);

    res.json({
      success: true,
      data: updatedProject,
      message: 'Project updated successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete project
export const deleteProject = (req, res) => {
  try {
    const { projectId } = req.params;

    if (!projectsStore.has(projectId)) {
      return res.status(404).json({ error: 'Project not found' });
    }

    projectsStore.delete(projectId);

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};
