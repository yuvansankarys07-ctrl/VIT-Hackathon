/**
 * Mock Provider - Fallback for development and testing
 * Simulates image generation without calling real APIs
 * In hackathon mode: returns placeholder "AI-generated" image with metadata
 */

const BaseProvider = require('./baseProvider');
const fs = require('fs');
const path = require('path');

class MockProvider extends BaseProvider {
  constructor(config = {}) {
    super(config);
    this.name = 'MOCK_PROVIDER';
  }

  async generateStyledRoomImage(inputImagePath, prompt, options = {}) {
    return new Promise((resolve) => {
      // Simulate API processing time (2-5 seconds)
      const processingTime = Math.random() * 3000 + 2000;
      
      setTimeout(() => {
        // In production, this would return a real AI-generated image
        // For mock mode, we return metadata and a placeholder
        const mockImagePath = '/api/images/mock-redesigned-room.jpg';
        const generatedAt = new Date().toISOString();
        
        resolve({
          success: true,
          imageUrl: mockImagePath,
          prompt: prompt,
          generationTime: processingTime,
          provider: 'mock',
          generatedAt: generatedAt,
          metadata: {
            inputImage: inputImagePath,
            promptLength: prompt.length,
            processingMode: 'mock_simulation',
            note: 'This is a mock generation. Use real provider API keys for actual image generation.'
          }
        });
      }, processingTime);
    });
  }

  async isConfigured() {
    // Mock provider always works (no API key needed)
    return true;
  }

  async getStatus() {
    return {
      provider: this.name,
      configured: true,
      description: 'Mock fallback provider for development and testing',
      capabilities: ['mock_image_generation'],
      note: 'No real API keys required. For production, configure real provider API keys.'
    };
  }
}

module.exports = MockProvider;
