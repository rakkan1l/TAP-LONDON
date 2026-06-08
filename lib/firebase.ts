const PROJECT_ID = 'tap-london';

export async function fetchCollection(collection: string): Promise<any[] | null> {
  try {
    const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${collection}?pageSize=200`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    if (!json.documents || json.documents.length === 0) return null;

    const items = json.documents.map((doc: any) => {
      const fields = doc.fields || {};
      const item: any = {};
      Object.keys(fields).forEach(key => {
        const field = fields[key];
        if (field.stringValue !== undefined) item[key] = field.stringValue;
        else if (field.integerValue !== undefined) item[key] = parseInt(field.integerValue);
        else if (field.doubleValue !== undefined) item[key] = field.doubleValue;
        else if (field.booleanValue !== undefined) item[key] = field.booleanValue;
        else if (field.timestampValue !== undefined) item[key] = field.timestampValue;
        else if (field.arrayValue !== undefined) {
          item[key] = (field.arrayValue.values || []).map((v: any) =>
            v.stringValue || v.integerValue || v.booleanValue || ''
          );
        }
      });
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

    const fields = doc.fields;
    const item: any = {};
    Object.keys(fields).forEach(key => {
      const field = fields[key];
      if (field.stringValue !== undefined) item[key] = field.stringValue;
      else if (field.integerValue !== undefined) item[key] = parseInt(field.integerValue);
      else if (field.doubleValue !== undefined) item[key] = field.doubleValue;
      else if (field.booleanValue !== undefined) item[key] = field.booleanValue;
      else if (field.timestampValue !== undefined) item[key] = field.timestampValue;
      else if (field.arrayValue !== undefined) {
        item[key] = (field.arrayValue.values || []).map((v: any) =>
          v.stringValue || v.integerValue || v.booleanValue || ''
        );
      }
    });
    const parts = doc.name.split('/');
    item.id = parts[parts.length - 1];
    return item;
  } catch {
    return null;
  }
}
