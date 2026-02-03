const { onRequest } = require('firebase-functions/v2/https');
const { onSchedule } = require('firebase-functions/v2/scheduler');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

exports.cleanExpiredQuotations = onSchedule(
  'every 24 hours',
  async (event) => {
    const now = admin.firestore.Timestamp.now();
    
    const expiredQuery = db.collection('quotations')
      .where('status', '==', 'pending_approval')
      .where('expiresAt', '<', now);
    
    const snapshot = await expiredQuery.get();
    
    if (snapshot.empty) {
      console.log('No expired quotations found');
      return { message: 'No expired quotations found' };
    }
    
    const batch = db.batch();
    let count = 0;
    
    snapshot.forEach((doc) => {
      batch.update(doc.ref, {
        status: 'expired',
        updatedAt: now,
      });
      count++;
    });
    
    await batch.commit();
    
    console.log(`Expired ${count} quotations`);
    return { expiredCount: count };
  }
);

exports.testFunction = onRequest(async (req, res) => {
  const now = admin.firestore.Timestamp.now();
  
  const snapshot = await db.collection('quotations')
    .where('status', '==', 'pending_approval')
    .where('expiresAt', '<', now)
    .limit(10)
    .get();
  
  res.json({ 
    message: 'Functions working!',
    expiredCount: snapshot.size,
    timestamp: now.toDate(),
  });
});
