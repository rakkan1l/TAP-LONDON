const PROJECT_ID = 'tap-london';

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

export async function fetchCollection(collection: string): Promise<any[] | null> {
  try {
    const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${collection}?pageSize=200`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    if (!json.documents || json.documents.length === 0) return null;

    const items = json.documents.map((doc: any) => {
      const item = parseFields(doc.fields || {});
      const parts = doc.name.split('/');
      item.id = parts[parts.length - 1];
      return item;
    });

    items.sort((a: any, b: any) => (a.order ?? 999) - (b.order ?? 999));
    return items;
  } catch {
    return null;
  }
}

export async function fetchDocument(collection: string, id: string): Promise<any | null> {
  try {
    const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${collection}/${id}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const doc = await res.json();
    if (!doc.fields) return null;

    const item = parseFields(doc.fields);
    const parts = doc.name.split('/');
    item.id = parts[parts.length - 1];
    return item;
  } catch {
    return null;
  }
}
