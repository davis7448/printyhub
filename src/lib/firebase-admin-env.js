const admin = require('firebase-admin');

let db, auth, storage;

function initialize() {
  if (admin.apps.length === 0) {
    const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT;
    
    if (process.env.FUNCTIONS_EMULATOR) {
      admin.initializeApp({
        projectId,
      });
    } else {
      const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS || '{}');
      
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId,
        storageBucket: `${projectId}.firebasestorage.app`,
      });
    }
  }
  
  db = admin.firestore();
  auth = admin.auth();
  storage = admin.storage();
  
  return { admin, db, auth, storage };
}

initialize();

module.exports = { admin, getDb: () => db, getAuth: () => auth, getStorage: () => storage, initialize };
