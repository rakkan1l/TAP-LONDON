// Fix The Shard's hero image: the previous source photo was a tall/narrow
// tower shot that got cropped and zoomed severely when forced into the
// wide hero banner via object-fit:cover, producing a blurry, mostly-empty
// result. Replaced with a genuine landscape/wide skyline photo of The
// Shard from Pexels (free to use), which crops much more gracefully into
// a wide banner shape.
const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

const NEW_IMAGE = 'https://images.pexels.com/photos/29096731/pexels-photo-29096731.jpeg?auto=compress&cs=tinysrgb&w=1920';

async function main() {
  const snap = await db.collection('places').where('name', '==', 'The Shard').get();
  if (snap.empty) {
    console.log('No item named "The Shard" found - trying id search instead');
    const snap2 = await db.collection('places').get();
    let found = null;
    snap2.forEach(doc => {
      if (doc.id.toLowerCase().includes('shard') || (doc.data().name || '').toLowerCase().includes('shard')) {
        found = doc;
      }
    });
    if (!found) {
      console.log('Could not find any Shard item');
      return;
    }
    await found.ref.update({ image: NEW_IMAGE });
    console.log(`Updated ${found.id} ("${found.data().name}") with new landscape image`);
    return;
  }
  for (const doc of snap.docs) {
    await doc.ref.update({ image: NEW_IMAGE });
    console.log(`Updated ${doc.id} ("${doc.data().name}") with new landscape image`);
  }
}

main().catch(err => { console.error(err); process.exit(1); });
