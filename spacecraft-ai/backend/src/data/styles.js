// Mock data for design styles
export const stylesDB = [
  {
    id: 'style-modern',
    name: 'Modern',
    description: 'Clean lines, minimalist aesthetic, contemporary design',
    colorPalettes: [
      { name: 'Urban Neutral', colors: ['#FFFFFF', '#2C2C2C', '#A0A0A0', '#D4D4D4'] },
      { name: 'Cool Blue', colors: ['#FFFFFF', '#1E3A8A', '#60A5FA', '#DBEAFE'] }
    ],
    furniturePreferences: ['modern', 'minimal', 'industrial'],
    characteristics: ['minimalist', 'clean', 'functional', 'contemporary'],
    budgetRange: { min: 5000, suggested: 25000 },
    decorSuggestions: ['geometric art', 'metal accents', 'sleek lighting', 'minimalist rugs'],
    flooringTypes: ['concrete', 'light wood', 'grey tile'],
    curateElements: true
  },
  {
    id: 'style-minimal',
    name: 'Minimal',
    description: 'Essential items only, empty space, maximum clarity',
    colorPalettes: [
      { name: 'Pure Monochrome', colors: ['#FFFFFF', '#000000', '#CCCCCC'] },
      { name: 'Soft Beige', colors: ['#FFFFFF', '#F5F1E8', '#8B7355'] }
    ],
    furniturePreferences: ['minimal', 'modern', 'scandinavian'],
    characteristics: ['sparse', 'peaceful', 'decluttered', 'functional'],
    budgetRange: { min: 3000, suggested: 15000 },
    decorSuggestions: ['one focal piece', 'negative space', 'single plants'],
    flooringTypes: ['light wood', 'white tile', 'concrete'],
    curateElements: true
  },
  {
    id: 'style-scandinavian',
    name: 'Scandinavian',
    description: 'Light, bright, functional, cozy Nordic design',
    colorPalettes: [
      { name: 'Nordic Light', colors: ['#FFFFFF', '#F8F8F0', '#C0B0A0', '#4A4A48'] },
      { name: 'Lagom Blue', colors: ['#FFFFFF', '#B8D4E3', '#6BA3BF', '#3C5A6E'] }
    ],
    furniturePreferences: ['scandinavian', 'minimal', 'modern'],
    characteristics: ['bright', 'functional', 'natural', 'cozy'],
    budgetRange: { min: 8000, suggested: 35000 },
    decorSuggestions: ['wooden accents', 'warm lighting', 'plants', 'textiles'],
    flooringTypes: ['light wood', 'light tile'],
    curateElements: true
  },
  {
    id: 'style-boho',
    name: 'Boho',
    description: 'Eclectic, artistic, natural, free-spirited design',
    colorPalettes: [
      { name: 'Earth Tones', colors: ['#FFFFFF', '#D4A574', '#8B6F47', '#C19A6B'] },
      { name: 'Jewel Tones', colors: ['#E8D4C4', '#8B4513', '#D4A574', '#9370DB'] }
    ],
    furniturePreferences: ['boho', 'traditional', 'modern'],
    characteristics: ['artistic', 'eclectic', 'natural', 'colorful'],
    budgetRange: { min: 6000, suggested: 20000 },
    decorSuggestions: ['macramé', 'plants', 'artwork', 'textured fabrics', 'natural materials'],
    flooringTypes: ['wood', 'patterned tile', 'natural materials'],
    curateElements: false
  },
  {
    id: 'style-industrial',
    name: 'Industrial',
    description: 'Raw, exposed, utilitarian, warehouse-inspired design',
    colorPalettes: [
      { name: 'Raw Metal', colors: ['#FFFFFF', '#2C2C2C', '#696969', '#A0A0A0'] },
      { name: 'Exposed Brick', colors: ['#8B4513', '#CD5C5C', '#A9A9A9', '#FFFFFF'] }
    ],
    furniturePreferences: ['industrial', 'modern', 'minimal'],
    characteristics: ['raw', 'utilitarian', 'edgy', 'functional'],
    budgetRange: { min: 7000, suggested: 30000 },
    decorSuggestions: ['metal fixtures', 'exposed pipes', 'brick walls', 'leather accents'],
    flooringTypes: ['concrete', 'dark tile', 'reclaimed wood'],
    curateElements: true
  },
  {
    id: 'style-traditional',
    name: 'Traditional',
    description: 'Classic, elegant, timeless, formal design',
    colorPalettes: [
      { name: 'Burgundy Elegance', colors: ['#FFFFFF', '#800020', '#8B4513', '#DAA520'] },
      { name: 'Forest Green', colors: ['#F5F5DC', '#228B22', '#8B4513', '#FFD700'] }
    ],
    furniturePreferences: ['traditional', 'scandinavian', 'cozy'],
    characteristics: ['elegant', 'formal', 'classic', 'ornate'],
    budgetRange: { min: 12000, suggested: 40000 },
    decorSuggestions: ['wood furniture', 'paintings', 'curtains', 'decorative mirrors'],
    flooringTypes: ['wood', 'marble', 'patterned tile'],
    curateElements: false
  },
  {
    id: 'style-cozy',
    name: 'Cozy',
    description: 'Warm, comfortable, intimate, welcoming design',
    colorPalettes: [
      { name: 'Warm Embrace', colors: ['#FFFFFF', '#D2691E', '#CD853F', '#8B4513'] },
      { name: 'Soft Pastels', colors: ['#FFE4E1', '#F0E68C', '#E0FFFF', '#FFF0F5'] }
    ],
    furniturePreferences: ['cozy', 'traditional', 'boho'],
    characteristics: ['warm', 'comfortable', 'intimate', 'layered'],
    budgetRange: { min: 8000, suggested: 25000 },
    decorSuggestions: ['soft textures', 'warm lighting', 'cushions', 'throws', 'natural materials'],
    flooringTypes: ['wood', 'warm tile', 'carpet'],
    curateElements: false
  }
];

export const roomPurposesDB = [
  { id: 'purpose-study', name: 'Study', keywords: ['desk', 'lighting', 'storage', 'chair'] },
  { id: 'purpose-bedroom', name: 'Bedroom', keywords: ['bed', 'storage', 'cozy', 'lighting'] },
  { id: 'purpose-work', name: 'Work from Home', keywords: ['desk', 'ergonomic chair', 'lighting', 'storage'] },
  { id: 'purpose-gaming', name: 'Gaming Setup', keywords: ['gaming desk', 'gaming chair', 'lighting', 'shelving'] },
  { id: 'purpose-hostel', name: 'Hostel Room', keywords: ['compact bed', 'wall storage', 'minimal', 'functional'] },
  { id: 'purpose-living', name: 'Living Room', keywords: ['sofa', 'entertainment', 'storage', 'lighting'] }
];

export const moodsDB = [
  { id: 'mood-calm', name: 'Calm', colors: ['#B0C4DE', '#E0F0FF', '#D3D3D3'], description: 'Peaceful and relaxing' },
  { id: 'mood-productive', name: 'Productive', colors: ['#4169E1', '#87CEEB', '#FFD700'], description: 'Focus and energy' },
  { id: 'mood-luxury', name: 'Luxury', colors: ['#DAA520', '#8B7355', '#2F4F4F'], description: 'Rich and elegant' },
  { id: 'mood-cozy', name: 'Cozy', colors: ['#D2691E', '#CD853F', '#8B4513'], description: 'Warm and comfortable' },
  { id: 'mood-aesthetic', name: 'Aesthetic', colors: ['#FF69B4', '#FFB6C1', '#FFC0CB'], description: 'Visually pleasing' }
];

export const roomTypesDB = [
  { id: 'room-bedroom', name: 'Bedroom', avgSize: 15 },
  { id: 'room-study', name: 'Study Room', avgSize: 12 },
  { id: 'room-living', name: 'Living Room', avgSize: 20 },
  { id: 'room-office', name: 'Office Corner', avgSize: 10 },
  { id: 'room-hostel', name: 'Hostel Room', avgSize: 8 }
];

export const budgetPresetsDB = [
  { id: 'budget-5k', label: '₹5,000', value: 5000, description: 'Minimal essentials' },
  { id: 'budget-10k', label: '₹10,000', value: 10000, description: 'Basic comfort' },
  { id: 'budget-25k', label: '₹25,000', value: 25000, description: 'Good quality' },
  { id: 'budget-50k', label: '₹50,000', value: 50000, description: 'Premium setup' }
];

export default {
  stylesDB,
  roomPurposesDB,
  moodsDB,
  roomTypesDB,
  budgetPresetsDB
};
