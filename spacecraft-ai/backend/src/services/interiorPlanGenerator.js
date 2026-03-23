import { furnitureDB } from '../data/furniture.js';
import { stylesDB, roomPurposesDB, moodsDB } from '../data/styles.js';

/**
 * Mock AI Recommendation Engine
 * Generates interior design plans based on room data, style preferences, budget, and mood
 */

class InteriorPlanGenerator {
  constructor() {
    this.furnitureDB = furnitureDB;
    this.stylesDB = stylesDB;
  }

  /**
   * Main function to generate complete interior plan
   */
  generateInteriorPlan(roomData, styleData, budgetData, preferences = {}) {
    const plan = {
      id: `plan-${Date.now()}`,
      timestamp: new Date().toISOString(),
      
      // Basic Info
      roomInfo: roomData,
      styleInfo: styleData,
      budgetInfo: budgetData,
      
      // Generated Content
      styleSummary: this.generateStyleSummary(styleData, roomData),
      colorPalette: this.generateColorPalette(styleData, budgetData.mood),
      recommendedFurniture: this.recommendFurniture(roomData, styleData, budgetData, preferences),
      decorSuggestions: this.generateDecorSuggestions(styleData, budgetData.mood),
      lightingSuggestion: this.generateLightingSuggestion(styleData, roomData),
      storageSuggestions: this.generateStorageSuggestions(roomData, styleData, budgetData),
      
      // Budget Breakdown
      budgetBreakdown: this.calculateBudgetBreakdown(roomData, styleData, budgetData),
      
      // Space Analysis
      spaceAnalysis: this.analyzeSpace(roomData, styleData, budgetData),
      
      // Warnings & Tips
      warnings: this.generateWarnings(roomData, styleData, budgetData),
      tips: this.generateTips(roomData, styleData, budgetData),
      
      // Scores
      scores: this.calculateScores(roomData, styleData, budgetData)
    };

    return plan;
  }

  /**
   * Generate style summary text
   */
  generateStyleSummary(styleData, roomData) {
    const styleDescriptions = {
      'style-modern': 'Modern style emphasizes clean lines, functionality, and contemporary design principles.',
      'style-minimal': 'Minimalist approach focuses on essential items only, creating a peaceful and uncluttered space.',
      'style-scandinavian': 'Scandinavian design combines beauty with functionality, featuring light colors and natural materials.',
      'style-boho': 'Bohemian style celebrates individuality with eclectic art, natural materials, and rich textures.',
      'style-industrial': 'Industrial design draws from warehouse aesthetics, featuring raw materials and exposed elements.',
      'style-traditional': 'Traditional style brings classic elegance with ornate details and timeless furniture.',
      'style-cozy': 'Cozy design creates warm, intimate spaces with comfortable furniture and soft textures.'
    };

    const summary = styleDescriptions[styleData.styleId] || 'Contemporary interior design';
    const roomType = roomData.roomType || 'room';
    
    return `${summary} We'll optimize this ${roomType} for comfort and functionality while maintaining aesthetic appeal.`;
  }

  /**
   * Generate color palette based on style and mood
   */
  generateColorPalette(styleData, mood) {
    const style = this.stylesDB.find(s => s.id === styleData.styleId);
    
    if (!style || !style.colorPalettes) {
      return {
        name: 'Neutral',
        colors: ['#FFFFFF', '#F5F5F5', '#8B8B8B', '#2C2C2C'],
        theme: 'neutral'
      };
    }

    // Select based on mood
    let selectedPalette = style.colorPalettes[0];
    
    if (mood === 'mood-calm' && style.colorPalettes.length > 1) {
      selectedPalette = style.colorPalettes.find(p => p.name.includes('Blue') || p.name.includes('Light')) || style.colorPalettes[0];
    } else if (mood === 'mood-luxury' && style.colorPalettes.length > 1) {
      selectedPalette = style.colorPalettes.find(p => p.name.includes('Gold') || p.name.includes('Luxury')) || style.colorPalettes[0];
    }

    return {
      ...selectedPalette,
      walls: selectedPalette.colors[0],
      accents: selectedPalette.colors[selectedPalette.colors.length - 1],
      highlights: selectedPalette.colors[Math.floor(selectedPalette.colors.length / 2)]
    };
  }

  /**
   * Recommend furniture based on room, style, and budget
   */
  recommendFurniture(roomData, styleData, budgetData, preferences = {}) {
    const style = this.stylesDB.find(s => s.id === styleData.styleId);
    const stylePreferences = style?.furniturePreferences || [];
    const budget = budgetData.amount;
    const priority = budgetData.priority || 'balanced';
    const isCompact = roomData.area <= 12 || roomData.compact;

    // Filter furniture based on criteria
    let availableFurniture = this.furnitureDB.filter(item => {
      // Check style match
      const styleMatch = item.style.some(s => stylePreferences.includes(s));
      if (!styleMatch) return false;

      // Check budget fit
      if (item.price > budget * 0.8) return false;

      // Check space fit
      if (isCompact && !item.compact) return false;

      return true;
    });

    // Prioritize based on budget constraints
    if (priority === 'budget') {
      availableFurniture.sort((a, b) => a.price - b.price);
    } else if (priority === 'storage') {
      availableFurniture.sort((a, b) => {
        const aStorage = a.category === 'storage' ? 1 : 0;
        const bStorage = b.category === 'storage' ? 1 : 0;
        return bStorage - aStorage;
      });
    }

    // Select recommended items
    const recommendations = {
      essentials: this.selectEssentialFurniture(availableFurniture, roomData),
      optional: this.selectOptionalFurniture(availableFurniture, roomData),
      budget: this.calculateTotalCost(availableFurniture.slice(0, 5))
    };

    return recommendations;
  }

  /**
   * Select essential furniture based on room type
   */
  selectEssentialFurniture(furniture, roomData) {
    const essentials = [];
    const categories = ['bed', 'desk', 'lighting', 'storage'];

    for (const category of categories) {
      const item = furniture.find(f => f.category === category);
      if (item && essentials.length < 4) {
        essentials.push({
          ...item,
          reason: `Essential for ${category}`
        });
      }
    }

    return essentials;
  }

  /**
   * Select optional/complementary furniture
   */
  selectOptionalFurniture(furniture, roomData) {
    const optional = furniture
      .filter(f => !['bed', 'desk', 'lighting'].includes(f.category))
      .slice(0, 3)
      .map(item => ({
        ...item,
        reason: 'Recommended for aesthetic and functionality'
      }));

    return optional;
  }

  /**
   * Calculate total cost
   */
  calculateTotalCost(items) {
    return items.reduce((sum, item) => sum + (item.price || 0), 0);
  }

  /**
   * Generate decor suggestions
   */
  generateDecorSuggestions(styleData, mood) {
    const style = this.stylesDB.find(s => s.id === styleData.styleId);
    const suggestions = style?.decorSuggestions || [];

    const moodAdditions = {
      'mood-calm': ['soft curtains', 'nature wall art'],
      'mood-productive': ['motivational quotes', 'desk organizer'],
      'mood-luxury': ['decorative mirrors', 'premium wall art'],
      'mood-aesthetic': ['instagram-worthy art', 'trendy accessories']
    };

    return [
      ...suggestions,
      ...(moodAdditions[mood] || [])
    ];
  }

  /**
   * Generate lighting suggestions
   */
  generateLightingSuggestion(styleData, roomData) {
    const suggestions = {
      'style-modern': 'Minimalist LED strips or track lighting for modern aesthetics',
      'style-minimal': 'Single focal light source with clean lines',
      'style-scandinavian': 'Warm white lighting with natural materials like wooden fixtures',
      'style-boho': 'Layered lighting with warm tones and decorative fixtures',
      'style-industrial': 'Exposed bulbs, metal fixtures, and Edison bulbs',
      'style-traditional': 'Classic chandeliers or brass fixtures with warm ambiance',
      'style-cozy': 'Warm, diffused lighting with table lamps and mood lights'
    };

    const windowScore = roomData.windows ? Math.min(roomData.windows, 3) : 1;
    const natural = windowScore > 1 ? 'Utilize natural light from windows. ' : '';
    
    return natural + (suggestions[styleData.styleId] || 'Ambient and task lighting combination');
  }

  /**
   * Generate storage suggestions
   */
  generateStorageSuggestions(roomData, styleData, budgetData) {
    const isSmallRoom = roomData.area <= 12;
    const budget = budgetData.amount;
    
    const suggestions = [];

    if (isSmallRoom) {
      suggestions.push('Wall-mounted shelves for vertical storage');
      suggestions.push('Under-bed storage boxes for maximum space utilization');
      suggestions.push('Multi-functional furniture with built-in storage');
    } else {
      suggestions.push('Floor-standing bookshelf or cabinet');
      suggestions.push('Closet organization system');
    }

    if (budget < 15000) {
      suggestions.push('DIY storage solutions using cardboard boxes and fabric');
    }

    if (styleData.styleId === 'style-minimal') {
      suggestions.push('Hidden storage to maintain clean aesthetic');
    }

    return suggestions;
  }

  /**
   * Calculate budget breakdown by category
   */
  calculateBudgetBreakdown(roomData, styleData, budgetData) {
    const budget = budgetData.amount;
    const allocation = {
      furniture: Math.round(budget * 0.45),
      storage: Math.round(budget * 0.15),
      lighting: Math.round(budget * 0.15),
      decor: Math.round(budget * 0.15),
      miscellaneous: Math.round(budget * 0.10)
    };

    // Adjust for room type
    if (roomData.roomType === 'room-office' || roomData.roomType === 'purpose-work') {
      allocation.furniture = Math.round(budget * 0.50);
      allocation.lighting = Math.round(budget * 0.20);
    }

    return {
      totalBudget: budget,
      allocation,
      categoryPercentages: {
        furniture: 45,
        storage: 15,
        lighting: 15,
        decor: 15,
        miscellaneous: 10
      }
    };
  }

  /**
   * Analyze space and generate scores
   */
  analyzeSpace(roomData, styleData, budgetData) {
    const area = roomData.area || 15;
    const isSmallRoom = area <= 12;
    const hasWindows = roomData.windows > 0;
    const furnitureCount = roomData.existingFurniture?.length || 0;

    return {
      roomSize: area,
      classification: isSmallRoom ? 'small' : area <= 25 ? 'medium' : 'large',
      naturalLighting: hasWindows ? 'good' : 'limited',
      ventilation: roomData.doors > 0 ? 'adequate' : 'needs-improvement',
      currentUtilization: furnitureCount > 5 ? 'overutilized' : furnitureCount > 2 ? 'moderate' : 'underutilized'
    };
  }

  /**
   * Generate warning messages
   */
  generateWarnings(roomData, styleData, budgetData) {
    const warnings = [];
    const area = roomData.area || 15;

    // Space-related warnings
    if (area <= 10) {
      warnings.push({
        type: 'space',
        message: 'Very compact room - prioritize multi-functional furniture',
        severity: 'high'
      });
    }

    if (area <= 12 && roomData.existingFurniture?.length > 5) {
      warnings.push({
        type: 'space',
        message: 'Room may feel cluttered with current furniture count',
        severity: 'medium'
      });
    }

    // Lighting warnings
    if (!roomData.windows) {
      warnings.push({
        type: 'lighting',
        message: 'No windows detected - invest in good artificial lighting',
        severity: 'medium'
      });
    }

    // Budget warnings
    if (budgetData.amount < 5000) {
      warnings.push({
        type: 'budget',
        message: 'Very tight budget - focus on essentials only',
        severity: 'medium'
      });
    }

    // Style-specific warnings
    if (styleData.styleId === 'style-minimal' && roomData.existingFurniture?.length > 5) {
      warnings.push({
        type: 'style',
        message: 'Minimize current furniture for true minimalist aesthetic',
        severity: 'low'
      });
    }

    return warnings;
  }

  /**
   * Generate actionable tips
   */
  generateTips(roomData, styleData, budgetData) {
    const tips = [];
    const area = roomData.area || 15;

    if (area <= 12) {
      tips.push('Use lighter wall colors to make the room appear larger');
      tips.push('Utilize vertical space with wall-mounted storage');
      tips.push('Choose furniture with built-in storage to save space');
    }

    tips.push('Place desk near window for natural light during work');
    tips.push('Use mirrors to create illusion of more space');
    tips.push('Organize cables and wires for a cleaner look');

    if (styleData.styleId === 'style-modern') {
      tips.push('Maintain consistent color palette with no more than 3 colors');
    }

    if (budgetData.amount < 15000) {
      tips.push('Shop during sales and discounts to stretch budget');
      tips.push('Consider second-hand furniture for better value');
    }

    return tips;
  }

  /**
   * Calculate various scores for the space
   */
  calculateScores(roomData, styleData, budgetData) {
    const area = roomData.area || 15;
    const hasWindows = roomData.windows > 0;
    const furnitureCount = roomData.existingFurniture?.length || 0;
    const budget = budgetData.amount;

    // Walkability score (0-100)
    const walkabilityScore = Math.max(20, Math.min(100, 100 - (furnitureCount * 10) + (area * 2)));

    // Storage efficiency (0-100)
    const storageScore = Math.max(30, Math.min(100, 50 + (budget / 1000) - (area * 2)));

    // Natural light score (0-100)
    const lightScore = hasWindows ? (roomData.windows > 1 ? 85 : 70) : 40;

    // Visual openness (0-100)
    const opennessScore = Math.max(20, Math.min(100, 100 - (furnitureCount * 8) + (area * 1.5)));

    // Overall usability score (0-100)
    const overallScore = Math.round((walkabilityScore + storageScore + lightScore + opennessScore) / 4);

    return {
      walkabilityScore,
      storageEfficiency: storageScore,
      naturalLight: lightScore,
      visualOpenness: opennessScore,
      overallUsability: overallScore,
      recommendation: overallScore >= 75 ? 'Excellent' : overallScore >= 60 ? 'Good' : 'Needs Improvement'
    };
  }

  /**
   * Customize existing plan
   */
  customizePlan(existingPlan, modifications) {
    let updatedPlan = { ...existingPlan };

    if (modifications.wallColor) {
      updatedPlan.colorPalette.walls = modifications.wallColor;
    }

    if (modifications.flooringType) {
      updatedPlan.flooring = modifications.flooringType;
    }

    if (modifications.budgetAdjustment) {
      updatedPlan.budgetInfo.amount = modifications.budgetAdjustment;
      updatedPlan.budgetBreakdown = this.calculateBudgetBreakdown(
        existingPlan.roomInfo,
        existingPlan.styleInfo,
        updatedPlan.budgetInfo
      );
    }

    if (modifications.additionalFurniture) {
      const newCost = modifications.additionalFurniture.reduce((sum, item) => sum + item.price, 0);
      updatedPlan.budgetBreakdown.totalBudget += newCost;
      updatedPlan.recommendedFurniture.optional = [
        ...(updatedPlan.recommendedFurniture.optional || []),
        ...modifications.additionalFurniture
      ];
    }

    // Recalculate scores with updated budget
    updatedPlan.scores = this.calculateScores(
      existingPlan.roomInfo,
      existingPlan.styleInfo,
      updatedPlan.budgetInfo
    );

    return updatedPlan;
  }
}

export default new InteriorPlanGenerator();
