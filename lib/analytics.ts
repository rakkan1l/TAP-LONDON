const PROJECT_ID = 'tap-london';
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

function todayId(): string {
  const d = new Date();
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

async function incrementDoc(collection: string, docId: string) {
  try {
    const url = `${BASE}/${collection}/${docId}`;
    const res = await fetch(url, { cache: 'no-store' });
    let current = 0;
    if (res.ok) {
      const doc = await res.json();
      current = parseInt(doc?.fields?.count?.integerValue || '0');
    }
    const patchUrl = `${url}?updateMask.fieldPaths=count&updateMask.fieldPaths=updatedAt`;
    await fetch(patchUrl, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: {
          count: { integerValue: String(current + 1) },
          updatedAt: { timestampValue: new Date().toISOString() },
        },
      }),
    });
  } catch {
    // Fail silently — analytics should never break the site
  }
}

// Sanitise a path into a safe Firestore doc id
function pathToId(path: string): string {
  const cleaned = path === '/' ? 'home' : path.replace(/^\//, '').replace(/\//g, '__');
  return cleaned.slice(0, 200) || 'home';
}

export function trackVisit(path: string) {
  if (typeof window === 'undefined') return;
  // Only count once per tab session per page, to avoid inflating numbers on quick back-and-forth navigation
  const sessionKey = 'tap_visited_' + pathToId(path);
  if (sessionStorage.getItem(sessionKey)) return;
  sessionStorage.setItem(sessionKey, '1');

  incrementDoc('analyticsTotal', 'all');
  incrementDoc('analyticsDaily', todayId());
  incrementDoc('analyticsPages', pathToId(path));
}
