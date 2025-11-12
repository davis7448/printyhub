export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'products' | 'services' | 'orders' | 'shipping';
}

export const faqs: FAQ[] = [
  {
    id: '1',
    question: '¿Qué tipos de blanks ofrecen?',
    answer: 'Ofrecemos una amplia gama de blanks premium incluyendo t-shirts oversize, hoodies, tank tops, sweatshirts y polos. Todos nuestros productos están hechos con materiales de alta calidad como algodón peruano 100%, algodón orgánico y mezclas premium.',
    category: 'products'
  },
  {
    id: '2',
    question: '¿Cuáles son los tiempos de entrega?',
    answer: 'Los tiempos de entrega varían según el servicio y la cantidad. Para DTF: 3-5 días hábiles, DTG: 2-4 días hábiles, Bordado: 4-7 días hábiles, Tinte: 5-8 días hábiles, Etiquetado: 2-3 días hábiles. Los tiempos se reducen para pedidos grandes.',
    category: 'orders'
  },
  {
    id: '3',
    question: '¿Cuál es el volumen mínimo para pedidos B2B?',
    answer: 'No tenemos un volumen mínimo estricto, pero recomendamos pedidos de al menos 50 unidades por referencia para obtener los mejores precios. Para pedidos personalizados, evaluamos caso por caso.',
    category: 'general'
  },
  {
    id: '4',
    question: '¿Ofrecen muestras de productos?',
    answer: 'Sí, podemos enviar muestras de nuestros blanks. El costo de envío va por cuenta del cliente, pero podemos incluir muestras gratuitas en pedidos grandes. Contáctanos para más información.',
    category: 'products'
  },
  {
    id: '5',
    question: '¿Qué formatos de archivo aceptan para diseños?',
    answer: 'Aceptamos archivos en formato vectorial (AI, EPS, PDF) para bordado y tintes, y archivos de alta resolución (300 DPI) en PNG, JPG o PSD para DTF y DTG. Proporcionamos guías específicas según el servicio.',
    category: 'services'
  },
  {
    id: '6',
    question: '¿Hacen envíos internacionales?',
    answer: 'Sí, realizamos envíos a nivel internacional. Los costos y tiempos varían según el destino. Ofrecemos diferentes opciones de envío según las necesidades del cliente.',
    category: 'shipping'
  },
  {
    id: '7',
    question: '¿Cuál es la calidad de impresión de DTF?',
    answer: 'Nuestra impresión DTF ofrece colores vibrantes, detalles finos y durabilidad excepcional. Utilizamos tintas de alta calidad que resisten el lavado y mantienen el color por más de 50 lavados.',
    category: 'services'
  },
  {
    id: '8',
    question: '¿Pueden hacer diseños personalizados?',
    answer: 'Sí, nuestro equipo de diseñadores puede ayudarte a crear diseños únicos o adaptar diseños existentes. Ofrecemos servicios de diseño gráfico como parte de nuestro paquete completo.',
    category: 'services'
  },
  {
    id: '9',
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos transferencias bancarias, pagos con tarjeta de crédito/débito a través de plataformas seguras, y podemos discutir opciones de pago para clientes recurrentes.',
    category: 'orders'
  },
  {
    id: '10',
    question: '¿Ofrecen garantías en los productos?',
    answer: 'Sí, todos nuestros productos tienen garantía contra defectos de fabricación. Si encuentras algún problema con la calidad del blank o la impresión, te ayudamos a resolverlo rápidamente.',
    category: 'general'
  },
  {
    id: '11',
    question: '¿Cómo funciona el proceso de pedido?',
    answer: '1) Contáctanos con tu requerimiento, 2) Te enviamos cotización detallada, 3) Apruebas el diseño y muestras si es necesario, 4) Procesamos tu pedido, 5) Entregamos en el tiempo acordado.',
    category: 'orders'
  },
  {
    id: '12',
    question: '¿Pueden manejar pedidos urgentes?',
    answer: 'Sí, tenemos capacidad para pedidos express con tiempos reducidos. Los costos adicionales aplican según la urgencia y complejidad del trabajo.',
    category: 'orders'
  }
];