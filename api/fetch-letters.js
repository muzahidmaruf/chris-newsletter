const { getPublishedBroadcasts, fetchBroadcast, slugify } = require('./_lib/kit');

function isAuthorized(req) {
  const expected = process.env.CRON_SECRET;
  if (!expected) return false;
  const header = req.headers['authorization'] || '';
  if (header === `Bearer ${expected}`) return true;
  const query = (req.query && req.query.secret) || '';
  return query === expected;
}

module.exports = async (req, res) => {
  if (!isAuthorized(req)) {
    res.status(401).json({ ok: false, error: 'unauthorized' });
    return;
  }

  try {
    const broadcasts = await getPublishedBroadcasts();
    const results = [];

    for (const summary of broadcasts) {
      try {
        const full = await fetchBroadcast(summary.id);
        results.push({
          id: summary.id,
          subject: full.subject || summary.subject,
          slug: slugify(full.subject || summary.subject),
          published_at: full.published_at || summary.published_at || summary.send_at,
          content_length: (full.content || '').length,
        });
      } catch (err) {
        results.push({ id: summary.id, error: String(err.message || err) });
      }
    }

    res.status(200).json({
      ok: true,
      fetched_at: new Date().toISOString(),
      count: results.length,
      letters: results,
    });
  } catch (err) {
    console.error('fetch-letters error', err);
    res.status(500).json({ ok: false, error: String(err.message || err) });
  }
};
