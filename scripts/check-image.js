// Verification-only script: reads the current live Tower of London document
// and writes its image/gallery fields to a file, so the actual current state
// can be confirmed via a normal file read rather than guessing.
const admin = require('firebase-admin');
const fs = require('fs');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

async function main() {
  const doc = await db.collection('places').doc('tower-of-london').get();
  const lines = [];
  if (!doc.exists) {
    lines.push('DOCUMENT NOT FOUND');
  } else {
    const data = doc.data();
    lines.push('image: ' + data.image);
    lines.push('gallery: ' + JSON.stringify(data.gallery || []));
    lines.push('updated fields present: ' + Object.keys(data).join(', '));
  }
  fs.writeFileSync('check-results.txt', lines.join('\n') + '\n');
  console.log(lines.join('\n'));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
