const sampleUsers = [
  // Customers
  {
    name: 'Aarav Sharma',
    email: 'customer@serveeasy.in',
    password: 'password123',
    role: 'customer',
    phone: '+91 98201 12345',
    city: 'Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Ananya Iyer',
    email: 'ananya@example.com',
    password: 'password123',
    role: 'customer',
    phone: '+91 98450 67890',
    city: 'Mumbai',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80'
  },

  // Providers
  {
    name: 'Rajesh Kumar',
    email: 'provider@serveeasy.in',
    password: 'password123',
    role: 'provider',
    phone: '+91 98111 22334',
    city: 'Bengaluru',
    rating: 4.9,
    bio: 'Certified Master Technician with 9+ years experience in premium appliance repairs & electrical installations.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    license: {
      number: 'KA-ELEC-2023-88492',
      type: 'Class-A Electrical & HVAC Wireman License',
      issuingAuthority: 'Chief Electrical Inspectorate to Govt. of Karnataka',
      expiryDate: '2027-11-30',
      status: 'verified'
    }
  },
  {
    name: 'Sunita Verma',
    email: 'sunita@serveeasy.in',
    password: 'password123',
    role: 'provider',
    phone: '+91 98222 33445',
    city: 'Bengaluru',
    rating: 4.95,
    bio: 'Hospital-grade sanitization and deep home cleaning expert with over 1,200 successful residential services.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    license: {
      number: 'KA-SAN-2022-44109',
      type: 'Industrial Deep Cleaning & Hospital-Grade Sanitization Permit',
      issuingAuthority: 'Bruhat Bengaluru Mahanagara Palike (BBMP) Public Health Dept.',
      expiryDate: '2026-10-15',
      status: 'verified'
    }
  },
  {
    name: 'Amit Patel',
    email: 'amit@serveeasy.in',
    password: 'password123',
    role: 'provider',
    phone: '+91 98333 44556',
    city: 'Mumbai',
    rating: 4.82,
    bio: 'Licensed plumbing contractor specializing in sanitary fittings, high-pressure booster systems & leakages.',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=400&q=80',
    license: {
      number: 'MH-PLUMB-2021-33120',
      type: 'Licensed Master Sanitary & High-Pressure Plumbing Contractor',
      issuingAuthority: 'Brihanmumbai Municipal Corporation (BMC) Water Works',
      expiryDate: '2028-05-20',
      status: 'verified'
    }
  },
  {
    name: 'Priya Sundaram',
    email: 'priya@serveeasy.in',
    password: 'password123',
    role: 'provider',
    phone: '+91 98444 55667',
    city: 'Bengaluru',
    rating: 4.92,
    bio: 'Certified wellness and beauty specialist bringing luxury salon care & grooming directly to your doorstep.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    license: {
      number: 'CIDESCO-IN-2020-1984',
      type: 'CIDESCO International Cosmetology & Aestheticienne License',
      issuingAuthority: 'Beauty & Wellness Sector Skill Council (BWSSC Govt. of India)',
      expiryDate: '2029-03-31',
      status: 'verified'
    }
  },
  {
    name: 'Vikram Chauhan',
    email: 'vikram@serveeasy.in',
    password: 'password123',
    role: 'provider',
    phone: '+91 98555 66778',
    city: 'Delhi NCR',
    rating: 4.88,
    bio: 'Government-certified urban pest control expert using eco-friendly, odorless and pet-safe botanical gels.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    license: {
      number: 'CIB-DL-2023-7721',
      type: 'Commercial Pest Management & Plant Protection Operator Permit',
      issuingAuthority: 'Central Insecticides Board & Registration Committee (Govt. of India)',
      expiryDate: '2027-08-14',
      status: 'verified'
    }
  }
];

const sampleServices = [
  // Cleaning
  {
    title: 'Full Home Deep Cleaning (2BHK / 3BHK)',
    category: 'Cleaning',
    description: 'Complete high-pressure steam cleaning of entire house including bedrooms, living room, balconies, floor scrubbing with single-disc machine, window panes, and door frames.',
    price: 1899,
    duration: '4-5 hours',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    providerEmail: 'sunita@serveeasy.in',
    rating: 4.9,
    reviewCount: 88,
    features: [
      'Industrial single-disc floor scrubbing',
      'High-pressure steam sanitization',
      'Eco-friendly non-toxic certified chemicals',
      'Behind-furniture cobweb & stain clearance'
    ]
  },
  {
    title: 'Intense Bathroom Scrub & Anti-Bacterial Sanitization',
    category: 'Cleaning',
    description: 'Specialized hard-water stain removal on tiles, descaling of taps, showerheads, mirrors, and deep rim sanitization of toilet bowls with bactericidal foam.',
    price: 499,
    duration: '60 mins',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    providerEmail: 'sunita@serveeasy.in',
    rating: 4.8,
    reviewCount: 46,
    features: [
      'Hard water scale removal from fittings & glass',
      'Tile grout dirt extraction & buffing',
      'Anti-fungal odor-neutralizing treatment',
      'Mirrors and exhaust fan deep cleansing'
    ]
  },
  {
    title: 'Modular Kitchen Deep Degreasing & Chimney Care',
    category: 'Cleaning',
    description: 'Heavy grease and oil grime removal from kitchen backsplash tiles, countertop, cabinet exteriors, sink sanitization, and thorough chimney baffle filter degreasing.',
    price: 899,
    duration: '90 mins',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    providerEmail: 'sunita@serveeasy.in',
    rating: 4.9,
    reviewCount: 52,
    features: [
      'Food-safe degreasing solution applied',
      'Chimney filter immersion wash',
      'Burner plate carbon deposit cleaning',
      'Cabinets exterior wipe-down and polishing'
    ]
  },

  // Appliances
  {
    title: 'Split AC Power Jet Cleaning & Gas Pressure Check',
    category: 'Appliances',
    description: 'Thorough indoor and outdoor coil washing using high-speed jet pump with protective canvas jacket. Includes blower wheel wash, drain pipe flush, and cooling gas PSI audit.',
    price: 649,
    duration: '60 mins',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    providerEmail: 'provider@serveeasy.in',
    rating: 4.95,
    reviewCount: 142,
    features: [
      'Deep jet wash for cooling coils & blower',
      'Anti-spill jacket for mess-free living room service',
      'Freon/R32 gas pressure gauge testing',
      'Includes 30-day cooling assurance'
    ]
  },
  {
    title: 'Double-Door Refrigerator Comprehensive Repair & Checkup',
    category: 'Appliances',
    description: 'Diagnostic overhaul for cooling issues, freezer icing, compressor relay humming, thermostat malfunction, and condenser coil vacuum cleaning for inverter & frost-free models.',
    price: 549,
    duration: '45 mins',
    imageUrl: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80',
    providerEmail: 'provider@serveeasy.in',
    rating: 4.85,
    reviewCount: 39,
    features: [
      'Full electrical multimeter system audit',
      'Thermostat & defrost heater test',
      'Door gasket seal magnetic leak test',
      'Genuine OEM spare replacement quote if needed'
    ]
  },
  {
    title: 'Automatic Washing Machine Drum Decalcification & Servicing',
    category: 'Appliances',
    description: 'Removal of lint, detergent residue and hard water scale buildup from front-load and top-load drums. Drainage pump unblocking, spin motor vibration dampening, and hose checks.',
    price: 499,
    duration: '45 mins',
    imageUrl: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80',
    providerEmail: 'provider@serveeasy.in',
    rating: 4.88,
    reviewCount: 67,
    features: [
      'Pulsator and inner drum scale removal',
      'Water inlet filter & drainage pump purge',
      'Spin cycle balancing and noise dampening',
      '30-day post-service guarantee'
    ]
  },

  // Electrical
  {
    title: 'Expert Electrician on Demand (2-Hour Fix Pack)',
    category: 'Electrical',
    description: 'Convenient hourly service for fixing flickering lights, MCB tripping, loose wiring, switch replacements, short circuits, or installing chandeliers and decorative fixtures.',
    price: 349,
    duration: '2 hours',
    imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80',
    providerEmail: 'provider@serveeasy.in',
    rating: 4.9,
    reviewCount: 118,
    features: [
      'Certified Class-A wireman with safety kit',
      'Voltage and earth-leakage testing',
      'Instant repair for up to 3 electrical points',
      'Fire-safe insulation tape & wire dressing'
    ]
  },
  {
    title: 'Ceiling Fan & Inverter Battery Setup & Calibration',
    category: 'Electrical',
    description: 'Safe mounting and hook anchoring of ceiling fans, BLDC motor controller sync, inverter wiring connection, and battery distilled water / electrolyte level calibration.',
    price: 299,
    duration: '45 mins',
    imageUrl: 'https://images.unsplash.com/photo-1558441719-8b489c638a19?auto=format&fit=crop&w=800&q=80',
    providerEmail: 'provider@serveeasy.in',
    rating: 4.82,
    reviewCount: 31,
    features: [
      'High-tensile anchor bolt installation',
      'Regulator & BLDC remote pairing',
      'Battery terminal corrosion cleanup',
      'Pre-commission safety test'
    ]
  },

  // Plumbing
  {
    title: 'Tap, Shower & Concealed Pipe Leakage Repair',
    category: 'Plumbing',
    description: 'Fix dripping quarter-turn taps, mixer faucets, flush tank continuous leakage, shower diverter valve jams, and under-sink PVC drainage leaks with precision threading.',
    price: 399,
    duration: '45 mins',
    imageUrl: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
    providerEmail: 'amit@serveeasy.in',
    rating: 4.85,
    reviewCount: 74,
    features: [
      'PTFE Teflon thread sealing and washer swaps',
      'Zero wall damage leak isolation',
      'Flush tank syphon kit repair',
      'Pressure testing for hot and cold lines'
    ]
  },
  {
    title: 'Overhead Water Tank Chemical-Free UV Sterilization',
    category: 'Plumbing',
    description: 'Complete de-sludging of overhead plastic or RCC water tanks up to 1500L. Rotary brush sludge extraction, high-pressure pressure washing, and UV germicidal purification.',
    price: 799,
    duration: '2 hours',
    imageUrl: 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80',
    providerEmail: 'amit@serveeasy.in',
    rating: 4.8,
    reviewCount: 29,
    features: [
      'Sediment sludge suction pump extraction',
      'Antibacterial organic cleansing agent',
      'UV submersible radiator sterilization',
      'Potable water purity verification'
    ]
  },

  // Grooming
  {
    title: "Men's Executive Haircut, Beard Trim & Head Massage",
    category: 'Grooming',
    description: 'Doorstep barber styling: customized fade or classic scissor cut, razor-sharp beard shaping with hot towel treatment, followed by a 15-minute relaxing peppermint oil head massage.',
    price: 449,
    duration: '60 mins',
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
    providerEmail: 'priya@serveeasy.in',
    rating: 4.93,
    reviewCount: 95,
    features: [
      'Single-use sanitized disposable cape & blades',
      'Precision styling tailored to your face structure',
      'Hot towel steam finish for open pores',
      'Zero mess floor sheet guaranteed'
    ]
  },
  {
    title: "Women's Ayurvedic Glow Facial & Relaxing Spa Pedicure",
    category: 'Grooming',
    description: 'Pure herbal brightening facial with saffron honey extract, blackhead extraction, vitamin C mask, combined with reflexology cuticle care and relaxing foot spa.',
    price: 1399,
    duration: '90 mins',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    providerEmail: 'priya@serveeasy.in',
    rating: 4.96,
    reviewCount: 110,
    features: [
      'Single-dose sealed organic product kits',
      'Ultrasonic skin scrubber exfoliation',
      'Aromatherapy foot bath & massage',
      'Licensed professional aesthetician'
    ]
  },

  // Pest Control
  {
    title: 'Advanced 4-Step Odorless Cockroach & Pest Shield',
    category: 'Pest Control',
    description: 'Comprehensive pest prevention using advanced Fipronil bait dot gels in kitchen cabinets, drain crack spray, and insect growth regulator bait traps. No need to empty cupboards.',
    price: 899,
    duration: '60 mins',
    imageUrl: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=800&q=80',
    providerEmail: 'vikram@serveeasy.in',
    rating: 4.87,
    reviewCount: 54,
    features: [
      '100% odorless & pet-friendly target gel',
      'Cupboards stay packed - zero prep hassle',
      'Targeted drainage pipe crack spray',
      'Free 90-day re-service warranty'
    ]
  }
];

module.exports = { sampleUsers, sampleServices };
