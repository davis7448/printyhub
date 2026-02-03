import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function initFireStore() {
  console.log('Initializing Firestore configs...');

  // DTF config
  await setDoc(doc(db, 'personalization_configs', 'DTF'), {
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
    ]
  });
  console.log('DTF config saved');

  // DTG config (mismo pricing as per plan)
  await setDoc(doc(db, 'personalization_configs', 'DTG'), {
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
    ]
  });
  console.log('DTG config saved');

  console.log('\nFirestore init complete!');
}

initFireStore().catch(console.error);
