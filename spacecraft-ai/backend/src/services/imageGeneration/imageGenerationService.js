/**
 * Image Generation Service
 * Handles uploaded image storage, prompt generation, and AI image generation
 */

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const ProviderManager = require('../../providers');
const AdvancedPromptBuilder = require('../../utils/promptBuilder');

class ImageGenerationService {
  constructor(uploadDir = path.join(__dirname, '../../../uploads')) {
    this.uploadDir = uploadDir;
    this.promptBuilder = new AdvancedPromptBuilder();
    this.ensureUploadDir();
  }

  ensureUploadDir() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  /**
   * Save uploaded image file
   * @param {Buffer} fileBuffer - Image file buffer from multer
   * @param {string} originalFilename - Original filename
   * @returns {Object} - {filename, filepath, url, id}
   */
  saveUploadedImage(fileBuffer, originalFilename) {
    const fileId = uuidv4();
    const ext = path.extname(originalFilename);
    const filename = `${fileId}${ext}`;
    const filepath = path.join(this.uploadDir, filename);

    fs.writeFileSync(filepath, fileBuffer);

    return {
      id: fileId,
      filename: filename,
      filepath: filepath,
      url: `/api/uploads/${filename}`,
      originalName: originalFilename,
      uploadedAt: new Date().toISOString(),
      size: fileBuffer.length
    };
  }

  /**
   * Get stored image by filename
   * @param {string} filename - Image filename
   * @returns {string|null} - File path or null if not found
   */
  getUploadedImage(filename) {
    const filepath = path.join(this.uploadDir, filename);
    if (fs.existsSync(filepath)) {
      return filepath;
    }
    return null;
  }

  /**
   * Generate room redesign using AI
   * @param {string} inputImagePath - Path to uploaded room image
   * @param {Object} designData - {roomType, style, mood, budget, purpose, priority}
   * @param {Object} options - {provider, ...providerOptions}
   * @returns {Promise<Object>}
   */
  async generateRoomDesign(inputImagePath, designData, options = {}) {
    try {
      // Generate detailed prompt based on design preferences
      const prompt = this.buildInteriorDesignPrompt(designData);

      // Get provider (use specified or default)
      const providerName = options.provider || 'mock';
      const provider = ProviderManager.createProvider(providerName);

      console.log(`Generating room design with ${providerName} provider...`);

      // Call AI image generation
      const result = await provider.generateStyledRoomImage(
        inputImagePath,
        prompt,
        options
      );

      return {
        success: true,
        inputImage: inputImagePath,
        outputImage: result.imageUrl,
        prompt: result.prompt,
        designData: designData,
        provider: result.provider,
        generationTime: result.generationTime,
        generatedAt: result.generatedAt,
        metadata: result.metadata
      };
    } catch (error) {
      console.error('Room design generation error:', error);
      return {
        success: false,
        error: error.message,
        inputImage: inputImagePath,
        designData: designData
      };
    }
  }

  /**
   * Build detailed prompt for room redesign based on user preferences
   * Uses advanced prompt builder with multiple guidance layers
   * @param {Object} designData - {roomType, style, mood, budget, purpose, priority}
   * @returns {string} - Detailed image generation prompt
   */
  buildInteriorDesignPrompt(designData) {
    return this.promptBuilder.buildOptimizedPrompt(designData);
  }

  /**
   * Clean up uploaded files (optional maintenance)
   * @param {number} maxAgeHours - Delete files older than this
   */
  cleanupOldUploads(maxAgeHours = 24) {
    const now = Date.now();
    const maxAge = maxAgeHours * 60 * 60 * 1000;

    fs.readdirSync(this.uploadDir).forEach(filename => {
      const filepath = path.join(this.uploadDir, filename);
      const stats = fs.statSync(filepath);
      
      if (now - stats.mtimeMs > maxAge) {
        fs.unlinkSync(filepath);
        console.log(`Deleted old upload: ${filename}`);
      }
    });
  }
}

module.exports = ImageGenerationService;
