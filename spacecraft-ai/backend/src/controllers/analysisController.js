// Analysis & reporting controller

export const getAnalysisMetrics = (req, res) => {
  try {
    const { planId } = req.params;

    // Mock analysis metrics
    const metrics = {
      planId,
      scores: {
        walkability: Math.floor(Math.random() * 30) + 70,
        storage: Math.floor(Math.random() * 30) + 60,
        lighting: Math.floor(Math.random() * 30) + 65,
        aesthetics: Math.floor(Math.random() * 30) + 75
      },
      efficiency: {
        spaceUtilization: Math.floor(Math.random() * 20) + 75,
        budgetOptimization: Math.floor(Math.random() * 20) + 80,
        functionMatch: Math.floor(Math.random() * 20) + 78
      },
      recommendations: [
        'Consider adding floating shelves for better storage',
        'Use light colors to maximize perceived space',
        'Add task lighting near work areas'
      ]
    };

    res.json({
      success: true,
      data: metrics
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const calculateBudgetAnalysis = (req, res) => {
  try {
    const {
      totalBudget,
      items = []
    } = req.body;

    if (!totalBudget) {
      return res.status(400).json({ error: 'Total budget is required' });
    }

    const totalSpent = items.reduce((sum, item) => sum + (item.price || 0), 0);
    const remaining = totalBudget - totalSpent;
    const percentageUsed = (totalSpent / totalBudget) * 100;

    const analysis = {
      totalBudget,
      totalSpent,
      remaining,
      percentageUsed: Math.round(percentageUsed),
      status: remaining >= 0 ? 'within_budget' : 'over_budget',
      itemCount: items.length,
      averageItemPrice: items.length > 0 ? Math.round(totalSpent / items.length) : 0,
      recommendations: generating_budget_recommendations(percentageUsed, remaining, totalBudget)
    };

    res.json({
      success: true,
      data: analysis
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const generateSpaceReport = (req, res) => {
  try {
    const {
      roomData,
      planData
    } = req.body;

    if (!roomData) {
      return res.status(400).json({ error: 'Room data is required' });
    }

    const area = roomData.area || 15;
    const sizeCategory = area <= 10 ? 'very_small' : area <= 15 ? 'small' : area <= 25 ? 'medium' : 'large';

    const report = {
      area,
      sizeCategory,
      classification: sizeCategory === 'very_small' ? 'Studio/Hostel Room' : 'Residential Space',
      spacePotential: {
        current: area,
        optimized: area * 1.1,
        perceptionImprovement: '10-15%'
      },
      designAdvice: [
        sizeCategory === 'very_small' ? 'Multi-functional furniture is crucial' : 'Room size allows for varied design options',
        roomData.windows > 0 ? 'Maximize natural light through strategic placement' : 'Invest in quality artificial lighting',
        'Use vertical space for storage and visual interest'
      ],
      warnings: [],
      opportunities: []
    };

    if (area <= 10) {
      report.warnings.push('Very limited space - avoid oversized furniture');
      report.opportunities.push('Perfect for minimalist aesthetic');
    }

    if (! roomData.windows || roomData.windows === 0) {
      report.warnings.push('No natural light sources');
      report.opportunities.push('Create ambient lighting design');
    }

    res.json({
      success: true,
      data: report
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper function to generate budget recommendations
function generating_budget_recommendations(percentageUsed, remaining, totalBudget) {
  const recommendations = [];

  if (percentageUsed > 100) {
    recommendations.push(`Over budget by ₹${Math.abs(remaining)}`);
    recommendations.push('Consider removing some optional items');
    recommendations.push('Look for more budget-friendly alternatives');
  } else if (percentageUsed >= 90) {
    recommendations.push('Budget is nearly full');
    recommendations.push('Allocate remaining funds for decor items');
  } else if (percentageUsed >= 70) {
    recommendations.push('Good budget utilization');
    recommendations.push(`₹${remaining} remaining for upgrades or decor`);
  } else {
    recommendations.push('Significant budget remaining');
    recommendations.push('Consider premium items or additional furniture');
    recommendations.push('Build a contingency fund');
  }

  return recommendations;
}

export default {
  getAnalysisMetrics,
  calculateBudgetAnalysis,
  generateSpaceReport
};
