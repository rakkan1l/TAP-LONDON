const PROJECT_ID = 'tap-london';

// NOTE: Removed the in-memory Map-based cache that was here before.
// It was intended as a per-browser-tab cache, but this module can run in a
// server/edge context in Next.js where a warm serverless instance can be
// reused across DIFFERENT users' requests - meaning the cache was at risk of
// serving one user's snapshot to other visitors, site-wide, until that
// instance cold-started. That's a worse bug than the one it was meant to fix.
// Retries with backoff (kept below) solve the original 429 problem without
// introducing any staleness risk.

// Recursively convert a single Firestore field value to a plain JS value
function parseFieldValue(field: any): any {
  if (!field) return undefined;
  if (field.stringValue !== undefined) return field.stringValue;
  if (field.integerValue !== undefined) return parseInt(field.integerValue);
  if (field.doubleValue !== undefined) return field.doubleValue;
  if (field.booleanValue !== undefined) return field.booleanValue;
  if (field.timestampValue !== undefined) return field.timestampValue;
  if (field.nullValue !== undefined) return null;
  if (field.mapValue !== undefined) {
    return parseFields(field.mapValue.fields || {});
  }
  if (field.arrayValue !== undefined) {
    return (field.arrayValue.values || []).map((v: any) => parseFieldValue(v));
  }
  return undefined;
}

function parseFields(fields: Record<string, any>): any {
  const obj: any = {};
  Object.keys(fields).forEach(key => {
    obj[key] = parseFieldValue(fields[key]);
  });
  return obj;
}

// If the main image is missing/empty, fall back to the first gallery photo
function applyImageFallback(item: any): any {
  if (!item.image && Array.isArray(item.gallery) && item.gallery.length > 0) {
    item.image = item.gallery[0];
  }
  return item;
}

function delay(ms: number) {
  return new Promise(r => setTimeout(r, ms));
}

export async function fetchCollection(collection: string): Promise<any[] | null> {
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${collection}?pageSize=200`;
  const maxAttempts = 3;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const res = await fetch(url, { cache: 'no-store' });

      if (res.status === 429) {
        if (attempt < maxAttempts - 1) {
          await delay(500 * (attempt + 1));
          continue;
        }
        return null;
      }

      if (!res.ok) return null;

      const json = await res.json();
      if (!json.documents || json.documents.length === 0) return null;

      const items = json.documents.map((doc: any) => {
        const item = parseFields(doc.fields || {});
        const parts = doc.name.split('/');
        item.id = parts[parts.length - 1];
        return applyImageFallback(item);
      });

      items.sort((a: any, b: any) => (a.order ?? 999) - (b.order ?? 999));
      return items;
    } catch {
      if (attempt < maxAttempts - 1) {
        await delay(500 * (attempt + 1));
        continue;
      }
      return null;
    }
  }
  return null;
}

export async function fetchDocument(collection: string, id: string): Promise<any | null> {
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${collection}/${id}`;
  const maxAttempts = 3;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const res = await fetch(url, { cache: 'no-store' });

      if (res.status === 429) {
        if (attempt < maxAttempts - 1) {
          await delay(500 * (attempt + 1));
          continue;
        }
        return null;
      }

      if (!res.ok) return null;

      const doc = await res.json();
      if (!doc.fields) return null;

      const item = parseFields(doc.fields);
      const parts = doc.name.split('/');
      item.id = parts[parts.length - 1];
      return applyImageFallback(item);
    } catch {
      if (attempt < maxAttempts - 1) {
        await delay(500 * (attempt + 1));
        continue;
      }
      return null;
    }
  }
  return null;
}
