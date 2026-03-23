/**
 * Image Controller
 * Handles image upload, generation, and retrieval
 */

const path = require('path');
const fs = require('fs');
const ImageGenerationService = require('../services/imageGeneration/imageGenerationService');
const ProviderManager = require('../providers');

const imageService = new ImageGenerationService();
const uploadDir = path.join(__dirname, '../../uploads');

// Store uploaded images metadata (in production, use database)
const uploadedImages = new Map();

/**
 * Upload room image
 */
const uploadRoomImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No image file uploaded'
      });
    }

    const imageData = imageService.saveUploadedImage(
      req.file.buffer,
      req.file.originalname
    );

    // Store metadata
    uploadedImages.set(imageData.id, imageData);

    res.status(200).json({
      success: true,
      image: imageData,
      message: 'Image uploaded successfully'
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Generate AI room design from uploaded image
 */
const generateRoomDesign = async (req, res) => {
  try {
    const {
      imageId,
      roomType,
      style,
      mood,
      budget,
      purpose,
      priority,
      isStudentMode,
      provider
    } = req.body;

    // Validate required fields
    if (!imageId || !roomType || !style) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: imageId, roomType, style'
      });
    }

    // Get uploaded image
    const imageData = uploadedImages.get(imageId);
    if (!imageData) {
      return res.status(404).json({
        success: false,
        error: `Image not found: ${imageId}`
      });
    }

    // Send immediate response indicating processing started
    res.status(202).json({
      success: true,
      message: 'Room design generation started. Processing...',
      processing: true
    });

    // Generate design asynchronously (would use job queue in production)
    const designData = {
      roomType,
      style,
      mood: mood || 'calm',
      budget: budget || 'medium',
      purpose: purpose || 'general',
      priority: priority || 'aesthetics',
      isStudentMode: isStudentMode || false
    };

    const result = await imageService.generateRoomDesign(
      imageData.filepath,
      designData,
      { provider: provider || 'mock' }
    );

    // Store result
    if (result.success) {
      uploadedImages.set(imageId, {
        ...imageData,
        generatedImage: result.outputImage,
        generationResult: result
      });

      console.log('Room design generated successfully:', imageId);
    } else {
      console.error('Room design generation failed:', result.error);
    }
  } catch (error) {
    console.error('Generation error:', error);
    // Error response already sent (202), but log the error
  }
};

/**
 * Regenerate room design with different parameters
 */
const regenerateRoomDesign = async (req, res) => {
  try {
    const {
      imageId,
      roomType,
      style,
      mood,
      budget,
      priority,
      provider
    } = req.body;

    if (!imageId) {
      return res.status(400).json({
        success: false,
        error: 'Missing imageId'
      });
    }

    const imageData = uploadedImages.get(imageId);
    if (!imageData) {
      return res.status(404).json({
        success: false,
        error: `Image not found: ${imageId}`
      });
    }

    const designData = {
      roomType: roomType || 'living room',
      style: style || 'modern',
      mood: mood || 'calm',
      budget: budget || 'medium',
      priority: priority || 'aesthetics'
    };

    const result = await imageService.generateRoomDesign(
      imageData.filepath,
      designData,
      { provider: provider || 'mock' }
    );

    if (result.success) {
      uploadedImages.set(imageId, {
        ...imageData,
        generatedImage: result.outputImage,
        generationResult: result
      });

      res.status(200).json({
        success: true,
        ...result
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error
      });
    }
  } catch (error) {
    console.error('Regeneration error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get image file
 */
const getImage = (req, res) => {
  try {
    const { filename } = req.params;

    // Security: prevent directory traversal
    if (filename.includes('..')) {
      return res.status(403).json({
        success: false,
        error: 'Access denied'
      });
    }

    const filepath = path.join(uploadDir, filename);

    // Check if file exists
    if (!fs.existsSync(filepath)) {
      return res.status(404).json({
        success: false,
        error: 'Image not found'
      });
    }

    // Send file
    res.sendFile(filepath);
  } catch (error) {
    console.error('Get image error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get provider status
 */
const getProviderStatus = async (req, res) => {
  try {
    const status = await ProviderManager.getProvidersStatus();

    res.status(200).json({
      success: true,
      providers: status,
      activeProvider: process.env.IMAGE_PROVIDER || 'mock'
    });
  } catch (error) {
    console.error('Provider status error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  uploadRoomImage,
  generateRoomDesign,
  regenerateRoomDesign,
  getImage,
  getProviderStatus
};
