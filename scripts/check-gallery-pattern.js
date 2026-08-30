// Checks whether items WITH a gallery array behave differently from items
// with just a single main image - specifically whether gallery photos are
// valid/reachable, and whether the PhotoGallery component's assumptions
// about the data shape hold for real stored data.
const admin = require('firebase-admin');
const fs = require('fs');
const https = require('https');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

function checkUrl(url) {
  return new Promise((resolve) => {
    if (!url) { resolve('NO_URL'); return; }
    https.get(url, (res) => { resolve(res.statusCode); res.destroy(); }).on('error', () => resolve('FETCH_ERROR'));
  });
}

async function main() {
  const snap = await db.collection('places').get();
  const lines = [];

  let withGallery = 0;
  let withoutGallery = 0;
  const galleryProblems = [];

  for (const doc of snap.docs) {
    const data = doc.data();
    const name = data.name || doc.id;
    const gallery = data.gallery;

    if (Array.isArray(gallery) && gallery.length > 0) {
      withGallery++;
      // Check each gallery photo is a valid string URL
      for (let i = 0; i < gallery.length; i++) {
        const g = gallery[i];
        if (typeof g !== 'string' || !g) {
          galleryProblems.push(`${name}: gallery[${i}] is not a valid string - value: ${JSON.stringify(g)}`);
          continue;
        }
        const status = await checkUrl(g);
        if (status !== 200) {
          galleryProblems.push(`${name}: gallery[${i}] returned ${status} - ${g}`);
        }
      }
    } else {
      withoutGallery++;
    }
  }

  lines.push(`Items WITH gallery field (multiple photos): ${withGallery}`);
  lines.push(`Items WITHOUT gallery field (single photo only): ${withoutGallery}`);
  lines.push('');
  lines.push(`Gallery-specific problems found: ${galleryProblems.length}`);
  lines.push(...galleryProblems);

  fs.writeFileSync('gallery-check-results.txt', lines.join('\n') + '\n');
  console.log(lines.join('\n'));
}

main().catch(err => { console.error(err); process.exit(1); });
