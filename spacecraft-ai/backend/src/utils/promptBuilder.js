/**
 * Advanced Prompt Builder Utility
 * Creates sophisticated, context-aware prompts for room redesign AI
 * Designed for maximum quality with Stable Diffusion img2img and DALL-E
 */

class AdvancedPromptBuilder {
  constructor() {
    this.styleDatabase = this.initializeStyleDatabase();
    this.moodDatabase = this.initializeMoodDatabase();
    this.roomDatabase = this.initializeRoomDatabase();
  }

  /**
   * Build complete prompt with all optimizations
   */
  buildOptimizedPrompt(designData) {
    const {
      roomType = 'living room',
      style = 'modern',
      mood = 'calm',
      budget = 'medium',
      purpose = 'general',
      priority = 'aesthetics',
      isStudentMode = false
    } = designData;

    return this.assemblePrompt({
      roomType,
      style,
      mood,
      budget,
      purpose,
      priority,
      isStudentMode
    });
  }

  /**
   * Core prompt assembly logic
   */
  assemblePrompt(data) {
    const parts = [];

    // 1. FOUNDATION - Preservation Instructions
    parts.push(this.getPreservationInstructions());

    // 2. TRANSFORMATION CONTEXT
    parts.push(`Transform this ${data.roomType} into a stunning ${data.style.toLowerCase()} redesign.`);

    // 3. ARCHITECTURAL DETAILS
    parts.push(this.getArchitecturalGuidance(data.roomType));

    // 4. STYLE COMPREHENSIVE GUIDANCE
    parts.push(this.getStyleComprehensive(data.style));

    // 5. MOOD ATMOSPHERIC SETTING
    parts.push(this.getMoodAtmospheric(data.mood));

    // 6. FINANCIAL CONSTRAINTS
    parts.push(this.getBudgetOptimized(data.budget));

    // 7. ROOM PURPOSE OPTIMIZATION
    parts.push(this.getRoomPurposeOptimized(data.purpose));

    // 8. PRIORITY EMPHASIS
    parts.push(this.getPriorityEmphasis(data.priority));

    // 9. STUDENT MODE (if applicable)
    if (data.isStudentMode) {
      parts.push(this.getStudentModeOptimization());
    }

    // 10. QUALITY & PHOTOREALISM
    parts.push(this.getPhotoRealismInstructions());

    // 11. TECHNICAL AI PARAMETERS
    parts.push(this.getTechnicalParameter());

    return parts.filter(p => p && p.length > 0).join(' ');
  }

  /**
   * FOUNDATION: Architecture Preservation
   */
  getPreservationInstructions() {
    return `CRITICAL: Preserve the original room's architecture. Keep: wall positions, windows, floor perspective, room proportions, ceiling height, door placements, natural light sources. ONLY redesign the interior: furniture, colors, decor, accessories, lighting fixtures, fabrics, wall treatments.`;
  }

  /**
   * ARCHITECTURAL: Room-specific guidance
   */
  getArchitecturalGuidance(roomType) {
    const guidance = {
      'bedroom': 'Focus on comfort and relaxation. Include a well-designed bed as focal point, coordinated bedding, functional nightstands, comfortable lighting for reading, and serene color palette.',
      'living room': 'Create a welcoming gathering space. Include comfortable seating arrangement, TV setup or focal point, coffee table, side tables, warm ambient lighting, and balanced color flow.',
      'study room': 'Prioritize functionality and focus. Include ergonomic desk placement, proper task lighting, comfortable chair, organized storage for books/materials, minimal distractions.',
      'kitchen': 'Balance functionality with aesthetics. Include modern appliances, clean countertops, organized storage, good task lighting, comfortable dining setup if present.',
      'office corner': 'Maximize productivity in limited space. Include compact desk, ergonomic chair, proper lighting, storage solutions, professional yet comfortable ambiance.',
      'hostel room': 'Optimize tight space. Include essential multi-purpose furniture, smart storage solutions, comfortable bed, compact workspace if needed, efficient layout.',
      'studio apartment': 'Create multi-functional zones. Use furniture and color to define sleeping, working, and living areas. Maximize vertical space. Clear visual organization.'
    };
    return guidance[roomType.toLowerCase()] || guidance['living room'];
  }

  /**
   * STYLE: Comprehensive style descriptions
   */
  getStyleComprehensive(style) {
    const styles = this.styleDatabase;
    return styles[style.toLowerCase()] || styles['modern'];
  }

  /**
   * MOOD: Atmospheric and emotional guidance
   */
  getMoodAtmospheric(mood) {
    const moods = this.moodDatabase;
    return moods[mood.toLowerCase()] || moods['calm'];
  }

  /**
   * BUDGET: Financial constraint optimization
   */
  getBudgetOptimized(budget) {
    const budgetGuide = {
      'low': 'Budget-conscious (₹5k-10k). Select affordable brands, DIY-friendly solutions, budget retailers. Make high-impact changes with low cost. Use paint, rearrangement, affordable accessories for transformation.',
      'medium': 'Mid-range budget (₹10k-25k). Mix of affordable basics with some mid-range statement pieces. Strategic investment in visible items. Quality basics for functionality.',
      'high': 'Good budget (₹25k-50k). Include mid-range designer pieces, quality furniture, premium fabrics, higher-end accessories. Allow more creative freedom.',
      'luxury': 'Premium budget (₹50k+). High-end furniture, designer pieces potentially, premium materials throughout, luxury finishes, statement lighting, art pieces.',
      'custom': 'Balanced practical budget. Show creative solutions. Mix affordable and slightly premium pieces. Focus on smart design choices over price.'
    };
    return budgetGuide[budget.toString().toLowerCase()] || budgetGuide['medium'];
  }

  /**
   * PURPOSE: Room purpose optimization
   */
  getRoomPurposeOptimized(purpose) {
    const purposes = {
      'general': 'Balanced design suitable for everyday living and relaxation.',
      'work-focused': 'Optimize for focus and productivity. Include proper desk setup, task lighting, minimal visual distractions.',
      'entertainment': 'Design for hosting and enjoyment. Include comfortable seating arrangement, entertainment setup, ambient lighting.',
      'relaxation': 'Create peaceful sanctuary. Use calming colors, soft textures, comfortable seating, gentle lighting.',
      'study': 'Purpose-built for focused learning. Ergonomic setup, good lighting, organized storage, distraction-free environment.',
      'creative': 'Inspire creativity and innovation. Mix textures and colors thoughtfully, include inspiration boards, comfortable workspace.'
    };
    return purposes[purpose.toLowerCase()] || purposes['general'];
  }

  /**
   * PRIORITY: Design emphasis
   */
  getPriorityEmphasis(priority) {
    const priorities = {
      'aesthetics': 'PRIMARY: Visual impact and beauty. Perfect color coordination, stylish furniture arrangement, beautiful composition. Make it Instagram-worthy.',
      'storage': 'PRIMARY: Maximize storage and organization. Include shelving systems, cabinets, drawer organization, vertical storage solutions. Functional beauty.',
      'comfort': 'PRIMARY: Comfort and livability. Prioritize comfortable seating, soft textures, ergonomic furniture, cozy ambiance. Form follows function.',
      'budget': 'PRIMARY: Cost-effectiveness. Achieve maximum visual impact with minimum spending. Show creative budget solutions. Smart design over expensive pieces.'
    };
    return priorities[priority.toLowerCase()] || priorities['aesthetics'];
  }

  /**
   * STUDENT MODE: Special optimization for compact spaces
   */
  getStudentModeOptimization() {
    return `STUDENT/HOSTEL MODE: Compact space optimization. Include space-saving furniture, loft beds or elevated storage possibilities, multi-purpose items, smart vertical organization, dorm-friendly, rental-safe solutions (no permanent damage), motivational study space, social ambiance for student living, affordable sourcing from student-friendly retailers.`;
  }

  /**
   * QUALITY: Photorealism and believability
   */
  getPhotoRealismInstructions() {
    return `QUALITY STANDARDS: Photorealistic rendering. Professional interior design quality. Realistic furniture placement and proportions. Achievable design (not fantasy). Natural lighting and shadows. Cohesive color harmony. Professional styling. Magazine-worthy photography quality. Believable as an actual room makeover. Show actual furniture, not abstract art.`;
  }

  /**
   * TECHNICAL: AI model optimization parameters
   */
  getTechnicalParameter() {
    return `Technical: High detailed rendering, professional photography, warm color grading, natural shadows, depth of field, excellent composition, DSLR quality photography, well-lit scene, commercial interior photography style.`;
  }

  /**
   * STYLE DATABASE: Comprehensive style definitions
   */
  initializeStyleDatabase() {
    return {
      'modern': `Modern aesthetic. Clean lines, minimalist forms, contemporary materials. Color palette: whites, grays, blacks with bold accent colors (teal, coral, mustard). Furniture: clean-lined, simple geometric shapes. Materials: metal, glass, light woods. Lighting: sleek, modern fixtures, recessed lights. Flooring: polished concrete, light wood, or tiles. Accessories: minimal but impactful art, houseplants, geometric decorations. Overall: uncluttered, fresh, forward-thinking.`,
      
      'minimal': `Minimalist design. Extreme simplicity, maximum function. Every item serves a purpose. Color palette: whites, off-whites, light grays, pale neutrals, one accent color maximum. Furniture: only essentials, simple forms, low profile. Materials: natural woods, matte finishes. Lots of empty space - negative space as design element. Lighting: simple, unobtrusive. Flooring: clean, neutral. Accessories: virtually none - only meaningful items. Overall: calm, serene, meditative, magazine-white aesthetic.`,
      
      'traditional': `Traditional elegance. Classic proportions, timeless design. Color palette: warm neutrals, deep jewel tones, warm golds, burgundies, forest greens. Furniture: substantial, often ornate details, dark woods, upholstered pieces. Materials: wood, fabric, leather. Lighting: chandeliers, table lamps with fabric shades. Flooring: hardwood, Oriental rugs. Accessories: framed art, mirrors, traditional accessories, books. Overall: sophisticated, warm, established, heritage feeling.`,
      
      'scandinavian': `Scandinavian simplicity. Light, airy, functional beauty. Color palette: whites, light grays, pale blues, soft pastels, warm wood tones. Furniture: light wood, simple Scandinavian designs, comfortable. Materials: natural fibers, light woods, soft textiles. Hygge elements: cozy seating, soft blankets, candles. Lighting: warm, diffuse lighting, paper lanterns. Flooring: light wood, white or light tiles. Accessories: Swedish design, simple plants, minimal art. Overall: cozy minimalism, hygge, light, inviting.`,
      
      'boho': `Bohemian eclectic. Artistic, layered, worldly. Color palette: warm earth tones, terracotta, mustard, deep oranges, jewel tones, rich patterns. Furniture: mix of vintage, ethnic, comfortable pieces, low seating. Materials: natural - wood, rattan, macramé, mixed textiles. Textiles: patterned rugs, woven blankets, colorful cushions, tapestries. Plants: abundant live plants, hanging planters. Accessories: global art, vintage finds, dreamcatchers, boho decorations. Overall: artistic, colorful, layered, worldly, collected-over-time feeling.`,
      
      'industrial': `Industrial edge. Raw, utilitarian, artistic. Color palette: grays, blacks, metallics, concrete tones, with bold accent colors. Furniture: metal frames, reclaimed wood, vintage industrial pieces, mix matched. Materials: exposed brick if visible, concrete, metal, wood, glass. Lighting: metal fixtures, pendant lights, Edison bulbs, exposed wiring. Flooring: polished concrete, metal plating, or raw wood. Accessories: metal art, exposed shelving, industrial decor, vintage signs. Overall: warehouse chic, raw beauty, artistic edge.`,
      
      'cozy': `Cozy warmth. Inviting, comfortable, intimate. Color palette: warm neutrals, earth tones, warm browns, burnt orange, cream, soft gold. Furniture: comfortable seating, soft textures, lived-in feel. Materials: soft fabrics, knits, warm wood, leather. Textiles: thick rugs, cozy blankets, plush cushions, soft curtains. Lighting: warm, dim, lamplight, candles. Accessories: comfortable throw pillows, artisan crafts, personal items. Overall: warm, inviting, comfortable, relaxing, hygge-inspired.`,
      
      'contemporary': `Contemporary sophistication. Updated modern elements, current design trends. Color palette: neutral base with trendy accent colors. Furniture: modern silhouettes with current proportions. Materials: mix of modern and natural. Lighting: statement pieces, current fixtures. Overall: current, sophisticated, forward-thinking but comfortable.`,
      
      'rustic': `Rustic charm. Natural, earthy, handcrafted. Color palette: earthy neutrals, warm browns, warm creams, natural stone tones. Furniture: solid wood, vintage or distressed finishes, comfortable. Materials: natural wood, stone, wrought iron. Lighting: warm, natural, rustic fixtures. Flooring: hardwood, stone, brick. Accessories: natural materials, handcrafted items, plants. Overall: warm, welcoming, timeless, grounded in nature.`
    };
  }

  /**
   * MOOD DATABASE: Emotional atmosphere guidance
   */
  initializeMoodDatabase() {
    return {
      'calm': `Calm peaceful atmosphere. Soft, soothing colors - pastels, soft blues, soft greens, warm grays. Quiet, gentle energy. Soft lighting - diffuse, warm, dimmable. Comfortable, inviting seating. Natural elements - plants, natural materials. Minimal visual clutter. Peaceful, serene energy.`,
      
      'productive': `Productive focused energy. Bright, energizing colors - whites, light neutrals with bright accents. Clear, organized space. Good task lighting - bright, focused. Organized desk setup, minimal distractions. Inspiring elements. Energetic but focused.`,
      
      'luxury': `Luxury opulence. Rich, sophisticated colors - deep jewel tones, golds, blacks. High-end materials, premium finishes. Elegant lighting - designer fixtures, dramatic lighting. Statement pieces, art. Glamorous, luxurious atmosphere.`,
      
      'cozy': `Cozy intimate warmth. Warm color palette - warm neutrals, earth tones. Soft textures - blankets, cushions, rugs. Warm, dim lighting - lamps, candles. Intimate scale, comfortable seating. Hygge feeling - warm, inviting comfort.`,
      
      'aesthetic': `Aesthetic visual harmony. Balanced, beautiful color coordination. Thoughtful design choices. Beautiful composition for photography. Curated, artistic arrangement. Instagram-worthy, beautiful design. Visually stunning.`,
      
      'energetic': `Vibrant, energizing atmosphere. Bright, bold colors, color blocking, patterns. Dynamic, active energy. Bright lighting, good visibility. Creative, inspiring elements. Youthful, vibrant, exciting.`,
      
      'professional': `Professional mature atmosphere. Clean, organized aesthetic. Neutral, sophisticated colors. Good task lighting. Functional beauty. Credible, trustworthy feeling. Polished, refined.`
    };
  }

  /**
   * ROOM DATABASE: Room type specifications
   */
  initializeRoomDatabase() {
    return {
      'bedroom': { primary: 'comfort', secondary: 'aesthetics' },
      'living room': { primary: 'gathering', secondary: 'aesthetics' },
      'study room': { primary: 'focus', secondary: 'comfort' },
      'office corner': { primary: 'productivity', secondary: 'focus' },
      'kitchen': { primary: 'functionality', secondary: 'aesthetics' },
      'hostel room': { primary: 'optimization', secondary: 'functionality' },
      'studio apartment': { primary: 'multi-purpose', secondary: 'organization' }
    };
  }

  /**
   * TEST UTILITY: Generate sample prompts for testing different combinations
   */
  generateTestSet() {
    const combinations = [
      { roomType: 'bedroom', style: 'scandinavian', mood: 'calm', budget: 'medium', priority: 'comfort' },
      { roomType: 'living room', style: 'modern', mood: 'energetic', budget: 'high', priority: 'aesthetics', isStudentMode: false },
      { roomType: 'hostel room', style: 'minimal', mood: 'productive', budget: 'low', priority: 'budget', isStudentMode: true },
      { roomType: 'office corner', style: 'industrial', mood: 'productive', budget: 'medium', priority: 'storage' },
      { roomType: 'living room', style: 'boho', mood: 'cozy', budget: 'medium', priority: 'aesthetics' }
    ];

    return combinations.map(combo => ({
      designData: combo,
      prompt: this.buildOptimizedPrompt(combo)
    }));
  }
}

module.exports = AdvancedPromptBuilder;
