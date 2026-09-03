// Adds q_auto alongside the already-applied f_auto on every Cloudinary URL.
// Cloudinary's own documentation recommends using q_auto and f_auto TOGETHER
// as the standard pair - f_auto picks the best FORMAT (WebP/AVIF/JPEG),
// q_auto picks the best QUALITY level (smallest file size that still looks
// good) for that specific image's content. Used together they compound:
// their own example shows a 537KB image becoming a 170KB WebP, a 69%
// reduction, versus a smaller saving from f_auto alone.
const admin = require('firebase-admin');
const fs = require('fs');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

const COLLECTIONS = [
  'places', 'food', 'hotels', 'nightlife', 'shopping', 'kids', 'hiddenGems',
  'theatre', 'music', 'sports', 'muslim', 'emergency', 'offers', 'trending',
  'guides', 'universities', 'daytrips', 'events',
];

function addQAuto(url) {
  if (typeof url !== 'string' || !url.includes('cloudinary.com')) return url;
  if (url.includes('q_auto')) return url; // already has it
  if (url.includes('/upload/f_auto/')) {
    return url.replace('/upload/f_auto/', '/upload/f_auto,q_auto/');
  }
  return url.replace('/upload/', '/upload/f_auto,q_auto/');
}

async function fixCollection(name) {
  const snap = await db.collection(name).get();
  let batch = db.batch();
  let count = 0;
  let fixed = 0;

  for (const doc of snap.docs) {
    const data = doc.data();
    const update = {};

    const newImage = addQAuto(data.image);
    if (newImage && newImage !== data.image) update.image = newImage;

    if (Array.isArray(data.gallery)) {
      const newGallery = data.gallery.map(addQAuto);
      if (JSON.stringify(newGallery) !== JSON.stringify(data.gallery)) update.gallery = newGallery;
    }

    if (Object.keys(update).length > 0) {
      batch.update(doc.ref, update);
      fixed++;
      count++;
    }

    if (count === 400) {
      await batch.commit();
      batch = db.batch();
      count = 0;
    }
  }

  if (count > 0) await batch.commit();
  return `${name}: ${fixed} items updated with q_auto`;
}

async function main() {
  const lines = [];
  for (const c of COLLECTIONS) {
    const line = await fixCollection(c);
    lines.push(line);
    console.log(line);
  }
  fs.writeFileSync('qauto-results.txt', lines.join('\n') + '\n');
}

main().catch(err => { console.error(err); process.exit(1); });
