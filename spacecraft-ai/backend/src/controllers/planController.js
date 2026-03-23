import interiorPlanGenerator from '../services/interiorPlanGenerator.js';

// In-memory storage for plans (for hackathon purposes)
const plansStore = new Map();

// Get all plans
export const getAllPlans = (req, res) => {
  try {
    const allPlans = Array.from(plansStore.values());
    res.json({
      success: true,
      data: allPlans,
      metadata: {
        total: allPlans.length,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Analyze room (step 1)
export const analyzeRoom = (req, res) => {
  try {
    const {
      roomType,
      area,
      length,
      width,
      height,
      doors,
      windows,
      existingFurniture,
      imageUrl
    } = req.body;

    // Validate input
    if (!roomType && !area) {
      return res.status(400).json({ error: 'Room type or area is required' });
    }

    const analysis = {
      roomType: roomType || 'bedroom',
      area: area || (length && width ? length * width : 15),
      dimensions: {
        length: length || 4,
        width: width || 3.75,
        height: height || 2.8
      },
      doors: doors || 1,
      windows: windows || 1,
      existingFurniture: existingFurniture || [],
      imageUrl: imageUrl || null,
      analysisTimestamp: new Date().toISOString(),
      recommendations: {
        type: roomType || 'unknown',
        issues: [],
        potentials: []
      }
    };

    // Generate analysis insights
    if (analysis.area <= 10) {
      analysis.recommendations.issues.push('Very small space - prioritize multi-functional furniture');
    }
    if (analysis.windows === 0) {
      analysis.recommendations.issues.push('No windows - focus on artificial lighting');
    }
    if (analysis.existingFurniture.length > 5) {
      analysis.recommendations.issues.push('Consider decluttering before redesign');
    }

    analysis.recommendations.potentials.push('Good opportunity for vertical storage');
    analysis.recommendations.potentials.push('Potential for modern minimalist design');

    res.json({
      success: true,
      data: analysis
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Generate complete interior plan (step 2)
export const generatePlan = (req, res) => {
  try {
    const {
      roomData,
      styleData,
      budgetData,
      preferences
    } = req.body;

    // Validate required data
    if (!roomData || !styleData || !budgetData) {
      return res.status(400).json({
        error: 'Missing required data: roomData, styleData, and budgetData'
      });
    }

    // Generate plan using AI engine
    const plan = interiorPlanGenerator.generateInteriorPlan(
      roomData,
      styleData,
      budgetData,
      preferences
    );

    // Store plan
    plansStore.set(plan.id, plan);

    res.json({
      success: true,
      data: plan,
      metadata: {
        planId: plan.id,
        generatedAt: plan.timestamp
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Customize existing plan (step 3)
export const customizePlan = (req, res) => {
  try {
    const { planId } = req.params;
    const modifications = req.body;

    const existingPlan = plansStore.get(planId);
    if (!existingPlan) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    // Apply customizations
    const customizedPlan = interiorPlanGenerator.customizePlan(
      existingPlan,
      modifications
    );

    // Update store
    plansStore.set(planId, customizedPlan);

    res.json({
      success: true,
      data: customizedPlan,
      message: 'Plan customized successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getAllPlans,
  analyzeRoom,
  generatePlan,
  customizePlan
};
