/**
 * Provider Manager
 * Factory for creating and managing image generation providers
 * Allows easy switching between OpenAI, Replicate, Mock, etc.
 */

const MockProvider = require('./mockProvider');
const OpenAIProvider = require('./openaiProvider');
const ReplicateProvider = require('./replicateProvider');

class ProviderManager {
  static providers = {
    'mock': MockProvider,
    'openai': OpenAIProvider,
    'replicate': ReplicateProvider
  };

  /**
   * Get available providers
   * @returns {string[]}
   */
  static getAvailableProviders() {
    return Object.keys(this.providers);
  }

  /**
   * Create provider instance
   * @param {string} providerName - Name of provider ('mock', 'openai', 'replicate')
   * @param {Object} config - Provider configuration
   * @returns {BaseProvider}
   */
  static createProvider(providerName, config = {}) {
    const ProviderClass = this.providers[providerName.toLowerCase()];
    
    if (!ProviderClass) {
      throw new Error(`Unknown provider: ${providerName}. Available: ${this.getAvailableProviders().join(', ')}`);
    }

    return new ProviderClass(config);
  }

  /**
   * Get default provider (prefers real APIs, falls back to mock)
   * @returns {BaseProvider}
   */
  static getDefaultProvider() {
    // Try Replicate first (good for img2img)
    if (process.env.REPLICATE_API_TOKEN) {
      console.log('Using Replicate provider');
      return this.createProvider('replicate');
    }

    // Try OpenAI
    if (process.env.OPENAI_API_KEY) {
      console.log('Using OpenAI provider');
      return this.createProvider('openai');
    }

    // Fall back to mock
    console.log('Using Mock provider (no API keys configured)');
    return this.createProvider('mock');
  }

  /**
   * Get provider by priority list
   * @param {string[]} priorityList - List of provider names in order of preference
   * @returns {BaseProvider}
   */
  static getProviderByPriority(priorityList = ['replicate', 'openai', 'mock']) {
    for (const providerName of priorityList) {
      try {
        const provider = this.createProvider(providerName);
        // Could add async check here if needed
        return provider;
      } catch (error) {
        console.warn(`${providerName} provider failed: ${error.message}`);
        continue;
      }
    }

    throw new Error('No working provider available');
  }

  /**
   * Get provider status report
   * @returns {Promise<Object>}
   */
  static async getProvidersStatus() {
    const status = {};

    for (const [name, ProviderClass] of Object.entries(this.providers)) {
      try {
        const provider = new ProviderClass();
        status[name] = await provider.getStatus();
      } catch (error) {
        status[name] = {
          error: error.message,
          configured: false
        };
      }
    }

    return status;
  }
}

module.exports = ProviderManager;
