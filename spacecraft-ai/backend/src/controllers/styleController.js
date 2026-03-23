import { stylesDB, roomPurposesDB, moodsDB, roomTypesDB, budgetPresetsDB } from '../data/styles.js';

// Get all available styles
export const getStyles = (req, res) => {
  try {
    const styles = stylesDB.map(style => ({
      id: style.id,
      name: style.name,
      description: style.description,
      characteristics: style.characteristics,
      budgetRange: style.budgetRange
    }));

    res.json({
      success: true,
      data: styles,
      metadata: {
        total: styles.length,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get specific style details
export const getStyleById = (req, res) => {
  try {
    const { styleId } = req.params;
    const style = stylesDB.find(s => s.id === styleId);

    if (!style) {
      return res.status(404).json({ error: 'Style not found' });
    }

    res.json({
      success: true,
      data: style
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get related data (room types, moods, etc.)
export const getStyleMetadata = (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        roomPurposes: roomPurposesDB,
        moods: moodsDB,
        roomTypes: roomTypesDB,
        budgetPresets: budgetPresetsDB
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getStyles,
  getStyleById,
  getStyleMetadata
};
