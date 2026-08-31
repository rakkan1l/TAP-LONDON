// Broad sweep across EVERY collection (not just Places) - checks for
// missing ids, missing images, broken image URLs, and tiny (thumbnail-size)
// images, so we find real problems elsewhere instead of only Places.
const admin = require('firebase-admin');
const fs = require('fs');
const https = require('https');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

const COLLECTIONS = [
  'food', 'hotels', 'nightlife', 'shopping', 'kids', 'hiddenGems',
  'theatre', 'music', 'sports', 'muslim', 'emergency', 'offers', 'trending',
  'guides', 'universities', 'daytrips', 'events',
];

function checkUrl(url) {
  return new Promise((resolve) => {
    if (!url) { resolve({ status: 'NO_URL', size: 0 }); return; }
    https.get(url, (res) => {
      let size = 0;
      res.on('data', c => size += c.length);
      res.on('end', () => resolve({ status: res.statusCode, size }));
      res.on('error', () => resolve({ status: 'ERROR', size: 0 }));
    }).on('error', () => resolve({ status: 'ERROR', size: 0 }));
  });
}

async function auditCollection(name) {
  const snap = await db.collection(name).get();
  const problems = [];

  for (const doc of snap.docs) {
    const data = doc.data();
    const itemName = data.name || doc.id;

    if (!doc.id) { problems.push(`${itemName}: NO DOC ID`); continue; }
    if (!data.image) { problems.push(`${itemName} [${doc.id}]: NO IMAGE FIELD`); continue; }

    const { status, size } = await checkUrl(data.image);
    if (status !== 200) {
      problems.push(`${itemName} [${doc.id}]: image URL status ${status}`);
    } else if (size > 0 && size < 15000) {
      // Very small file size is a strong signal of a tiny/thumbnail image,
      // same pattern as the confirmed 256x256 Tower of London issue.
      problems.push(`${itemName} [${doc.id}]: SUSPICIOUSLY SMALL image file (${(size/1024).toFixed(1)}KB) - ${data.image}`);
    }
  }

  return { name, total: snap.size, problems };
}

async function main() {
  const lines = [];
  for (const c of COLLECTIONS) {
    const r = await auditCollection(c);
    lines.push(`${r.name}: ${r.total} items, ${r.problems.length} problems`);
    r.problems.forEach(p => lines.push(`  -> ${p}`));
  }
  fs.writeFileSync('broad-sweep-results.txt', lines.join('\n') + '\n');
  console.log(lines.join('\n'));
}

main().catch(err => { console.error(err); process.exit(1); });
