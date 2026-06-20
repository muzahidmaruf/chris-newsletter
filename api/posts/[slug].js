const { findBroadcastBySlug, fetchBroadcast, slugify } = require('../_lib/kit');
const { renderPost, renderNotFound } = require('../_lib/template');

module.exports = async (req, res) => {
  try {
    const slug = (req.query && req.query.slug) || '';
    if (!slug) {
      res.status(404).setHeader('Content-Type', 'text/html; charset=utf-8').send(renderNotFound());
      return;
    }

    const summary = await findBroadcastBySlug(slug);
    if (!summary) {
      res.status(404).setHeader('Content-Type', 'text/html; charset=utf-8').send(renderNotFound());
      return;
    }

    const full = await fetchBroadcast(summary.id);
    if (!full || full.public !== true) {
      res.status(404).setHeader('Content-Type', 'text/html; charset=utf-8').send(renderNotFound());
      return;
    }
    const content = full.content || summary.content || '';
    const publishedAt = full.send_at || full.published_at || summary.send_at || summary.published_at;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.status(200).send(renderPost({
      subject: full.subject || summary.subject,
      content,
      publishedAt,
      slug: slugify(full.subject || summary.subject),
      thumbnail: full.thumbnail_url || summary.thumbnail_url || null,
    }));
  } catch (err) {
    console.error('post render error', err);
    res.status(500).setHeader('Content-Type', 'text/html; charset=utf-8').send(renderNotFound());
  }
};
