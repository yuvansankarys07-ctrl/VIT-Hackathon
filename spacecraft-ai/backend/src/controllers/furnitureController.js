import { furnitureDB } from '../data/furniture.js';

// Get all furniture
export const getAllFurniture = (req, res) => {
  try {
    const furniture = furnitureDB.map(item => ({
      id: item.id,
      name: item.name,
      category: item.category,
      price: item.price,
      style: item.style,
      description: item.description,
      compact: item.compact
    }));

    res.json({
      success: true,
      data: furniture,
      metadata: {
        total: furniture.length,
        categories: [...new Set(furniture.map(f => f.category))]
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get furniture by category
export const getFurnitureByCategory = (req, res) => {
  try {
    const { category } = req.params;
    const items = furnitureDB.filter(item => item.category === category);

    if (items.length === 0) {
      return res.status(404).json({ error: `No furniture found in category: ${category}` });
    }

    res.json({
      success: true,
      data: items,
      metadata: {
        category,
        total: items.length
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get specific furniture by ID
export const getFurnitureById = (req, res) => {
  try {
    const { furnitureId } = req.params;
    const item = furnitureDB.find(f => f.id === furnitureId);

    if (!item) {
      return res.status(404).json({ error: 'Furniture not found' });
    }

    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search furniture
export const searchFurniture = (req, res) => {
  try {
    const { query, maxPrice, style, compact } = req.query;

    let results = furnitureDB;

    if (query) {
      const searchTerm = query.toLowerCase();
      results = results.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
      );
    }

    if (maxPrice) {
      results = results.filter(item => item.price <= parseInt(maxPrice));
    }

    if (style) {
      results = results.filter(item => item.style.includes(style));
    }

    if (compact === 'true') {
      results = results.filter(item => item.compact);
    }

    res.json({
      success: true,
      data: results,
      metadata: {
        query: { query, maxPrice, style, compact },
        total: results.length
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getAllFurniture,
  getFurnitureByCategory,
  getFurnitureById,
  searchFurniture
};
