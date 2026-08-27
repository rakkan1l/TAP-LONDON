// ONE-TIME FIX SCRIPT: upgrades low-resolution Pexels image URLs already
// stored in Firestore (w=800/w=600) to w=1920, so hero banners on large
// screens stop upscaling a small source image into a blurry result.
// This is the one deliberate exception to the "never touch image/gallery
// for existing items" rule in sync-firestore.js - those fields are
// protected from being overwritten by *content* changes, but this is a
// resolution-only fix applied to the existing URL, not a content swap.
// Only rewrites the query parameter; does not touch anything else.
// Run once via the fix-image-resolution GitHub Actions workflow, then that
// workflow file can be deleted.

const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

const COLLECTIONS = [
  'daytrips', 'emergency', 'events', 'food', 'guides', 'hiddenGems',
  'hotels', 'kids', 'music', 'muslim', 'nightlife', 'offers', 'places',
  'shopping', 'sports', 'theatre', 'trending', 'universities',
];

function upgrade(url) {
  if (typeof url !== 'string' || !url.includes('pexels.com')) return url;
  return url.replace(/w=800\b/g, 'w=1920').replace(/w=600\b/g, 'w=1920');
}

async function fixCollection(name) {
  const snap = await db.collection(name).get();
  let batch = db.batch();
  let count = 0;
  let fixed = 0;

  for (const doc of snap.docs) {
    const data = doc.data();
    const update = {};

    const newImage = upgrade(data.image);
    if (newImage && newImage !== data.image) update.image = newImage;

    if (Array.isArray(data.gallery)) {
      const newGallery = data.gallery.map(upgrade);
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
  console.log(`${name}: ${fixed} image URLs upgraded to w=1920`);
}

async function main() {
  for (const c of COLLECTIONS) {
    await fixCollection(c);
  }
  console.log('Done.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
