const PROJECT_ID = 'tap-london';

// In-memory cache shared across the page session, so navigating between pages
// (or the same page re-rendering) doesn't re-hit Firestore for data we already
// have. This is the fix for the 429 "Too Many Requests" errors that were
// causing images and content to randomly fall back to old defaults - every
// page load was re-fetching entire collections fresh with no caching at all,
// burning through the Firestore free-tier daily read quota.
const CACHE_TTL_MS = 10 * 1000; // 10 seconds - just enough to smooth out a burst of rapid requests on the same page load, edits now show up almost instantly
const collectionCache = new Map<string, { data: any[]; ts: number }>();
const documentCache = new Map<string, { data: any; ts: number }>();

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

// Small delay helper for retry backoff
function delay(ms: number) {
  return new Promise(r => setTimeout(r, ms));
}

export async function fetchCollection(collection: string): Promise<any[] | null> {
  const cached = collectionCache.get(collection);
  if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
    return cached.data;
  }

  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${collection}?pageSize=200`;
  const maxAttempts = 3;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const res = await fetch(url, { cache: 'no-store' });

      if (res.status === 429) {
        // Rate limited - back off and retry rather than immediately failing.
        // If we have any stale cached data, prefer serving that over nothing.
        if (attempt < maxAttempts - 1) {
          await delay(500 * (attempt + 1));
          continue;
        }
        if (cached) return cached.data;
        return null;
      }

      if (!res.ok) {
        if (cached) return cached.data;
        return null;
      }

      const json = await res.json();
      if (!json.documents || json.documents.length === 0) {
        if (cached) return cached.data;
        return null;
      }

      const items = json.documents.map((doc: any) => {
        const item = parseFields(doc.fields || {});
        const parts = doc.name.split('/');
        item.id = parts[parts.length - 1];
        return applyImageFallback(item);
      });

      items.sort((a: any, b: any) => (a.order ?? 999) - (b.order ?? 999));
      collectionCache.set(collection, { data: items, ts: Date.now() });
      return items;
    } catch {
      if (attempt < maxAttempts - 1) {
        await delay(500 * (attempt + 1));
        continue;
      }
      if (cached) return cached.data;
      return null;
    }
  }
  return cached ? cached.data : null;
}

export async function fetchDocument(collection: string, id: string): Promise<any | null> {
  const cacheKey = `${collection}/${id}`;
  const cached = documentCache.get(cacheKey);
  if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
    return cached.data;
  }

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
        if (cached) return cached.data;
        return null;
      }

      if (!res.ok) {
        if (cached) return cached.data;
        return null;
      }

      const doc = await res.json();
      if (!doc.fields) {
        if (cached) return cached.data;
        return null;
      }

      const item = parseFields(doc.fields);
      const parts = doc.name.split('/');
      item.id = parts[parts.length - 1];
      const result = applyImageFallback(item);
      documentCache.set(cacheKey, { data: result, ts: Date.now() });
      return result;
    } catch {
      if (attempt < maxAttempts - 1) {
        await delay(500 * (attempt + 1));
        continue;
      }
      if (cached) return cached.data;
      return null;
    }
  }
  return cached ? cached.data : null;
}
