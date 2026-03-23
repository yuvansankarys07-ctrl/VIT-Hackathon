/**
 * Replicate Provider
 * Uses Replicate API for Stable Diffusion img2img transformation
 * Specialized for room/image redesign tasks
 * Requires REPLICATE_API_TOKEN environment variable
 */

const BaseProvider = require('./baseProvider');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

class ReplicateProvider extends BaseProvider {
  constructor(config = {}) {
    super(config);
    this.name = 'REPLICATE_PROVIDER';
    this.apiToken = config.apiToken || process.env.REPLICATE_API_TOKEN;
    this.baseURL = 'https://api.replicate.com/v1';
  }

  async generateStyledRoomImage(inputImagePath, prompt, options = {}) {
    if (!this.apiToken) {
      throw new Error('Replicate API token not configured. Set REPLICATE_API_TOKEN environment variable.');
    }

    try {
      const startTime = Date.now();

      // Read image and convert to base64 for API
      let imageData;
      if (inputImagePath.startsWith('http')) {
        // If it's a URL, use directly
        imageData = inputImagePath;
      } else {
        // If it's a local file, read and encode
        const imageBuffer = fs.readFileSync(inputImagePath);
        const base64Image = imageBuffer.toString('base64');
        const mimeType = this.getMimeType(inputImagePath);
        imageData = `data:${mimeType};base64,${base64Image}`;
      }

      // Call Replicate Stable Diffusion img2img endpoint
      // Model: stability-ai/stable-diffusion-img2img or similar
      const response = await axios.post(
        `${this.baseURL}/predictions`,
        {
          version: options.modelVersion || 'stable-diffusion-img2img-version', // Specify exact version
          input: {
            image: imageData,
            prompt: prompt,
            num_outputs: 1,
            num_inference_steps: options.steps || 50,
            guidance_scale: options.guidanceScale || 7.5,
            scheduler: options.scheduler || 'DPMSolverMultistep',
            strength: options.strength || 0.75 // How much to transform (0-1)
          }
        },
        {
          headers: {
            'Authorization': `Token ${this.apiToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Poll for completion
      let prediction = response.data;
      while (prediction.status === 'processing') {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
        const pollResponse = await axios.get(
          `${this.baseURL}/predictions/${prediction.id}`,
          {
            headers: { 'Authorization': `Token ${this.apiToken}` }
          }
        );
        prediction = pollResponse.data;
      }

      const generationTime = Date.now() - startTime;

      if (prediction.status === 'succeeded' && prediction.output && prediction.output.length > 0) {
        return {
          success: true,
          imageUrl: prediction.output[0],
          prompt: prompt,
          generationTime: generationTime,
          provider: 'replicate',
          generatedAt: new Date().toISOString(),
          metadata: {
            predictionId: prediction.id,
            model: 'stable-diffusion-img2img',
            strength: options.strength || 0.75,
            steps: options.steps || 50
          }
        };
      } else {
        throw new Error(`Prediction failed with status: ${prediction.status}`);
      }
    } catch (error) {
      console.error('Replicate generation error:', error);
      throw new Error(`Replicate image generation failed: ${error.message}`);
    }
  }

  getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp'
    };
    return mimeTypes[ext] || 'image/jpeg';
  }

  async isConfigured() {
    return !!this.apiToken;
  }

  async getStatus() {
    return {
      provider: this.name,
      configured: this.apiToken ? true : false,
      description: 'Uses Replicate Stable Diffusion for image-to-image room transformation',
      capabilities: ['img2img-transformation', 'style-transfer', 'room-redesign'],
      note: this.apiToken ? 'Ready to use' : 'REPLICATE_API_TOKEN not set'
    };
  }
}

module.exports = ReplicateProvider;
