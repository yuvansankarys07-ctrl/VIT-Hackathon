/**
 * Image Controller
 * Handles image upload, generation, and retrieval
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import Replicate from 'replicate';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '../../uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Store uploaded images metadata (in production, use database)
const uploadedImages = new Map();
let replicateClient = null;
const DEFAULT_CLOUDINARY_IMAGE_URL = 'https://res.cloudinary.com/dfja0xdwr/image/upload/v1774272851/WhatsApp_Image_2026-03-23_at_14.47.59_nlilbe.jpg';
const DEFAULT_SDXL_VERSION = '7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc';

function getReplicateClient() {
  const token = process.env.REPLICATE_API_TOKEN;

  if (!token) {
    throw new Error('Replicate API token not configured. Set REPLICATE_API_TOKEN in backend/.env');
  }

  if (!replicateClient) {
    replicateClient = new Replicate({ auth: token });
  }

  return replicateClient;
}

function persistUploadedFile(file) {
  if (!file) {
    return null;
  }

  const fileId = uuidv4();
  const ext = path.extname(file.originalname || '.jpg') || '.jpg';
  const filename = `${fileId}${ext}`;
  const filepath = path.join(uploadDir, filename);
  fs.writeFileSync(filepath, file.buffer);

  const imageData = {
    id: fileId,
    filename,
    filepath,
    url: `/api/images/uploads/${filename}`,
    originalName: file.originalname,
    uploadedAt: new Date().toISOString(),
    size: file.size
  };

  uploadedImages.set(fileId, imageData);
  return imageData;
}

function normalizeReplicateOutput(output) {
  if (!output) {
    return null;
  }

  if (typeof output === 'string') {
    return output;
  }

  if (output instanceof URL) {
    return output.toString();
  }

  if (Array.isArray(output)) {
    for (const item of output) {
      const normalized = normalizeReplicateOutput(item);
      if (normalized) {
        return normalized;
      }
    }
    return null;
  }

  if (typeof output === 'object') {
    if (typeof output.url === 'string') {
      return output.url;
    }

    if (typeof output.url === 'function') {
      const result = output.url();
      if (typeof result === 'string') {
        return result;
      }
    }

    if (typeof output.toString === 'function') {
      const asString = output.toString();
      if (typeof asString === 'string' && asString !== '[object Object]') {
        return asString;
      }
    }
  }

  return null;
}

function getRetryAfterSeconds(error) {
  const message = error?.message || '';
  const explicitRetry = message.match(/retry_after\":(\d+)/i);
  if (explicitRetry && explicitRetry[1]) {
    return Number(explicitRetry[1]);
  }

  const textRetry = message.match(/resets in ~?(\d+)s/i);
  if (textRetry && textRetry[1]) {
    return Number(textRetry[1]);
  }

  return 5;
}

function isRateLimitError(error) {
  const message = error?.message || '';
  return message.includes('429') || message.toLowerCase().includes('too many requests');
}

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getModelIdentifier(model) {
  const configuredModel = model || process.env.REPLICATE_MODEL || 'stability-ai/sdxl';

  if (configuredModel.includes(':')) {
    return configuredModel;
  }

  const configuredVersion = process.env.REPLICATE_MODEL_VERSION || DEFAULT_SDXL_VERSION;
  if (configuredModel === 'stability-ai/sdxl' && configuredVersion) {
    return `${configuredModel}:${configuredVersion}`;
  }

  return configuredModel;
}

function getErrorStatusCode(error) {
  const message = error?.message || '';

  if (message.includes('402') || message.toLowerCase().includes('insufficient credit') || message.toLowerCase().includes('payment required')) return 402;
  if (message.includes('429') || message.toLowerCase().includes('too many requests')) return 429;
  if (message.includes('422') || message.includes('400')) return 400;
  if (message.includes('404')) return 502;
  if (message.includes('401') || message.includes('403')) return 502;

  return 500;
}

function isReplicateTemporarilyUnavailable(error) {
  const message = (error?.message || '').toLowerCase();
  return (
    message.includes('insufficient credit') ||
    message.includes('payment required') ||
    message.includes('too many requests') ||
    message.includes('rate limit')
  );
}

function getImageMimeType(imagePath) {
  const ext = path.extname(imagePath || '').toLowerCase();
  if (ext === '.png') return 'image/png';
  if (ext === '.webp') return 'image/webp';
  if (ext === '.gif') return 'image/gif';
  return 'image/jpeg';
}

function toReplicateImageInput(inputImage) {
  if (!inputImage) {
    throw new Error('Missing input image for generation');
  }

  if (typeof inputImage === 'string' && (inputImage.startsWith('http://') || inputImage.startsWith('https://') || inputImage.startsWith('data:'))) {
    return inputImage;
  }

  if (typeof inputImage === 'string' && fs.existsSync(inputImage)) {
    const imageBuffer = fs.readFileSync(inputImage);
    const mimeType = getImageMimeType(inputImage);
    return `data:${mimeType};base64,${imageBuffer.toString('base64')}`;
  }

  return inputImage;
}

async function generateWithReplicate({ inputImage, prompt, style, mood, model }) {
  const client = getReplicateClient();
  const replicateImage = toReplicateImageInput(inputImage);
  const preferredModel = getModelIdentifier(model);
  const fallbackModel = getModelIdentifier('stability-ai/sdxl');

  const attempts = [
    {
      model: preferredModel,
      input: {
        image: replicateImage,
        prompt,
        prompt_strength: 0.8,
        output_format: 'jpg'
      }
    },
    {
      model: preferredModel,
      input: {
        input_image: replicateImage,
        prompt,
        strength: 0.8,
        output_format: 'jpg'
      }
    },
    {
      model: fallbackModel,
      input: {
        image: replicateImage,
        prompt: `${prompt}\n\nInterior style: ${style || 'modern'}. Mood: ${mood || 'cozy'}.`,
        prompt_strength: 0.8,
        output_format: 'jpg'
      }
    }
  ];

  let lastError = null;

  for (const attempt of attempts) {
    for (let retry = 0; retry < 3; retry += 1) {
      try {
        const output = await client.run(attempt.model, { input: attempt.input });
        const outputUrl = normalizeReplicateOutput(output);

        if (!outputUrl) {
          throw new Error('Replicate returned no usable output URL');
        }

        return {
          outputImage: outputUrl,
          model: attempt.model
        };
      } catch (error) {
        lastError = error;

        if (!isRateLimitError(error) || retry === 2) {
          break;
        }

        const retryAfterSeconds = getRetryAfterSeconds(error);
        await wait((retryAfterSeconds + 1) * 1000);
      }
    }
  }

  throw new Error(`Replicate generation failed after fallback attempts: ${lastError?.message || 'unknown error'}`);
}

function resolveImageSource({ imageId, imageUrl, file }) {
  if (file) {
    const imageData = persistUploadedFile(file);
    return {
      imageId: imageData.id,
      inputImageUrl: imageData.url,
      modelInputImage: imageData.filepath,
      imageData
    };
  }

  if (imageId) {
    const imageData = uploadedImages.get(imageId);
    if (!imageData) {
      throw new Error(`Image not found: ${imageId}`);
    }

    return {
      imageId: imageData.id,
      inputImageUrl: imageData.url,
      modelInputImage: imageData.filepath,
      imageData
    };
  }

  if (imageUrl) {
    return {
      imageId: uuidv4(),
      inputImageUrl: imageUrl,
      modelInputImage: imageUrl,
      imageData: null
    };
  }

  throw new Error('Missing image input. Provide one of: imageId, imageUrl, or roomImage file.');
}

function buildTransformationPrompt(designData) {
  const {
    roomType = 'living room',
    style = 'modern',
    mood = 'calm',
    budget = 'medium'
  } = designData || {};

  return `Transform the given room image based on the following user preferences:

Room Type: ${roomType}
Interior Style: ${style}
Mood/Ambience: ${mood}
Budget Level: ${budget}

Instructions:
- Redesign the space according to the selected style and mood
- Optimize layout for functionality and aesthetics
- Replace existing furniture with matching ${style} furniture
- Adjust colors, textures, and materials based on ${style} and ${mood}
- Enhance lighting to match the mood (e.g., warm, bright, cozy, dramatic)
- Add decor elements that align with the theme (art, plants, rugs, etc.)
- Ensure the design reflects the budget:
  • low -> simple, affordable materials
  • medium -> balanced aesthetics and cost
  • high -> premium, luxurious finishes

Constraints:
- Keep the original room structure intact
- Maintain realistic proportions
- Avoid over-cluttering (especially for minimal styles)

Rendering Style:
- ultra-realistic interior design
- high resolution
- soft shadows and natural lighting
- photorealistic 4K render

Output:
- visually appealing redesigned room matching user inputs`;
}

function createMockGeneratedImage(designData) {
  const {
    roomType = 'room',
    style = 'modern',
    mood = 'calm',
    budget = 'medium'
  } = designData || {};

  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#334155"/>
    </linearGradient>
  </defs>
  <rect width="1280" height="720" fill="url(#bg)"/>
  <rect x="80" y="80" width="1120" height="560" rx="24" fill="#0f172a" opacity="0.45"/>
  <text x="100" y="170" fill="#e2e8f0" font-size="52" font-family="Arial, sans-serif" font-weight="700">AI Redesign Preview (Mock)</text>
  <text x="100" y="250" fill="#cbd5e1" font-size="34" font-family="Arial, sans-serif">Room: ${String(roomType)}</text>
  <text x="100" y="305" fill="#cbd5e1" font-size="34" font-family="Arial, sans-serif">Style: ${String(style)}</text>
  <text x="100" y="360" fill="#cbd5e1" font-size="34" font-family="Arial, sans-serif">Mood: ${String(mood)}</text>
  <text x="100" y="415" fill="#cbd5e1" font-size="34" font-family="Arial, sans-serif">Budget: ${String(budget)}</text>
  <text x="100" y="520" fill="#93c5fd" font-size="24" font-family="Arial, sans-serif">Set REPLICATE_API_TOKEN or OPENAI_API_KEY for real image-to-image redesign output.</text>
  <text x="100" y="565" fill="#94a3b8" font-size="20" font-family="Arial, sans-serif">Generated at: ${timestamp}</text>
</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/**
 * Upload room image
 */
export const uploadRoomImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No image file uploaded'
      });
    }

    const imageData = persistUploadedFile(req.file);

    return res.status(200).json({
      success: true,
      image: imageData,
      message: 'Image uploaded successfully'
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Generate AI room design from uploaded image
 */
export const generateRoomDesign = async (req, res) => {
  try {
    const {
      imageId,
      imageUrl,
      roomType,
      style,
      mood,
      provider = 'replicate',
      prompt: customPrompt,
      model
    } = req.body;

    if (!roomType || !style) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: roomType, style'
      });
    }

    const source = resolveImageSource({ imageId, imageUrl, file: null });
    const prompt = customPrompt || buildTransformationPrompt(req.body);

    let generation;
    let generationProvider = provider;

    if (provider === 'mock') {
      generation = {
        outputImage: createMockGeneratedImage(req.body),
        model: 'mock-renderer'
      };
    } else {
      generation = await generateWithReplicate({
        inputImage: source.modelInputImage,
        prompt,
        style,
        mood,
        model
      });
      generationProvider = 'replicate';
    }

    const result = {
      success: true,
      imageId: source.imageId,
      inputImage: source.inputImageUrl,
      outputImage: generation.outputImage,
      provider: generationProvider,
      model: generation.model,
      generatedAt: new Date().toISOString(),
      generationTime: null,
      designData: req.body,
      prompt
    };

    if (source.imageData) {
      uploadedImages.set(source.imageId, {
        ...source.imageData,
        generatedImage: result.outputImage,
        generationResult: result
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Generation error:', error);

    if (isReplicateTemporarilyUnavailable(error)) {
      const fallbackImage = createMockGeneratedImage(req.body);
      return res.status(200).json({
        success: true,
        imageId: req.body?.imageId || null,
        inputImage: null,
        outputImage: fallbackImage,
        provider: 'mock-fallback',
        model: 'mock-renderer',
        generatedAt: new Date().toISOString(),
        designData: req.body,
        prompt: req.body?.prompt || buildTransformationPrompt(req.body),
        warning: 'Replicate is temporarily unavailable (billing/rate-limit). Showing fallback preview.'
      });
    }

    return res.status(getErrorStatusCode(error)).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Generate redesigned room image from uploaded file or URL
 * Endpoint target: /api/generate-image
 */
export const generateRoomImage = async (req, res) => {
  try {
    const {
      imageId,
      imageUrl,
      style = 'modern',
      mood = 'cozy',
      roomType = 'living room',
      prompt: customPrompt,
      model,
      provider = 'replicate'
    } = req.body;

    const source = resolveImageSource({ imageId, imageUrl, file: req.file });

    const prompt = customPrompt || buildTransformationPrompt({
      roomType,
      style,
      mood,
      ...req.body
    });

    let generation;
    let generationProvider = provider;

    if (provider === 'mock') {
      generation = {
        outputImage: createMockGeneratedImage({ roomType, style, mood, ...req.body }),
        model: 'mock-renderer'
      };
    } else {
      generation = await generateWithReplicate({
        inputImage: source.modelInputImage,
        prompt,
        style,
        mood,
        model
      });
      generationProvider = 'replicate';
    }

    const result = {
      success: true,
      imageId: source.imageId,
      inputImage: source.inputImageUrl,
      outputImage: generation.outputImage,
      provider: generationProvider,
      model: generation.model,
      prompt,
      generatedAt: new Date().toISOString(),
      designData: {
        roomType,
        style,
        mood,
        ...req.body
      }
    };

    if (source.imageData) {
      uploadedImages.set(source.imageId, {
        ...source.imageData,
        generatedImage: result.outputImage,
        generationResult: result
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Generate image error:', error);

    if (isReplicateTemporarilyUnavailable(error)) {
      const fallbackImage = createMockGeneratedImage(req.body);
      return res.status(200).json({
        success: true,
        imageId: req.body?.imageId || null,
        inputImage: req.body?.imageUrl || null,
        outputImage: fallbackImage,
        provider: 'mock-fallback',
        model: 'mock-renderer',
        generatedAt: new Date().toISOString(),
        designData: req.body,
        warning: 'Replicate is temporarily unavailable (billing/rate-limit). Showing fallback preview.'
      });
    }

    return res.status(getErrorStatusCode(error)).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Generate redesigned image from fixed Cloudinary URL
 * Endpoint target: GET /api/generate-image
 */
export const generateImageFromCloudinary = async (req, res) => {
  try {
    const roomType = req.query.roomType || 'bedroom';
    const style = req.query.style || 'modern boho';
    const mood = req.query.mood || 'warm';

    const prompt = `
Redesign this room into a ${style} style ${roomType}.
Make it aesthetic, realistic, well-lit, clean layout.
Add furniture, decor, plants, and warm lighting.
Optimize for space and comfort.
Ultra realistic, interior design, 4k quality, professional photography.
`.trim();

    const generation = await generateWithReplicate({
      inputImage: DEFAULT_CLOUDINARY_IMAGE_URL,
      prompt,
      style,
      mood,
      model: getModelIdentifier(process.env.REPLICATE_MODEL || 'stability-ai/sdxl')
    });

    return res.status(200).json({
      success: true,
      image: generation.outputImage,
      outputImage: generation.outputImage,
      provider: 'replicate',
      model: generation.model,
      inputImage: DEFAULT_CLOUDINARY_IMAGE_URL,
      prompt,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Cloudinary generate image error:', error);

    if (isReplicateTemporarilyUnavailable(error)) {
      const fallbackImage = createMockGeneratedImage({ roomType: 'bedroom', style: 'modern boho', mood: 'warm' });
      return res.status(200).json({
        success: true,
        image: fallbackImage,
        outputImage: fallbackImage,
        provider: 'mock-fallback',
        model: 'mock-renderer',
        inputImage: DEFAULT_CLOUDINARY_IMAGE_URL,
        warning: 'Replicate is temporarily unavailable (billing/rate-limit). Showing fallback preview.',
        generatedAt: new Date().toISOString()
      });
    }

    return res.status(getErrorStatusCode(error)).json({
      success: false,
      error: error.message || 'Image generation failed'
    });
  }
};

/**
 * Regenerate room design with different parameters (mocked)
 */
export const regenerateRoomDesign = async (req, res) => {
  return generateRoomDesign(req, res);
};

/**
 * Get image file
 */
export const getImage = (req, res) => {
  try {
    const { filename } = req.params;

    if (filename.includes('..')) {
      return res.status(403).json({
        success: false,
        error: 'Access denied'
      });
    }

    const filepath = path.join(uploadDir, filename);

    if (!fs.existsSync(filepath)) {
      return res.status(404).json({
        success: false,
        error: 'Image not found'
      });
    }

    return res.sendFile(filepath);
  } catch (error) {
    console.error('Get image error:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get provider status
 */
export const getProviderStatus = async (req, res) => {
  const replicateConfigured = !!process.env.REPLICATE_API_TOKEN;

  return res.status(200).json({
    success: true,
    providers: {
      replicate: {
        provider: 'REPLICATE_PROVIDER',
        configured: replicateConfigured,
        model: getModelIdentifier(process.env.REPLICATE_MODEL || 'stability-ai/sdxl'),
        description: 'Real image-to-image generation using Replicate'
      },
      mock: {
        provider: 'MOCK_PROVIDER',
        configured: true,
        description: 'Mock fallback provider for development'
      }
    },
    activeProvider: replicateConfigured ? 'replicate' : 'mock'
  });
};

export default {
  uploadRoomImage,
  generateRoomDesign,
  generateRoomImage,
  generateImageFromCloudinary,
  regenerateRoomDesign,
  getImage,
  getProviderStatus
};
