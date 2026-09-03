// Adds f_auto to every Cloudinary image/gallery URL across all collections,
// so Cloudinary automatically serves WebP/AVIF to browsers that support it
// (falling back to JPEG for older browsers) - genuinely faster page loads
// with zero quality loss, and it keeps working for all future uploads too.
// Only touches the URL string itself; never re-uploads or changes the
// actual image files.
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

function addFAuto(url) {
  if (typeof url !== 'string' || !url.includes('cloudinary.com')) return url;
  if (url.includes('/upload/f_auto/')) return url; // already has it
  return url.replace('/upload/', '/upload/f_auto/');
}

async function fixCollection(name) {
  const snap = await db.collection(name).get();
  let batch = db.batch();
  let count = 0;
  let fixed = 0;

  for (const doc of snap.docs) {
    const data = doc.data();
    const update = {};

    const newImage = addFAuto(data.image);
    if (newImage && newImage !== data.image) update.image = newImage;

    if (Array.isArray(data.gallery)) {
      const newGallery = data.gallery.map(addFAuto);
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
  return `${name}: ${fixed} items updated with f_auto`;
}

async function main() {
  const lines = [];
  for (const c of COLLECTIONS) {
    const line = await fixCollection(c);
    lines.push(line);
    console.log(line);
  }
  fs.writeFileSync('fauto-results.txt', lines.join('\n') + '\n');
}

main().catch(err => { console.error(err); process.exit(1); });
