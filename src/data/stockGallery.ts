export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: 'printheads' | 'mainboards' | 'sensors' | 'power-supplies' | 'control-boards' | 'motors' | 'rollers' | 'cables' | 'display-panels' | 'ink-systems' | 'maintenance-kits' | 'printer-parts';
}

export const STOCK_GALLERY_IMAGES: GalleryImage[] = [
  // Printheads
  {
    id: 'ph-1',
    url: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=800',
    title: 'Epson L382 / L802 Original Printhead',
    category: 'printheads',
  },
  {
    id: 'ph-2',
    url: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&q=80&w=800',
    title: 'Brother DCP-T500W Printhead Unit',
    category: 'printheads',
  },
  {
    id: 'ph-3',
    url: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&q=80&w=800',
    title: 'HP Smart Tank Dual Printhead Assembly',
    category: 'printheads',
  },

  // Mainboards
  {
    id: 'mb-1',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    title: 'Epson L3150 Wi-Fi Formatter Board',
    category: 'mainboards',
  },
  {
    id: 'mb-2',
    url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    title: 'Brother DCP-T510W Motherboard PCA',
    category: 'mainboards',
  },

  // Sensors & Electronics
  {
    id: 'sn-1',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800',
    title: 'Epson L805 CR Encoder Strip & Sensor',
    category: 'sensors',
  },

  // Power Supplies
  {
    id: 'ps-1',
    url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=800',
    title: 'Epson EcoTank 220V Power Board',
    category: 'power-supplies',
  },

  // Rollers & Ink Systems
  {
    id: 'rl-1',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800',
    title: 'Paper Pickup & Feed Roller Assembly',
    category: 'rollers',
  },
  {
    id: 'ik-1',
    url: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&q=80&w=800',
    title: 'HP Smart Tank Capping Station Unit',
    category: 'ink-systems',
  },
];
