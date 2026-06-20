const KIT_BASE = 'https://api.convertkit.com/v3';

function slugify(input) {
  return String(input || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}

async function fetchBroadcasts() {
  const secret = process.env.KIT_API_SECRET;
  if (!secret) throw new Error('KIT_API_SECRET is not set');
  const res = await fetch(`${KIT_BASE}/broadcasts?api_secret=${encodeURIComponent(secret)}`);
  if (!res.ok) throw new Error(`Kit broadcasts list failed: ${res.status}`);
  const data = await res.json();
  return Array.isArray(data.broadcasts) ? data.broadcasts : [];
}

async function fetchBroadcast(id) {
  const secret = process.env.KIT_API_SECRET;
  if (!secret) throw new Error('KIT_API_SECRET is not set');
  const res = await fetch(`${KIT_BASE}/broadcasts/${id}?api_secret=${encodeURIComponent(secret)}`);
  if (!res.ok) throw new Error(`Kit broadcast ${id} failed: ${res.status}`);
  const data = await res.json();
  return data.broadcast || data;
}

async function getPublishedBroadcasts() {
  const all = await fetchBroadcasts();
  const subjects = all.filter(b => b.subject);
  // Need full broadcast detail to know `public` flag — the list endpoint omits it.
  const detailed = await Promise.all(subjects.map(async b => {
    try { return await fetchBroadcast(b.id); } catch { return null; }
  }));
  return detailed
    .filter(b => b && b.public === true && b.subject)
    .sort((a, b) => {
      const aDate = new Date(a.send_at || a.published_at || a.created_at).getTime();
      const bDate = new Date(b.send_at || b.published_at || b.created_at).getTime();
      return bDate - aDate;
    });
}

async function findBroadcastBySlug(slug) {
  const broadcasts = await getPublishedBroadcasts();
  return broadcasts.find(b => slugify(b.subject) === slug) || null;
}

module.exports = { slugify, fetchBroadcasts, fetchBroadcast, getPublishedBroadcasts, findBroadcastBySlug };
