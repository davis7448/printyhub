export interface Product {
  id: string;
  name: string;
  reference: string;
  color: string;
  category: 'tshirt' | 'hoodie' | 'tank' | 'sweatshirt' | 'polo';
  fit: 'oversize' | 'regular' | 'slim';
  material: string;
  weight: string;
  images: string[];
  price?: number;
  description?: string;
  features: string[];
  sizeChart: {
    size: string;
    chest: string;
    length: string;
    sleeve: string;
  }[];
}

export const products: Product[] = [
  {
    id: '1',
    name: 'T-Shirt Premium Oversize',
    reference: 'TSH-001',
    color: 'Negro',
    category: 'tshirt',
    fit: 'oversize',
    material: 'Algodón peruano 100%',
    weight: '230g',
    images: [
      '/images/products/tshirt-black-1.jpg',
      '/images/products/tshirt-black-2.jpg',
      '/images/products/tshirt-black-3.jpg'
    ],
    description: 'T-shirt premium con fit oversize perfecto para diseños gráficos impactantes.',
    features: [
      'Fit oversize moderno',
      'Costuras altas reforzadas',
      'Cuello ribb 1x1',
      'Algodón peruano de alta calidad',
      'Pre-encogido para durabilidad'
    ],
    sizeChart: [
      { size: 'S', chest: '52cm', length: '70cm', sleeve: '22cm' },
      { size: 'M', chest: '54cm', length: '72cm', sleeve: '23cm' },
      { size: 'L', chest: '56cm', length: '74cm', sleeve: '24cm' },
      { size: 'XL', chest: '58cm', length: '76cm', sleeve: '25cm' },
      { size: 'XXL', chest: '60cm', length: '78cm', sleeve: '26cm' }
    ]
  },
  {
    id: '2',
    name: 'Hoodie Premium',
    reference: 'HD-002',
    color: 'Gris',
    category: 'hoodie',
    fit: 'regular',
    material: 'Algodón orgánico 80% / Poliéster 20%',
    weight: '320g',
    images: [
      '/images/products/hoodie-grey-1.jpg',
      '/images/products/hoodie-grey-2.jpg',
      '/images/products/hoodie-grey-3.jpg'
    ],
    description: 'Hoodie premium con capucha ajustable y bolsillo canguro.',
    features: [
      'Capucha con cordón ajustable',
      'Bolsillo canguro frontal',
      'Puños y dobladillo acanalados',
      'Estampado DTG de alta calidad',
      'Material suave y duradero'
    ],
    sizeChart: [
      { size: 'S', chest: '50cm', length: '68cm', sleeve: '62cm' },
      { size: 'M', chest: '52cm', length: '70cm', sleeve: '64cm' },
      { size: 'L', chest: '54cm', length: '72cm', sleeve: '66cm' },
      { size: 'XL', chest: '56cm', length: '74cm', sleeve: '68cm' },
      { size: 'XXL', chest: '58cm', length: '76cm', sleeve: '70cm' }
    ]
  },
  {
    id: '3',
    name: 'Tank Top Deportivo',
    reference: 'TNK-003',
    color: 'Blanco',
    category: 'tank',
    fit: 'regular',
    material: 'Algodón pima 100%',
    weight: '180g',
    images: [
      '/images/products/tank-white-1.jpg',
      '/images/products/tank-white-2.jpg',
      '/images/products/tank-white-3.jpg'
    ],
    description: 'Tank top deportivo ideal para diseños minimalistas y lettering.',
    features: [
      'Tirantes anchos para comodidad',
      'Bajo profundo para mayor libertad',
      'Costuras planas reforzadas',
      'Absorbe el sudor rápidamente',
      'Perfecto para capas o uso individual'
    ],
    sizeChart: [
      { size: 'S', chest: '46cm', length: '68cm', sleeve: 'N/A' },
      { size: 'M', chest: '48cm', length: '70cm', sleeve: 'N/A' },
      { size: 'L', chest: '50cm', length: '72cm', sleeve: 'N/A' },
      { size: 'XL', chest: '52cm', length: '74cm', sleeve: 'N/A' },
      { size: 'XXL', chest: '54cm', length: '76cm', sleeve: 'N/A' }
    ]
  },
  {
    id: '4',
    name: 'T-Shirt Premium Oversize',
    reference: 'TSH-004',
    color: 'Blanco',
    category: 'tshirt',
    fit: 'oversize',
    material: 'Algodón peruano 100%',
    weight: '230g',
    images: [
      '/images/products/tshirt-white-1.jpg',
      '/images/products/tshirt-white-2.jpg',
      '/images/products/tshirt-white-3.jpg'
    ],
    description: 'T-shirt premium blanco con fit oversize para diseños vibrantes.',
    features: [
      'Fit oversize moderno',
      'Costuras altas reforzadas',
      'Cuello ribb 1x1',
      'Algodón peruano de alta calidad',
      'Pre-encogido para durabilidad'
    ],
    sizeChart: [
      { size: 'S', chest: '52cm', length: '70cm', sleeve: '22cm' },
      { size: 'M', chest: '54cm', length: '72cm', sleeve: '23cm' },
      { size: 'L', chest: '56cm', length: '74cm', sleeve: '24cm' },
      { size: 'XL', chest: '58cm', length: '76cm', sleeve: '25cm' },
      { size: 'XXL', chest: '60cm', length: '78cm', sleeve: '26cm' }
    ]
  },
  {
    id: '5',
    name: 'Sweatshirt Premium',
    reference: 'SW-005',
    color: 'Azul Marino',
    category: 'sweatshirt',
    fit: 'regular',
    material: 'Algodón orgánico 85% / Poliéster 15%',
    weight: '280g',
    images: [
      '/images/products/sweatshirt-navy-1.jpg',
      '/images/products/sweatshirt-navy-2.jpg',
      '/images/products/sweatshirt-navy-3.jpg'
    ],
    description: 'Sweatshirt premium con cuello redondo y mangas largas.',
    features: [
      'Cuello redondo acanalado',
      'Puños y dobladillo acanalados',
      'Bordado de alta calidad',
      'Material suave y cálido',
      'Ideal para climas frescos'
    ],
    sizeChart: [
      { size: 'S', chest: '50cm', length: '66cm', sleeve: '60cm' },
      { size: 'M', chest: '52cm', length: '68cm', sleeve: '62cm' },
      { size: 'L', chest: '54cm', length: '70cm', sleeve: '64cm' },
      { size: 'XL', chest: '56cm', length: '72cm', sleeve: '66cm' },
      { size: 'XXL', chest: '58cm', length: '74cm', sleeve: '68cm' }
    ]
  },
  {
    id: '6',
    name: 'Polo Premium',
    reference: 'POL-006',
    color: 'Verde Militar',
    category: 'polo',
    fit: 'regular',
    material: 'Algodón pima 100%',
    weight: '220g',
    images: [
      '/images/products/polo-military-1.jpg',
      '/images/products/polo-military-2.jpg',
      '/images/products/polo-military-3.jpg'
    ],
    description: 'Polo premium con cuello mao y tres botones.',
    features: [
      'Cuello mao con tres botones',
      'Mangas cortas con ribb',
      'Tinte directo de alta calidad',
      'Material transpirable',
      'Perfecto para branding corporativo'
    ],
    sizeChart: [
      { size: 'S', chest: '48cm', length: '68cm', sleeve: '18cm' },
      { size: 'M', chest: '50cm', length: '70cm', sleeve: '19cm' },
      { size: 'L', chest: '52cm', length: '72cm', sleeve: '20cm' },
      { size: 'XL', chest: '54cm', length: '72cm', sleeve: '21cm' },
      { size: 'XXL', chest: '56cm', length: '74cm', sleeve: '22cm' }
    ]
  },
  {
    id: '7',
    name: 'Hoodie Premium',
    reference: 'HD-007',
    color: 'Negro',
    category: 'hoodie',
    fit: 'regular',
    material: 'Algodón orgánico 80% / Poliéster 20%',
    weight: '320g',
    images: [
      '/images/products/hoodie-black-1.jpg',
      '/images/products/hoodie-black-2.jpg',
      '/images/products/hoodie-black-3.jpg'
    ],
    description: 'Hoodie premium negro con capucha y bolsillo canguro.',
    features: [
      'Capucha con cordón ajustable',
      'Bolsillo canguro frontal',
      'Puños y dobladillo acanalados',
      'Estampado DTG de alta calidad',
      'Material suave y duradero'
    ],
    sizeChart: [
      { size: 'S', chest: '50cm', length: '68cm', sleeve: '62cm' },
      { size: 'M', chest: '52cm', length: '70cm', sleeve: '64cm' },
      { size: 'L', chest: '54cm', length: '72cm', sleeve: '66cm' },
      { size: 'XL', chest: '56cm', length: '74cm', sleeve: '68cm' },
      { size: 'XXL', chest: '58cm', length: '76cm', sleeve: '70cm' }
    ]
  },
  {
    id: '8',
    name: 'T-Shirt Premium Oversize',
    reference: 'TSH-008',
    color: 'Gris Claro',
    category: 'tshirt',
    fit: 'oversize',
    material: 'Algodón peruano 100%',
    weight: '230g',
    images: [
      '/images/products/tshirt-lightgrey-1.jpg',
      '/images/products/tshirt-lightgrey-2.jpg',
      '/images/products/tshirt-lightgrey-3.jpg'
    ],
    description: 'T-shirt premium gris claro con fit oversize para diseños versátiles.',
    features: [
      'Fit oversize moderno',
      'Costuras altas reforzadas',
      'Cuello ribb 1x1',
      'Algodón peruano de alta calidad',
      'Pre-encogido para durabilidad'
    ],
    sizeChart: [
      { size: 'S', chest: '52cm', length: '70cm', sleeve: '22cm' },
      { size: 'M', chest: '54cm', length: '72cm', sleeve: '23cm' },
      { size: 'L', chest: '56cm', length: '74cm', sleeve: '24cm' },
      { size: 'XL', chest: '58cm', length: '76cm', sleeve: '25cm' },
      { size: 'XXL', chest: '60cm', length: '78cm', sleeve: '26cm' }
    ]
  },
  {
    id: '9',
    name: 'Tank Top Deportivo',
    reference: 'TNK-009',
    color: 'Negro',
    category: 'tank',
    fit: 'regular',
    material: 'Algodón pima 100%',
    weight: '180g',
    images: [
      '/images/products/tank-black-1.jpg',
      '/images/products/tank-black-2.jpg',
      '/images/products/tank-black-3.jpg'
    ],
    description: 'Tank top deportivo negro ideal para diseños impactantes.',
    features: [
      'Tirantes anchos para comodidad',
      'Bajo profundo para mayor libertad',
      'Costuras planas reforzadas',
      'Absorbe el sudor rápidamente',
      'Perfecto para capas o uso individual'
    ],
    sizeChart: [
      { size: 'S', chest: '46cm', length: '68cm', sleeve: 'N/A' },
      { size: 'M', chest: '48cm', length: '70cm', sleeve: 'N/A' },
      { size: 'L', chest: '50cm', length: '72cm', sleeve: 'N/A' },
      { size: 'XL', chest: '52cm', length: '74cm', sleeve: 'N/A' },
      { size: 'XXL', chest: '54cm', length: '76cm', sleeve: 'N/A' }
    ]
  }
];