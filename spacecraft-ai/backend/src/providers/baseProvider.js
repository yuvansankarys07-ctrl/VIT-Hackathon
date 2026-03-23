/**
 * Base Provider Class
 * Defines the interface all image generation providers must implement
 */

class BaseProvider {
  constructor(config = {}) {
    this.config = config;
    this.name = 'BASE_PROVIDER';
  }

  /**
   * Generate styled room image from uploaded image
   * @param {string} inputImagePath - Path to uploaded room image
   * @param {string} prompt - Detailed prompt for AI image generation
   * @param {Object} options - Additional options (size, quality, steps, etc)
   * @returns {Promise<{imageUrl: string, prompt: string, generationTime: number}>}
   */
  async generateStyledRoomImage(inputImagePath, prompt, options = {}) {
    throw new Error(`generateStyledRoomImage not implemented in ${this.name}`);
  }

  /**
   * Test if provider is properly configured
   * @returns {Promise<boolean>}
   */
  async isConfigured() {
    throw new Error(`isConfigured not implemented in ${this.name}`);
  }

  /**
   * Get provider status and configuration info
   * @returns {Promise<Object>}
   */
  async getStatus() {
    throw new Error(`getStatus not implemented in ${this.name}`);
  }
}

module.exports = BaseProvider;
