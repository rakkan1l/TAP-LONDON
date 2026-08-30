// Checks actual pixel dimensions of a sample of recently-uploaded Cloudinary
// images across MULTIPLE collections (not just Places), to find out whether
// the 256x256 issue is Places-specific or affects every category's uploads.
const https = require('https');
const admin = require('firebase-admin');
const fs = require('fs');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

function getJpegDimensions(buffer) {
  let i = 2;
  while (i < buffer.length) {
    if (buffer[i] !== 0xFF) { i++; continue; }
    const marker = buffer[i + 1];
    if (marker >= 0xC0 && marker <= 0xC3) {
      return { width: buffer.readUInt16BE(i + 7), height: buffer.readUInt16BE(i + 5) };
    }
    const length = buffer.readUInt16BE(i + 2);
    i += 2 + length;
  }
  return null;
}

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

// Get the most recently uploaded (highest version number) Cloudinary image
// in each collection, so we're comparing genuinely recent uploads.
async function getMostRecentCloudinaryImage(collection) {
  const snap = await db.collection(collection).get();
  let best = null;
  let bestTs = 0;
  snap.forEach(doc => {
    const img = doc.data().image || '';
    const m = img.match(/\/v(\d+)\//);
    if (m && img.includes('cloudinary.com')) {
      const ts = parseInt(m[1]);
      if (ts > bestTs) { bestTs = ts; best = { name: doc.data().name || doc.id, url: img }; }
    }
  });
  return best;
}

async function main() {
  const collections = ['places', 'food', 'hotels', 'nightlife', 'shopping', 'theatre', 'music', 'sports'];
  const lines = [];

  for (const c of collections) {
    const item = await getMostRecentCloudinaryImage(c);
    if (!item) { lines.push(`${c}: no Cloudinary uploads found`); continue; }
    try {
      const buffer = await fetchBuffer(item.url);
      const dims = getJpegDimensions(buffer);
      lines.push(`${c}: "${item.name}" -> ${dims ? dims.width + 'x' + dims.height : 'unknown'} (${(buffer.length/1024).toFixed(0)}KB) - ${item.url}`);
    } catch (e) {
      lines.push(`${c}: "${item.name}" -> ERROR fetching: ${e.message}`);
    }
  }

  fs.writeFileSync('multi-dims-results.txt', lines.join('\n') + '\n');
  console.log(lines.join('\n'));
}

main().catch(err => { console.error(err); process.exit(1); });
