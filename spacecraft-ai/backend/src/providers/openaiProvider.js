/**
 * OpenAI Provider
 * Uses OpenAI API for image generation via DALL-E 3 and image manipulation
 * Requires OPENAI_API_KEY environment variable
 */

const BaseProvider = require('./baseProvider');

class OpenAIProvider extends BaseProvider {
  constructor(config = {}) {
    super(config);
    this.name = 'OPENAI_PROVIDER';
    this.apiKey = config.apiKey || process.env.OPENAI_API_KEY;
    
    if (this.apiKey) {
      // Initialize OpenAI client if available
      try {
        const { OpenAI } = require('openai');
        this.client = new OpenAI({ apiKey: this.apiKey });
      } catch (error) {
        console.warn('OpenAI library not installed. Install with: npm install openai');
      }
    }
  }

  async generateStyledRoomImage(inputImagePath, prompt, options = {}) {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not configured. Set OPENAI_API_KEY environment variable.');
    }

    if (!this.client) {
      throw new Error('OpenAI client not initialized. Install openai package: npm install openai');
    }

    try {
      const startTime = Date.now();

      // For image editing, we need to send the input image
      // Note: This is a simplified implementation. In production, handle file conversion properly.
      
      // For now, use image generation with the prompt that includes image context
      const response = await this.client.images.generate({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: options.size || '1024x1024',
        quality: options.quality || 'standard',
        style: 'natural'
      });

      const generationTime = Date.now() - startTime;

      return {
        success: true,
        imageUrl: response.data[0].url,
        prompt: prompt,
        generationTime: generationTime,
        provider: 'openai',
        generatedAt: new Date().toISOString(),
        metadata: {
          model: 'dall-e-3',
          revised_prompt: response.data[0].revised_prompt || null
        }
      };
    } catch (error) {
      console.error('OpenAI generation error:', error);
      throw new Error(`OpenAI image generation failed: ${error.message}`);
    }
  }

  async isConfigured() {
    return !!this.apiKey && !!this.client;
  }

  async getStatus() {
    return {
      provider: this.name,
      configured: this.apiKey ? true : false,
      description: 'Uses OpenAI DALL-E 3 for high-quality image generation',
      capabilities: ['dall-e-3-generation', 'natural-style-output'],
      note: this.apiKey ? 'Ready to use' : 'OPENAI_API_KEY not set'
    };
  }
}

module.exports = OpenAIProvider;
