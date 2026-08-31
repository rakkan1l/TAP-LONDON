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

async function main() {
  const lines = [];
  for (const id of ['big-ben', 'buckingham-palace']) {
    const doc = await db.collection('places').doc(id).get();
    if (!doc.exists) { lines.push(`${id}: NOT FOUND`); continue; }
    const data = doc.data();
    const buffer = await fetchBuffer(data.image);
    const dims = getJpegDimensions(buffer);
    lines.push(`${id} ("${data.name}"): ${dims ? dims.width + 'x' + dims.height : 'unknown'} (${(buffer.length/1024).toFixed(0)}KB) - ${data.image}`);
  }
  fs.writeFileSync('bigben-dims-results.txt', lines.join('\n') + '\n');
  console.log(lines.join('\n'));
}
main().catch(err => { console.error(err); process.exit(1); });
