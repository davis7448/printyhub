const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const { products } = require('./products-data');

async function migrateProducts() {
  console.log('🚀 Iniciando migración de productos...\n');

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
      features: p.features || [],
      description: p.description || '',
      migratedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    await db.collection('products').doc(p.id).set(data);
    console.log(`✅ Migrado: ${p.reference} - ${p.name}`);
  }

  console.log('\n✨ Migración completada!');
}

migrateProducts().catch((err) => {
  console.error('❌ Error en migración:', err);
  process.exit(1);
});
