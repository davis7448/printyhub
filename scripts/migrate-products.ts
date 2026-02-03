import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { products } from '../src/data/products';

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

async function migrateProducts() {
  console.log('Migrando productos...');
  for (const p of products) {
    const data = {
      name: p.name,
      reference: p.reference,
      color: p.color,
      category: p.category,
      fit: p.fit,
      material: p.material,
      weight: p.weight,
      images: p.images,
      basePrice: 15000,
      available: true,
      maxDiscountPercent: 10,
      sizeChart: p.sizeChart,
      features: p.features ?? [],
      description: p.description ?? '',
    };
    await setDoc(doc(db, 'products', p.id), data);
    console.log(`Migrado: ${p.reference} - ${p.name}`);
  }
  console.log('Migración completada.');
}

migrateProducts().catch((e) => {
  console.error('Error en migración:', e);
  process.exit(1);
});
