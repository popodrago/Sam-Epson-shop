import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Epson L382 / L383 / L802 Original MicroPiezo Printhead',
    brand: 'Epson',
    categoryId: 'printheads',
    subcategoryId: 'epson-printheads',
    description: 'High-precision genuine Epson MicroPiezo printhead replacement for EcoTank L-series printers. Offers sharp resolution, accurate droplet firing, and long service life for heavy daily printing.',
    price: 85000,
    currency: 'FRW',
    minOrderQty: 1,
    unit: 'Pcs',
    status: 'Available',
    condition: 'Original',
    compatibleModels: ['Epson L382', 'Epson L383', 'Epson L802', 'Epson L310', 'Epson L365', 'Epson L485'],
    specifications: {
      Technology: 'Epson MicroPiezo Inkjet',
      NozzleConfiguration: '180 Nozzles Black, 59 Nozzles per Color',
      DropletSize: '3.0 picoliters',
      Origin: 'Japan Original'
    },
    images: [
      'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800'
    ],
    isFeatured: true,
    isNewArrival: false,
    viewsCount: 840,
    likesCount: 62,
    createdAt: '2026-07-01T10:00:00Z'
  },
  {
    id: 'prod-2',
    name: 'Epson L3150 / L3110 Mainboard Formatter Board Assembly',
    brand: 'Epson',
    categoryId: 'mainboards',
    subcategoryId: 'formatboard',
    description: 'Original tested motherboard logic board for Epson EcoTank L3150 / L3110 Wi-Fi printers. Fully programmed firmware ready for plug-and-play installation.',
    price: 65000,
    currency: 'FRW',
    minOrderQty: 1,
    unit: 'Pcs',
    status: 'Available',
    condition: 'Original',
    compatibleModels: ['Epson L3150', 'Epson L3110', 'Epson L3156', 'Epson L3160'],
    specifications: {
      Voltage: '24V DC Internal',
      Firmware: 'Latest Version Pre-flashed',
      Interfaces: 'USB 2.0 & Wi-Fi Module',
      Condition: '100% Bench Tested'
    },
    images: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
    ],
    isFeatured: true,
    isNewArrival: true,
    viewsCount: 1120,
    likesCount: 95,
    createdAt: '2026-07-15T12:00:00Z'
  },
  {
    id: 'prod-3',
    name: 'Brother DCP-T500W / T700W Original Printhead Unit',
    brand: 'Brother',
    categoryId: 'printheads',
    subcategoryId: 'brother-printheads',
    description: 'Authentic Brother InkBenefit printhead unit designed for clean nozzle patterns and vibrant color saturation across office documents and graphics.',
    price: 95000,
    currency: 'FRW',
    minOrderQty: 1,
    unit: 'Pcs',
    status: 'Available',
    condition: 'Original',
    compatibleModels: ['Brother DCP-T500W', 'Brother DCP-T700W', 'Brother MFC-T800W', 'Brother DCP-T300'],
    specifications: {
      InkCompatibility: 'Brother BTD60BK / BT5000 Dye & Pigment',
      PrintResolution: 'Up to 1200 x 6000 dpi',
      Type: 'Piezoelectric Inkjet Head'
    },
    images: [
      'https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=800'
    ],
    isFeatured: true,
    isNewArrival: false,
    viewsCount: 610,
    likesCount: 48,
    createdAt: '2026-07-18T08:30:00Z'
  },
  {
    id: 'prod-4',
    name: 'HP Smart Tank 515 / 530 Printhead Set (M0H50A Black + M0H49A Tri-Color)',
    brand: 'HP',
    categoryId: 'printheads',
    subcategoryId: 'hp-printheads',
    description: 'Complete replacement printhead pair (Black and Tri-Color) for HP Smart Tank 500/600 series printers. Quick snap-in replacement to restore sharp text and clear photo printing.',
    price: 55000,
    currency: 'FRW',
    minOrderQty: 1,
    unit: 'Set',
    status: 'Available',
    condition: 'New',
    compatibleModels: ['HP Smart Tank 515', 'HP Smart Tank 530', 'HP Smart Tank 615', 'HP Smart Tank 519', 'HP Smart Tank 500'],
    specifications: {
      PartNumbers: 'M0H50A (Black) / M0H49A (Tri-Color)',
      Technology: 'HP Thermal Inkjet',
      Packaging: 'Sealed Retail Box'
    },
    images: [
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=800'
    ],
    isFeatured: true,
    isNewArrival: true,
    viewsCount: 1450,
    likesCount: 130,
    createdAt: '2026-07-20T09:00:00Z'
  },
  {
    id: 'prod-5',
    name: 'Epson L800 / L805 Optical CR Encoder Sensor & Encoder Strip',
    brand: 'Epson',
    categoryId: 'sensors',
    subcategoryId: 'encoder-sensor',
    description: 'High-sensitivity carriage optical encoder sensor with transparent timing strip for 6-color Epson photo printers. Fixes double vision, alignment errors, and carriage tracking faults.',
    price: 18000,
    currency: 'FRW',
    minOrderQty: 1,
    unit: 'Set',
    status: 'Available',
    condition: 'New',
    compatibleModels: ['Epson L800', 'Epson L805', 'Epson L850', 'Epson Stylus Photo T50', 'Epson R290'],
    specifications: {
      StripLength: '45 cm High Precision Transparent Strip',
      ReadingType: 'Optical Infrared Motion Sensor'
    },
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800'
    ],
    isFeatured: false,
    isNewArrival: true,
    viewsCount: 380,
    likesCount: 29,
    createdAt: '2026-07-21T07:00:00Z'
  },
  {
    id: 'prod-6',
    name: 'Epson L3250 / L3251 Internal AC Power Supply Module (220V)',
    brand: 'Epson',
    categoryId: 'power-supplies',
    subcategoryId: 'power-board',
    description: 'Regulated internal power supply board delivering stable 42V / 24V output to the printer mainboard. Surged-protected design against voltage spikes.',
    price: 35000,
    currency: 'FRW',
    minOrderQty: 1,
    unit: 'Pcs',
    status: 'Available',
    condition: 'Original',
    compatibleModels: ['Epson L3250', 'Epson L3251', 'Epson L3150', 'Epson L3210', 'Epson L1210'],
    specifications: {
      InputVoltage: '100V - 240V AC 50/60Hz',
      OutputVoltage: '42V / 0.5A DC',
      Protection: 'Built-in Fuse & Thermal Protection'
    },
    images: [
      'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800'
    ],
    isFeatured: false,
    isNewArrival: false,
    viewsCount: 290,
    likesCount: 22,
    createdAt: '2026-06-11T11:00:00Z'
  },
  {
    id: 'prod-7',
    name: 'Brother DCP-T310 / T510W Formatter Board',
    brand: 'Brother',
    categoryId: 'mainboards',
    subcategoryId: 'formatboard',
    description: 'Refurbished original mainboard logic board for Brother InkBenefit Series printers. Tested for network connectivity and clean print execution.',
    price: 72000,
    currency: 'FRW',
    minOrderQty: 1,
    unit: 'Pcs',
    status: 'Available',
    condition: 'Refurbished',
    compatibleModels: ['Brother DCP-T310', 'Brother DCP-T510W', 'Brother DCP-T710W'],
    specifications: {
      Connectivity: 'USB 2.0 / Wireless B/G/N',
      Testing: 'Passed Full Self-Test Diagnostic'
    },
    images: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800'
    ],
    isFeatured: false,
    isNewArrival: false,
    viewsCount: 510,
    likesCount: 41,
    createdAt: '2026-05-14T16:00:00Z'
  },
  {
    id: 'prod-8',
    name: 'Epson L382 / L380 / L385 High-Torque CR Carriage Motor',
    brand: 'Epson',
    categoryId: 'motors',
    subcategoryId: 'carriage-motor',
    description: 'Heavy-duty carriage motor drives the printhead back and forth along the guide rail. Quiet operation with copper windings and long life bearings.',
    price: 28000,
    currency: 'FRW',
    minOrderQty: 1,
    unit: 'Pcs',
    status: 'Available',
    condition: 'Original',
    compatibleModels: ['Epson L382', 'Epson L380', 'Epson L385', 'Epson L310', 'Epson L220'],
    specifications: {
      OperatingVoltage: '42V DC',
      GearPinion: '10 Tooth Brass Pinion'
    },
    images: [
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800'
    ],
    isFeatured: false,
    isNewArrival: false,
    viewsCount: 430,
    likesCount: 35,
    createdAt: '2026-07-19T15:20:00Z'
  },
  {
    id: 'prod-9',
    name: 'Epson L3110 / L3150 Paper Pickup Roller & Separation Pad Assembly',
    brand: 'Epson',
    categoryId: 'rollers',
    subcategoryId: 'pickup-roller',
    description: 'High-friction rubber pickup roller and separation pad kit. Resolves paper feed slipping, multiple paper pick faults, and tray jam errors.',
    price: 15000,
    currency: 'FRW',
    minOrderQty: 2,
    unit: 'Set',
    status: 'Available',
    condition: 'New',
    compatibleModels: ['Epson L3110', 'Epson L3150', 'Epson L3210', 'Epson L3250', 'Epson L1110'],
    specifications: {
      Material: 'High-Durability Soft Rubber & Spring Pad',
      PageYield: 'Approx. 50,000 pages'
    },
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=800'
    ],
    isFeatured: true,
    isNewArrival: true,
    viewsCount: 950,
    likesCount: 88,
    createdAt: '2026-06-28T10:10:00Z'
  },
  {
    id: 'prod-10',
    name: 'HP Ink Tank 315 / 415 & GT 5810 Capping Station & Pump Unit',
    brand: 'HP',
    categoryId: 'ink-systems',
    subcategoryId: 'capping-station',
    description: 'Automatic head cleaning suction pump and rubber capping seal assembly. Prevents printhead nozzle clogging and maintains ink prime.',
    price: 42000,
    currency: 'FRW',
    minOrderQty: 1,
    unit: 'Pcs',
    status: 'Available',
    condition: 'Compatible / Aftermarket',
    compatibleModels: ['HP DeskJet GT 5810', 'HP DeskJet GT 5820', 'HP Ink Tank 315', 'HP Ink Tank 415'],
    specifications: {
      Mechanism: 'Peristaltic Motorized Pump Unit',
      SealMaterial: 'Chemical Resistant Silicon Cap'
    },
    images: [
      'https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&q=80&w=800'
    ],
    isFeatured: false,
    isNewArrival: false,
    viewsCount: 340,
    likesCount: 26,
    createdAt: '2026-06-20T14:15:00Z'
  },
  {
    id: 'prod-11',
    name: 'Epson L805 / L800 Printhead Flat Flexible Ribbon Cable (FFC 20-pin)',
    brand: 'Epson',
    categoryId: 'cables',
    subcategoryId: 'printhead-cable',
    description: 'Shielded flexible flat ribbon signal cable connecting mainboard to printhead carriage board. Gold-plated contacts for zero data signal drop.',
    price: 12000,
    currency: 'FRW',
    minOrderQty: 2,
    unit: 'Pcs',
    status: 'Available',
    condition: 'New',
    compatibleModels: ['Epson L805', 'Epson L800', 'Epson L850'],
    specifications: {
      Pins: '20 Pin Pitch 1.0mm',
      Length: '78 cm Reinforced Flexible Cable'
    },
    images: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800'
    ],
    isFeatured: false,
    isNewArrival: false,
    viewsCount: 210,
    likesCount: 17,
    createdAt: '2026-07-05T11:00:00Z'
  },
  {
    id: 'prod-12',
    name: 'Epson L3110 / L3150 Waste Ink Maintenance Box & Absorber Pad Unit',
    brand: 'Epson',
    categoryId: 'ink-systems',
    subcategoryId: 'waste-tank',
    description: 'Full waste ink reservoir tank with high-density absorbent felt pads. Clears "Waste Ink Pad Is At The End Of Its Service Life" warning when reset.',
    price: 22000,
    currency: 'FRW',
    minOrderQty: 1,
    unit: 'Kit',
    status: 'Available',
    condition: 'New',
    compatibleModels: ['Epson L3110', 'Epson L3150', 'Epson L3210', 'Epson L3250', 'Epson L1110', 'Epson L5190'],
    specifications: {
      Capacity: 'Full Density Absorbent Sponge Set',
      Includes: 'Casing Unit + 5 Layers Felt Sponge'
    },
    images: [
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&q=80&w=800'
    ],
    isFeatured: true,
    isNewArrival: false,
    viewsCount: 990,
    likesCount: 76,
    createdAt: '2026-07-10T14:30:00Z'
  },
  {
    id: 'prod-13',
    name: 'Epson L3150 / L3151 Wi-Fi Power Switch & Button Control Panel PCB',
    brand: 'Epson',
    categoryId: 'control-boards',
    subcategoryId: 'panel-board',
    description: 'Original front control panel button keypad PCB with Wi-Fi indicator LEDs and soft power push button. Fully tested plug and play replacement.',
    price: 25000,
    currency: 'FRW',
    minOrderQty: 1,
    unit: 'Pcs',
    status: 'Available',
    condition: 'Original',
    compatibleModels: ['Epson L3150', 'Epson L3151', 'Epson L3156'],
    specifications: {
      Buttons: 'Power, Wi-Fi, Wi-Fi Direct, Stop, Copy Color, Copy BK',
      Connector: '12-pin Flat Flex Cable Connector'
    },
    images: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800'
    ],
    isFeatured: false,
    isNewArrival: true,
    viewsCount: 420,
    likesCount: 31,
    createdAt: '2026-07-22T11:20:00Z'
  },
  {
    id: 'prod-14',
    name: 'Epson EcoTank L5190 Color LCD Display Panel & Touch Assembly',
    brand: 'Epson',
    categoryId: 'display-panels',
    subcategoryId: 'lcd-screen',
    description: 'Original 1.44-inch color LCD display screen panel for Epson all-in-one fax/scanner printers. Restores crisp menu navigation and status diagnostics.',
    price: 38000,
    currency: 'FRW',
    minOrderQty: 1,
    unit: 'Pcs',
    status: 'Available',
    condition: 'Original',
    compatibleModels: ['Epson L5190', 'Epson L5290', 'Epson ET-4700'],
    specifications: {
      ScreenSize: '1.44 inch TFT Color LCD',
      Interface: 'Serial SPI Interface Cable'
    },
    images: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
    ],
    isFeatured: true,
    isNewArrival: true,
    viewsCount: 670,
    likesCount: 52,
    createdAt: '2026-07-25T09:15:00Z'
  },
  {
    id: 'prod-15',
    name: 'Epson L805 / L800 Main Logic Board Assembly',
    brand: 'Epson',
    categoryId: 'mainboards',
    subcategoryId: 'logicboard',
    description: 'Original high-performance logic motherboard for 6-color Epson photo printers. Controls MicroPiezo firing timings, stepper motor drivers, and USB connectivity.',
    price: 88000,
    currency: 'FRW',
    minOrderQty: 1,
    unit: 'Pcs',
    status: 'Available',
    condition: 'Original',
    compatibleModels: ['Epson L805', 'Epson L800', 'Epson L850'],
    specifications: {
      Processor: 'Epson Custom Logic Controller',
      Interface: 'USB 2.0 High Speed + Wi-Fi',
      Condition: '100% Bench Diagnostic Tested'
    },
    images: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
    ],
    isFeatured: true,
    isNewArrival: false,
    viewsCount: 780,
    likesCount: 64,
    createdAt: '2026-07-26T10:00:00Z'
  },
  {
    id: 'prod-16',
    name: 'Epson L3110 / L3150 Paper Feed (PE) Optical Sensor Module',
    brand: 'Epson',
    categoryId: 'sensors',
    subcategoryId: 'paper-sensor',
    description: 'High-sensitivity optical paper presence detection sensor. Resolves "Paper Out", fake jam alerts, and incorrect page start positioning.',
    price: 16000,
    currency: 'FRW',
    minOrderQty: 1,
    unit: 'Pcs',
    status: 'Available',
    condition: 'Original',
    compatibleModels: ['Epson L3110', 'Epson L3150', 'Epson L3210', 'Epson L3250'],
    specifications: {
      SensorType: 'Infrared Photoelectric Transmissive',
      Cable: 'Pre-attached 3-pin Connector Wire'
    },
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800'
    ],
    isFeatured: false,
    isNewArrival: true,
    viewsCount: 310,
    likesCount: 24,
    createdAt: '2026-07-27T08:30:00Z'
  },
  {
    id: 'prod-17',
    name: 'HP Smart Tank 500 / 600 Series 32V External AC Power Adapter',
    brand: 'HP',
    categoryId: 'power-supplies',
    subcategoryId: 'adapter',
    description: 'Regulated external AC/DC power supply brick adapter for HP Smart Tank and DeskJet All-in-One printers. Heavy-duty copper windings with surge protection.',
    price: 28000,
    currency: 'FRW',
    minOrderQty: 1,
    unit: 'Pcs',
    status: 'Available',
    condition: 'New',
    compatibleModels: ['HP Smart Tank 515', 'HP Smart Tank 530', 'HP DeskJet 2700', 'HP DeskJet 3700'],
    specifications: {
      Input: '100-240V 50/60Hz',
      Output: '32V DC 1560mA / 12V 625mA',
      Connector: 'HP 3-pin Purple Plug'
    },
    images: [
      'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800'
    ],
    isFeatured: false,
    isNewArrival: false,
    viewsCount: 290,
    likesCount: 19,
    createdAt: '2026-07-27T09:00:00Z'
  },
  {
    id: 'prod-18',
    name: 'Epson L800 / L805 Printhead Carriage PCA Sub-Board',
    brand: 'Epson',
    categoryId: 'control-boards',
    subcategoryId: 'carriage-board',
    description: 'Carriage interface circuit board directly mounted behind the printhead. Connects flat flex ribbon signal cables seamlessly to nozzle contact pins.',
    price: 32000,
    currency: 'FRW',
    minOrderQty: 1,
    unit: 'Pcs',
    status: 'Available',
    condition: 'Original',
    compatibleModels: ['Epson L805', 'Epson L800', 'Epson L850'],
    specifications: {
      Contacts: 'Gold Plated Low Resistance Pins',
      Fitment: 'Direct Snap-fit on Printhead Carrier'
    },
    images: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
    ],
    isFeatured: false,
    isNewArrival: true,
    viewsCount: 340,
    likesCount: 27,
    createdAt: '2026-07-27T11:00:00Z'
  },
  {
    id: 'prod-19',
    name: 'Brother DCP-T500W / T700W Paper Feed (PF) Stepper Motor',
    brand: 'Brother',
    categoryId: 'motors',
    subcategoryId: 'paper-motor',
    description: 'High-torque paper drive stepper motor for Brother InkBenefit printers. Drives precision feed rollers for exact line positioning without horizontal white bands.',
    price: 34000,
    currency: 'FRW',
    minOrderQty: 1,
    unit: 'Pcs',
    status: 'Available',
    condition: 'Original',
    compatibleModels: ['Brother DCP-T500W', 'Brother DCP-T700W', 'Brother MFC-T800W'],
    specifications: {
      MotorType: 'DC Servo / Stepper Motor',
      Gear: 'Pre-fitted Helical Drive Pinion'
    },
    images: [
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800'
    ],
    isFeatured: false,
    isNewArrival: false,
    viewsCount: 260,
    likesCount: 18,
    createdAt: '2026-07-28T08:00:00Z'
  },
  {
    id: 'prod-20',
    name: 'Epson EcoTank L382 / L386 Lower Feed & Separation Roller Unit',
    brand: 'Epson',
    categoryId: 'rollers',
    subcategoryId: 'feed-roller',
    description: 'Soft rubber bottom separation roller with spring housing assembly. Eliminates multi-sheet paper feeding and roller slipping.',
    price: 14000,
    currency: 'FRW',
    minOrderQty: 2,
    unit: 'Set',
    status: 'Available',
    condition: 'New',
    compatibleModels: ['Epson L382', 'Epson L386', 'Epson L310', 'Epson L485'],
    specifications: {
      RubberGrade: 'High Friction Synthetic Rubber',
      Includes: 'Roller Shaft + Separation Spring'
    },
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=800'
    ],
    isFeatured: false,
    isNewArrival: true,
    viewsCount: 380,
    likesCount: 29,
    createdAt: '2026-07-28T09:30:00Z'
  },
  {
    id: 'prod-21',
    name: 'Universal Optical Sensor & Encoder Flex Ribbon Cable Pair',
    brand: 'Epson',
    categoryId: 'cables',
    subcategoryId: 'sensor-cable',
    description: 'Flex ribbon data cable pair connecting paper sensors and optical encoder boards to the motherboard. Reinforced insulation against fatigue cracks.',
    price: 9500,
    currency: 'FRW',
    minOrderQty: 2,
    unit: 'Pair',
    status: 'Available',
    condition: 'New',
    compatibleModels: ['Epson L3110', 'Epson L3150', 'Brother DCP-T500W', 'Brother DCP-T710W'],
    specifications: {
      Pins: '4-pin & 6-pin 1.0mm Pitch',
      Length: '45 cm Flexible FFC'
    },
    images: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800'
    ],
    isFeatured: false,
    isNewArrival: false,
    viewsCount: 190,
    likesCount: 14,
    createdAt: '2026-07-28T11:00:00Z'
  },
  {
    id: 'prod-22',
    name: 'Brother DCP-T500W / T700W Keypad Control Panel Switch Assembly',
    brand: 'Brother',
    categoryId: 'display-panels',
    subcategoryId: 'button-panel',
    description: 'Front control panel rubber membrane switches and indicator LED PCB board. Restores responsive button clicks and power control.',
    price: 26000,
    currency: 'FRW',
    minOrderQty: 1,
    unit: 'Pcs',
    status: 'Available',
    condition: 'Original',
    compatibleModels: ['Brother DCP-T500W', 'Brother DCP-T700W', 'Brother DCP-T300'],
    specifications: {
      Buttons: 'Power, Mono Start, Color Start, Stop/Clear, Menu',
      Interface: 'Multi-pin Ribbon Header'
    },
    images: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800'
    ],
    isFeatured: false,
    isNewArrival: true,
    viewsCount: 280,
    likesCount: 22,
    createdAt: '2026-07-28T12:00:00Z'
  },
  {
    id: 'prod-23',
    name: 'Epson L800 / L805 / L1800 Solvent & Dye Ink Dampers (Set of 6)',
    brand: 'Epson',
    categoryId: 'ink-systems',
    subcategoryId: 'damper',
    description: 'Set of 6 transparent ink dampers with high-density micro mesh filter screens. Prevents air locks, nozzle starvation, and ink backflow.',
    price: 18000,
    currency: 'FRW',
    minOrderQty: 1,
    unit: 'Set',
    status: 'Available',
    condition: 'New',
    compatibleModels: ['Epson L800', 'Epson L805', 'Epson L1800', 'Epson Stylus Photo 1400'],
    specifications: {
      Filter: '3 Micron Steel Mesh Filter',
      Includes: '6 Dampers with Soft Silicone Tube Connectors'
    },
    images: [
      'https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&q=80&w=800'
    ],
    isFeatured: true,
    isNewArrival: true,
    viewsCount: 520,
    likesCount: 45,
    createdAt: '2026-07-29T08:00:00Z'
  },
  {
    id: 'prod-24',
    name: 'Universal MicroPiezo Printhead Flush & Nozzle Cleaning Solution Kit',
    brand: 'Epson',
    categoryId: 'maintenance-kits',
    subcategoryId: 'head-cleaning',
    description: 'Professional 250ml printhead flush liquid, luer-lock syringe, silicone transfer adapter, and gloves. Dissolves dried pigment & dye ink in clogged nozzles.',
    price: 19500,
    currency: 'FRW',
    minOrderQty: 1,
    unit: 'Kit',
    status: 'Available',
    condition: 'New',
    compatibleModels: ['Epson L382', 'Epson L3150', 'Brother DCP-T500W', 'HP Smart Tank 515'],
    specifications: {
      Volume: '250ml Active Solvent Solution',
      Includes: 'Syringe + Flexible Nozzle Tube + Gloves'
    },
    images: [
      'https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800'
    ],
    isFeatured: true,
    isNewArrival: false,
    viewsCount: 880,
    likesCount: 71,
    createdAt: '2026-07-29T10:00:00Z'
  },
  {
    id: 'prod-25',
    name: 'Epson EcoTank L3150 / L3110 Transmission Gear Assembly Train Kit',
    brand: 'Epson',
    categoryId: 'maintenance-kits',
    subcategoryId: 'gear-kit',
    description: 'Precision molded nylon drive gear set for carriage and paper pickup drive assemblies. Eliminates gear grinding noise and tooth misalignment.',
    price: 17000,
    currency: 'FRW',
    minOrderQty: 1,
    unit: 'Kit',
    status: 'Available',
    condition: 'New',
    compatibleModels: ['Epson L3110', 'Epson L3150', 'Epson L3210', 'Epson L3250'],
    specifications: {
      Material: 'Reinforced Industrial Nylon',
      Includes: '4 Interlocking Reduction Drive Gears'
    },
    images: [
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800'
    ],
    isFeatured: false,
    isNewArrival: true,
    viewsCount: 390,
    likesCount: 33,
    createdAt: '2026-07-29T11:30:00Z'
  },
  {
    id: 'prod-26',
    name: 'Epson L382 / L3150 Printhead Carriage Guide Brackets & Tension Springs',
    brand: 'Epson',
    categoryId: 'printer-parts',
    subcategoryId: 'springs-brackets',
    description: 'Stainless steel carriage slider guide brackets and timing belt tensioner springs. Maintains strict head gap spacing for sharp photo prints.',
    price: 12500,
    currency: 'FRW',
    minOrderQty: 1,
    unit: 'Set',
    status: 'Available',
    condition: 'Original',
    compatibleModels: ['Epson L382', 'Epson L3150', 'Epson L805'],
    specifications: {
      Material: 'Tension Treated Stainless Steel',
      Includes: '2 Brackets + 2 High Tension Springs'
    },
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=800'
    ],
    isFeatured: false,
    isNewArrival: false,
    viewsCount: 220,
    likesCount: 16,
    createdAt: '2026-07-30T07:00:00Z'
  },
  {
    id: 'prod-27',
    name: 'Epson EcoTank L3150 Top Housing Cover & Scanner Glass Frame Assembly',
    brand: 'Epson',
    categoryId: 'printer-parts',
    subcategoryId: 'covers-housings',
    description: 'Original outer plastic housing shell casing, scanner glass bed, and top cover lid. Replaces cracked, scratched, or damaged printer body parts.',
    price: 32000,
    currency: 'FRW',
    minOrderQty: 1,
    unit: 'Pcs',
    status: 'Available',
    condition: 'Original',
    compatibleModels: ['Epson L3150', 'Epson L3110', 'Epson L3156'],
    specifications: {
      Color: 'Matte Black High Impact ABS Plastic',
      Includes: 'Scanner Glass + Lid Hinges + Top Housing Shell'
    },
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800'
    ],
    isFeatured: false,
    isNewArrival: true,
    viewsCount: 410,
    likesCount: 31,
    createdAt: '2026-07-30T08:00:00Z'
  }
];

