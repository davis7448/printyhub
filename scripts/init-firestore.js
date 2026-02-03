const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function initFirestore() {
  console.log('🚀 Inicializando configuraciones de Firestore...\n');

  // DTF Config
  const dtfConfig = {
    technique: 'DTF',
    sizes: [
      { name: 'BOLSILLERO', width: 9, height: 9, price: 4000 },
      { name: 'CARTA', width: 22, height: 29, price: 9000 },
      { name: 'TABLOIDE', width: 29, height: 42, price: 14000 }
    ],
    maxUnitsForFixedPrice: 6,
    xMetroConfig: {
      tiers: [
        { minMeters: 0, maxMeters: 25, pricePerM2: 20000 },
        { minMeters: 25, maxMeters: 120, pricePerM2: 18000 },
        { minMeters: 120, maxMeters: null, pricePerM2: 17000 }
      ]
    },
    locations: [
      { id: 'chest_front', name: 'Pecho Frontal', maxWidth: 30, maxHeight: 40 },
      { id: 'back_center', name: 'Espalda Centro', maxWidth: 40, maxHeight: 50 },
      { id: 'left_sleeve', name: 'Manga Izquierda', maxWidth: 8, maxHeight: 12 },
      { id: 'right_sleeve', name: 'Manga Derecha', maxWidth: 8, maxHeight: 12 },
      { id: 'pocket', name: 'Bolsillo', maxWidth: 8, maxHeight: 8 },
      { id: 'custom', name: 'Ubicación Personalizada', maxWidth: 40, maxHeight: 50, description: 'A definir' }
    ],
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  };

  await db.collection('personalization_configs').doc('DTF').set(dtfConfig);
  console.log('✅ DTF Config guardada');

  // DTG Config (mismos precios)
  const dtgConfig = {
    technique: 'DTG',
    sizes: [
      { name: 'BOLSILLERO', width: 9, height: 9, price: 4000 },
      { name: 'CARTA', width: 22, height: 29, price: 9000 },
      { name: 'TABLOIDE', width: 29, height: 42, price: 14000 }
    ],
    maxUnitsForFixedPrice: 6,
    xMetroConfig: {
      tiers: [
        { minMeters: 0, maxMeters: 25, pricePerM2: 20000 },
        { minMeters: 25, maxMeters: 120, pricePerM2: 18000 },
        { minMeters: 120, maxMeters: null, pricePerM2: 17000 }
      ]
    },
    locations: [
      { id: 'chest_front', name: 'Pecho Frontal', maxWidth: 30, maxHeight: 40 },
      { id: 'back_center', name: 'Espalda Centro', maxWidth: 40, maxHeight: 50 },
      { id: 'left_sleeve', name: 'Manga Izquierda', maxWidth: 8, maxHeight: 12 },
      { id: 'right_sleeve', name: 'Manga Derecha', maxWidth: 8, maxHeight: 12 },
      { id: 'pocket', name: 'Bolsillo', maxWidth: 8, maxHeight: 8 },
      { id: 'custom', name: 'Ubicación Personalizada', maxWidth: 40, maxHeight: 50, description: 'A definir' }
    ],
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  };

  await db.collection('personalization_configs').doc('DTG').set(dtgConfig);
  console.log('✅ DTG Config guardada');

  // TTL Policy para cotizaciones (30 días)
  console.log('\n📝 Nota: Configura el TTL de 30 días para cotizaciones en Firebase Console:');
  console.log('   - Ve a Firebase Console > Firestore > TTL Policies');
  console.log('   - Crea política: collection=quotations, ttl=30days');

  console.log('\n✨ Firestore inicializado correctamente!');
}

initFirestore().catch(console.error);
