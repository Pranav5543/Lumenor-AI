export const fallbackProducts = [
  {
    _id: 'atelier-coat',
    title: 'Atelier Wool Overcoat',
    slug: 'atelier-wool-overcoat',
    description: 'Double-faced wool, architectural shoulder, hand-finished matte hardware.',
    categories: ['Outerwear', 'Atelier'],
    gender: 'Unisex',
    tags: ['wool', 'minimal', 'tailored'],
    pricing: { base: 680, sale: 620 },
    images: [{ url: 'https://res.cloudinary.com/dw7cppuwq/image/upload/v1779693284/photo-1520975954732-35dd22299614_aqxmjv.avif' }],
    ratings: { average: 4.9, count: 138 },
    stock: 18,
    featured: true,
    trending: true,
    variants: [
      { size: 'S', color: 'Carbon', hex: '#151515', sku: 'NT-AWO-C-S', inventory: 6, price: 620 },
      { size: 'M', color: 'Graphite', hex: '#3F3F46', sku: 'NT-AWO-G-M', inventory: 8, price: 620 }
    ]
  },
  {
    _id: 'silk-shirt',
    title: 'Liquid Silk Camp Shirt',
    slug: 'liquid-silk-camp-shirt',
    description: 'Fluid matte silk with a relaxed premium drape and concealed placket.',
    categories: ['Shirts', 'Resort'],
    gender: 'Women',
    tags: ['silk', 'drape', 'evening'],
    pricing: { base: 260 },
    images: [{ url: 'https://res.cloudinary.com/dw7cppuwq/image/upload/v1779693282/photo-1515886657613-9f3515b0c78f_f2xwqf.avif' }],
    ratings: { average: 4.8, count: 91 },
    stock: 32,
    featured: true,
    trending: false,
    variants: [
      { size: 'XS', color: 'Ivory', hex: '#E5E5E5', sku: 'NT-LSC-I-XS', inventory: 10, price: 260 },
      { size: 'M', color: 'Noir', hex: '#0B0B0C', sku: 'NT-LSC-N-M', inventory: 12, price: 260 }
    ]
  },
  {
    _id: 'technical-trouser',
    title: 'Technical Pleated Trouser',
    slug: 'technical-pleated-trouser',
    description: 'Tailored volume with four-way stretch, hidden utility pockets, and clean fall.',
    categories: ['Trousers', 'Technical'],
    gender: 'Men',
    tags: ['technical', 'tailored', 'travel'],
    pricing: { base: 320 },
    images: [{ url: 'https://res.cloudinary.com/dw7cppuwq/image/upload/v1779693283/photo-1516826957135-700dedea698c_hszdx7.avif' }],
    ratings: { average: 4.7, count: 74 },
    stock: 25,
    featured: false,
    trending: true,
    variants: [
      { size: '30', color: 'Ink', hex: '#111827', sku: 'NT-TPT-I-30', inventory: 9, price: 320 },
      { size: '32', color: 'Ash', hex: '#71717A', sku: 'NT-TPT-A-32', inventory: 7, price: 320 }
    ]
  },
  {
    _id: 'sculpt-knit',
    title: 'Sculpt Knit Dress',
    slug: 'sculpt-knit-dress',
    description: 'Dense rib knit, sculpted waist, and quiet evening polish.',
    categories: ['Dresses', 'Knitwear'],
    gender: 'Women',
    tags: ['knit', 'evening', 'body'],
    pricing: { base: 410 },
    images: [{ url: 'https://res.cloudinary.com/dw7cppuwq/image/upload/v1779693295/photo-1483985988355-763728e1935b_lkux81.avif' }],
    ratings: { average: 4.9, count: 122 },
    stock: 14,
    featured: true,
    trending: true,
    variants: [
      { size: 'S', color: 'Noir', hex: '#0B0B0C', sku: 'NT-SKD-N-S', inventory: 5, price: 410 },
      { size: 'M', color: 'Steel', hex: '#52525B', sku: 'NT-SKD-S-M', inventory: 6, price: 410 }
    ]
  }
];
