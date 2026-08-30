// Verification script: downloads the actual Tower of London image bytes and
// reads its real pixel dimensions directly from the JPEG header, so we know
// the TRUE aspect ratio and resolution instead of guessing.
const https = require('https');
const admin = require('firebase-admin');
const fs = require('fs');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

function getJpegDimensions(buffer) {
  let i = 2; // skip SOI marker
  while (i < buffer.length) {
    if (buffer[i] !== 0xFF) { i++; continue; }
    const marker = buffer[i + 1];
    if (marker >= 0xC0 && marker <= 0xC3) {
      const height = buffer.readUInt16BE(i + 5);
      const width = buffer.readUInt16BE(i + 7);
      return { width, height };
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

async function main() {
  const doc = await db.collection('places').doc('tower-of-london').get();
  const data = doc.data();
  const url = data.image;

  const buffer = await fetchBuffer(url);
  const dims = getJpegDimensions(buffer);

  const lines = [];
  lines.push('Image URL: ' + url);
  lines.push('File size: ' + buffer.length + ' bytes (' + (buffer.length / 1024).toFixed(1) + ' KB)');
  if (dims) {
    lines.push('Actual pixel dimensions: ' + dims.width + ' x ' + dims.height);
    lines.push('Aspect ratio: ' + (dims.width / dims.height).toFixed(3));
  } else {
    lines.push('Could not parse dimensions (not a standard JPEG or different format)');
  }

  fs.writeFileSync('dims-results.txt', lines.join('\n') + '\n');
  console.log(lines.join('\n'));
}

main().catch(err => { console.error(err); process.exit(1); });
