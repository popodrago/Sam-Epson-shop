import { Category, Brand, SellerContactInfo } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'printheads',
    name: 'Printheads',
    slug: 'printheads',
    iconName: 'Printer',
    subcategories: [
      { id: 'epson-printheads', name: 'Epson Printheads', slug: 'epson-printheads' },
      { id: 'brother-printheads', name: 'Brother Printheads', slug: 'brother-printheads' },
      { id: 'hp-printheads', name: 'HP Printheads', slug: 'hp-printheads' },
    ],
  },
  {
    id: 'mainboards',
    name: 'Mainboards / Motherboards',
    slug: 'mainboards',
    iconName: 'Cpu',
    subcategories: [
      { id: 'formatboard', name: 'Formatter Boards', slug: 'formatter-boards' },
      { id: 'logicboard', name: 'Logic Boards', slug: 'logic-boards' },
    ],
  },
  {
    id: 'sensors',
    name: 'Sensors',
    slug: 'sensors',
    iconName: 'Scan',
    subcategories: [
      { id: 'paper-sensor', name: 'Paper Feed Sensors', slug: 'paper-sensors' },
      { id: 'encoder-sensor', name: 'Encoder Sensors', slug: 'encoder-sensors' },
    ],
  },
  {
    id: 'power-supplies',
    name: 'Power Supply Boards',
    slug: 'power-supplies',
    iconName: 'Zap',
    subcategories: [
      { id: 'power-board', name: 'AC Power Boards', slug: 'ac-power-boards' },
      { id: 'adapter', name: 'Power Adapters', slug: 'power-adapters' },
    ],
  },
  {
    id: 'control-boards',
    name: 'Control Boards',
    slug: 'control-boards',
    iconName: 'Sliders',
    subcategories: [
      { id: 'panel-board', name: 'Control Panel PCB', slug: 'control-panel-pcb' },
      { id: 'carriage-board', name: 'Carriage PCA', slug: 'carriage-pca' },
    ],
  },
  {
    id: 'motors',
    name: 'Motors',
    slug: 'motors',
    iconName: 'Cog',
    subcategories: [
      { id: 'carriage-motor', name: 'Carriage CR Motors', slug: 'carriage-motors' },
      { id: 'paper-motor', name: 'Paper PF Motors', slug: 'paper-motors' },
    ],
  },
  {
    id: 'rollers',
    name: 'Rollers',
    slug: 'rollers',
    iconName: 'Disc',
    subcategories: [
      { id: 'pickup-roller', name: 'Paper Pickup Rollers', slug: 'pickup-rollers' },
      { id: 'feed-roller', name: 'Feed & Separation Rollers', slug: 'feed-rollers' },
    ],
  },
  {
    id: 'cables',
    name: 'Cables',
    slug: 'cables',
    iconName: 'Cable',
    subcategories: [
      { id: 'printhead-cable', name: 'Printhead Flat Flexible Cables (FFC)', slug: 'printhead-cables' },
      { id: 'sensor-cable', name: 'Sensor & Data Cables', slug: 'sensor-cables' },
    ],
  },
  {
    id: 'display-panels',
    name: 'Display Panels',
    slug: 'display-panels',
    iconName: 'Monitor',
    subcategories: [
      { id: 'lcd-screen', name: 'LCD Touch Screens', slug: 'lcd-screens' },
      { id: 'button-panel', name: 'Keypad Assemblies', slug: 'keypad-assemblies' },
    ],
  },
  {
    id: 'ink-systems',
    name: 'Ink Systems',
    slug: 'ink-systems',
    iconName: 'Droplet',
    subcategories: [
      { id: 'capping-station', name: 'Capping Stations & Pump Units', slug: 'capping-stations' },
      { id: 'damper', name: 'Ink Dampers & Tubes', slug: 'ink-dampers' },
      { id: 'waste-tank', name: 'Maintenance Box & Waste Ink Tanks', slug: 'waste-ink-tanks' },
    ],
  },
  {
    id: 'maintenance-kits',
    name: 'Maintenance Kits',
    slug: 'maintenance-kits',
    iconName: 'Wrench',
    subcategories: [
      { id: 'head-cleaning', name: 'Head Cleaning & Repair Kits', slug: 'cleaning-kits' },
      { id: 'gear-kit', name: 'Transmission Gear Assembly Kits', slug: 'gear-kits' },
    ],
  },
  {
    id: 'printer-parts',
    name: 'Other Printer Parts',
    slug: 'printer-parts',
    iconName: 'Box',
    subcategories: [
      { id: 'springs-brackets', name: 'Springs & Mount Brackets', slug: 'brackets' },
      { id: 'covers-housings', name: 'Covers & Housing Shells', slug: 'housings' },
    ],
  },
];

export const BRANDS: Brand[] = [
  { id: 'epson', name: 'Epson', productCount: 28 },
  { id: 'brother', name: 'Brother', productCount: 19 },
  { id: 'hp', name: 'HP', productCount: 22 },
];

export const PRODUCT_CONDITIONS = [
  'New',
  'Used',
  'Refurbished',
  'Original',
  'Compatible / Aftermarket',
] as const;

export const DEFAULT_SELLER_CONTACT: SellerContactInfo = {
  phone: '+250 788 123 456',
  whatsapp: '+250 788 123 456',
  email: 'mugishapacific779@gmail.com',
  businessHours: 'Mon - Sat: 8:00 AM - 6:00 PM (CAT)',
  location: 'SAM EPSON Technical Service Hub, Kigali - Rwanda',
  paymentInstructions: 'Direct Payment via MoMo Pay, Bank Transfer (BK / I&M Bank), or Cash on Pickup/Delivery.',
};
