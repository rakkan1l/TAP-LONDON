// Audits every collection: for each Cloudinary-hosted image, checks whether
// its upload timestamp is before or after the Aug 23 compression fix, so we
// know exactly which items need re-uploading instead of guessing "all of them".
const admin = require('firebase-admin');
const fs = require('fs');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

const CUTOFF = new Date('2026-08-23T11:19:16Z').getTime() / 1000;

const COLLECTIONS = [
  'places', 'food', 'hotels', 'nightlife', 'shopping', 'kids', 'hiddenGems',
  'theatre', 'music', 'sports', 'muslim', 'emergency', 'offers', 'trending',
  'guides', 'universities', 'daytrips', 'events',
];

function getVersionTs(url) {
  const m = url && url.match(/\/v(\d+)\//);
  return m ? parseInt(m[1]) : null;
}

async function auditCollection(name) {
  const snap = await db.collection(name).get();
  const oldItems = [];
  let cloudinaryCount = 0;
  let pexelsCount = 0;

  snap.forEach(doc => {
    const data = doc.data();
    const img = data.image || '';
    if (img.includes('cloudinary.com')) {
      cloudinaryCount++;
      const ts = getVersionTs(img);
      if (ts && ts < CUTOFF) {
        oldItems.push(data.name || doc.id);
      }
    } else if (img.includes('pexels.com')) {
      pexelsCount++;
    }
  });

  return { name, total: snap.size, cloudinaryCount, pexelsCount, oldItems };
}

async function main() {
  const lines = [];
  for (const c of COLLECTIONS) {
    const r = await auditCollection(c);
    lines.push(`${r.name}: ${r.total} total, ${r.cloudinaryCount} Cloudinary uploads, ${r.pexelsCount} still Pexels stock`);
    if (r.oldItems.length > 0) {
      lines.push(`  -> ${r.oldItems.length} PRE-FIX Cloudinary uploads (may be low-res, worth re-checking): ${r.oldItems.join(', ')}`);
    }
  }
  fs.writeFileSync('audit-results.txt', lines.join('\n') + '\n');
  console.log(lines.join('\n'));
}

main().catch(err => { console.error(err); process.exit(1); });
