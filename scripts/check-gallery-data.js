// Directly inspect the raw stored gallery + image data for Tower Bridge
// (or any item with multiple photos) exactly as it exists in Firestore
// right now, to rule out a data problem versus a rendering problem.
const admin = require('firebase-admin');
const fs = require('fs');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

async function main() {
  const snap = await db.collection('places').get();
  const lines = [];
  snap.forEach(doc => {
    const data = doc.data();
    const galleryLen = Array.isArray(data.gallery) ? data.gallery.length : 0;
    if (galleryLen > 0) {
      lines.push(`${doc.id} ("${data.name}"): image=${data.image}`);
      lines.push(`  gallery (${galleryLen}): ${JSON.stringify(data.gallery)}`);
    }
  });
  fs.writeFileSync('gallery-data-dump.txt', lines.join('\n') + '\n');
  console.log(`Found ${lines.length / 2} items with galleries`);
  console.log(lines.slice(0, 20).join('\n'));
}

main().catch(err => { console.error(err); process.exit(1); });
