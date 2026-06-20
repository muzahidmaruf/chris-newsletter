const { getPublishedBroadcasts, slugify } = require('../_lib/kit');
const { renderIndex } = require('../_lib/template');

module.exports = async (req, res) => {
  try {
    const broadcasts = await getPublishedBroadcasts();
    const posts = broadcasts.map(b => ({
      subject: b.subject,
      slug: slugify(b.subject),
      publishedAt: b.published_at || b.send_at || b.created_at,
    }));

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.status(200).send(renderIndex({ posts }));
  } catch (err) {
    console.error('posts index error', err);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(renderIndex({ posts: [] }));
  }
};
