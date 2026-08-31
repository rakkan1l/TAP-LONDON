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
    if ((data.name || '').toLowerCase().includes('shard') || doc.id.toLowerCase().includes('shard')) {
      lines.push(`${doc.id} - ${data.name} - image: ${data.image}`);
    }
  });
  fs.writeFileSync('shard-verify-results.txt', lines.join('\n') + '\n');
  console.log(lines.join('\n'));
}
main().catch(err => { console.error(err); process.exit(1); });
