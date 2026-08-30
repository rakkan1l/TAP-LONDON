// Full audit of every item in the Places collection: checks for missing
// id, missing/empty image field, and unreachable image URLs, to find out
// exactly what "all cards broken" actually means with real evidence.
const admin = require('firebase-admin');
const fs = require('fs');
const https = require('https');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

function checkUrl(url) {
  return new Promise((resolve) => {
    if (!url) { resolve('NO_URL'); return; }
    https.get(url, (res) => {
      resolve(res.statusCode);
      res.destroy();
    }).on('error', () => resolve('FETCH_ERROR'));
  });
}

async function main() {
  const snap = await db.collection('places').get();
  const lines = [];
  lines.push(`Total documents: ${snap.size}`);

  let missingId = 0;
  let missingImage = 0;
  let badUrl = 0;
  const problems = [];

  for (const doc of snap.docs) {
    const data = doc.data();
    const id = doc.id;
    const name = data.name || '(no name)';
    const image = data.image;

    if (!id) { missingId++; problems.push(`${name}: MISSING DOC ID (impossible but checking)`); continue; }
    if (!image) { missingImage++; problems.push(`${name} [${id}]: NO IMAGE FIELD`); continue; }

    const status = await checkUrl(image);
    if (status !== 200) {
      badUrl++;
      problems.push(`${name} [${id}]: image URL returned ${status} - ${image}`);
    }
  }

  lines.push(`Missing image field: ${missingImage}`);
  lines.push(`Broken/unreachable image URLs: ${badUrl}`);
  lines.push('');
  lines.push('Problems found:');
  lines.push(...problems);

  fs.writeFileSync('places-audit-results.txt', lines.join('\n') + '\n');
  console.log(lines.join('\n'));
}

main().catch(err => { console.error(err); process.exit(1); });
