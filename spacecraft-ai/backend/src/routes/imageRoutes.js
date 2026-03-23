/**
 * Image Routes
 * Handles image upload, AI generation, and regeneration
 */

const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const imageController = require('../controllers/imageController');

/**
 * POST /api/images/upload
 * Upload a room image
 * Returns: {imageId, filename, filepath, url, metadata}
 */
router.post('/upload', upload.single('roomImage'), imageController.uploadRoomImage);

/**
 * POST /api/images/generate
 * Generate AI-redesigned room image
 * Body: {
 *   imageId,
 *   roomType,
 *   style,
 *   mood,
 *   budget,
 *   purpose,
 *   priority,
 *   isStudentMode (optional),
 *   provider (optional, 'mock', 'openai', 'replicate')
 * }
 * Returns: {success, outputImage, prompt, designData, etc}
 */
router.post('/generate', imageController.generateRoomDesign);

/**
 * POST /api/images/regenerate
 * Regenerate with different parameters
 * Body: {imageId, roomType, style, mood, budget, priority, provider}
 * Returns: {success, outputImage, ...}
 */
router.post('/regenerate', imageController.regenerateRoomDesign);

/**
 * GET /api/images/uploads/:filename
 * Serve uploaded or generated images
 */
router.get('/uploads/:filename', imageController.getImage);

/**
 * GET /api/images/provider-status
 * Get status of all image generation providers
 */
router.get('/provider-status', imageController.getProviderStatus);

module.exports = router;
