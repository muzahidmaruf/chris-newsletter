function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return '';
  }
}

const HEAD_STYLES = `
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
:root {
  --dark-green: #213A2F;
  --cream: #F5F2E8;
  --gold: #FCC759;
  --forest: #005419;
  --sage: #619483;
  --text-dark: #1a1a1a;
  --text-light: #F5F2E8;
  --text-muted: rgba(245, 242, 232, 0.7);
}
html { font-size: 16px; scroll-behavior: smooth; }
body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; color: var(--text-dark); background-color: var(--cream); line-height: 1.6; }
.navbar { display: flex; align-items: center; justify-content: space-between; padding: 16px 48px; background-color: var(--dark-green); position: sticky; top: 0; z-index: 100; }
.navbar-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.navbar-logo img { height: 28px; }
.navbar-logo span { color: var(--text-light); font-size: 15px; font-weight: 600; letter-spacing: -0.02em; }
.navbar-links { display: flex; align-items: center; gap: 32px; }
.navbar-links a { color: var(--text-light); text-decoration: none; font-size: 14px; font-weight: 500; opacity: 0.85; transition: opacity 0.2s; }
.navbar-links a:hover { opacity: 1; }
.navbar-links a.navbar-cta { background-color: var(--cream); color: #213A2F; opacity: 1; padding: 10px 20px; border-radius: 24px; font-size: 14px; font-weight: 600; }
.post-wrap { max-width: 720px; margin: 0 auto; padding: 80px 24px 60px; }
.post-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--forest); margin-bottom: 16px; }
.post-title { font-family: 'Playfair Display', Georgia, serif; font-size: 2.6rem; line-height: 1.2; font-weight: 700; color: var(--text-dark); margin-bottom: 18px; }
.post-meta { font-size: 14px; color: #777; margin-bottom: 40px; padding-bottom: 24px; border-bottom: 1px solid rgba(0,0,0,0.08); }
.post-body { font-size: 17px; line-height: 1.75; color: #222; }
.post-body p { margin-bottom: 20px; }
.post-body h1, .post-body h2, .post-body h3 { font-family: 'Playfair Display', Georgia, serif; font-weight: 700; color: var(--text-dark); margin: 36px 0 16px; line-height: 1.25; }
.post-body h1 { font-size: 2rem; }
.post-body h2 { font-size: 1.6rem; }
.post-body h3 { font-size: 1.3rem; }
.post-body a { color: var(--forest); text-decoration: underline; text-decoration-color: var(--gold); text-decoration-thickness: 2px; text-underline-offset: 3px; }
.post-body img { max-width: 100%; height: auto; border-radius: 10px; margin: 24px 0; }
.post-body blockquote { border-left: 3px solid var(--gold); padding: 8px 20px; margin: 24px 0; color: #444; font-style: italic; background: rgba(252,199,89,0.08); }
.post-body ul, .post-body ol { padding-left: 22px; margin-bottom: 20px; }
.post-body li { margin-bottom: 8px; }
.post-body pre, .post-body code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
.post-body pre { background: #1a1a1a; color: #f5f5f5; padding: 16px; border-radius: 8px; overflow-x: auto; }
.post-body .ck-hide-in-public-posts, .post-body [class*="ck-hide-in-public"] { display: none !important; }
.post-body img[alt="Built with Kit"] { display: none !important; }
.post-body div[role="presentation"] { display: none !important; }
.post-cta { background: var(--gold); padding: 48px 32px; border-radius: 16px; text-align: center; margin: 56px 0 24px; }
.post-cta h3 { font-family: 'Playfair Display', Georgia, serif; font-size: 1.6rem; font-weight: 700; color: var(--dark-green); margin-bottom: 8px; }
.post-cta p { font-size: 15px; color: rgba(33,58,47,0.8); margin-bottom: 24px; }
.post-cta-form { display: flex; flex-direction: column; gap: 12px; max-width: 380px; margin: 0 auto; }
.post-cta-form input { padding: 14px 18px; border: 1px solid #ddd; border-radius: 10px; font-size: 15px; font-family: inherit; outline: none; background: #fff; }
.post-cta-form button { padding: 14px 24px; background: var(--dark-green); color: #fff; border: none; border-radius: 24px; font-size: 15px; font-weight: 600; cursor: pointer; font-family: inherit; }
.back-link { display: inline-block; margin-top: 32px; font-size: 14px; color: var(--forest); text-decoration: none; font-weight: 600; }
.back-link:hover { text-decoration: underline; }
.posts-grid { max-width: 960px; margin: 0 auto; padding: 80px 24px 60px; }
.posts-header { text-align: center; margin-bottom: 48px; }
.posts-header h1 { font-family: 'Playfair Display', Georgia, serif; font-size: 2.6rem; font-weight: 700; color: var(--text-dark); margin-bottom: 12px; }
.posts-header p { font-size: 15px; color: #666; max-width: 480px; margin: 0 auto; }
.posts-list { display: grid; gap: 20px; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); }
.post-card { display: flex; flex-direction: column; background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 14px; overflow: hidden; text-decoration: none; color: inherit; transition: transform 0.15s, box-shadow 0.15s, border-color 0.15s; }
.post-card:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(0,0,0,0.08); border-color: rgba(0,0,0,0.14); }
.post-card-thumb { width: 100%; aspect-ratio: 16/9; background: linear-gradient(135deg, var(--sage), var(--gold)); overflow: hidden; }
.post-card-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.post-card-body { padding: 22px 24px 26px; }
.post-card .post-card-date { font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--forest); margin-bottom: 10px; }
.post-card .post-card-title { font-family: 'Playfair Display', Georgia, serif; font-size: 1.25rem; font-weight: 700; color: var(--text-dark); line-height: 1.3; }
.site-footer { background: var(--dark-green); padding: 40px 48px; margin-top: 60px; }
.footer-inner { max-width: 1100px; margin: 0 auto; }
.footer-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
.footer-logo { display: flex; align-items: center; gap: 10px; }
.footer-logo span { color: var(--text-light); font-size: 14px; font-weight: 600; }
.footer-links { display: flex; gap: 28px; }
.footer-links a { color: var(--text-muted); text-decoration: none; font-size: 14px; }
.footer-bottom { font-size: 13px; color: var(--text-muted); border-top: 1px solid rgba(245,242,232,0.1); padding-top: 20px; }
@media (max-width: 600px) {
  .navbar { padding: 12px 16px; }
  .navbar-links { gap: 0; }
  .navbar-links a:not(.navbar-cta) { display: none; }
  .navbar-links a.navbar-cta { font-size: 12px; padding: 8px 16px; }
  .post-wrap { padding: 40px 20px 40px; }
  .post-title { font-size: 1.8rem; }
  .post-body { font-size: 16px; }
  .posts-grid { padding: 40px 20px; }
  .posts-header h1 { font-size: 1.8rem; }
  .post-cta { padding: 32px 20px; }
  .site-footer { padding: 28px 20px; }
  .footer-top { flex-direction: column; gap: 20px; align-items: center; text-align: center; }
  .footer-links { flex-wrap: wrap; justify-content: center; gap: 16px; }
}
`;

const NAVBAR = `
<nav class="navbar">
  <a href="/" class="navbar-logo">
    <img src="/logo.png" alt="The Excellence Factory">
    <span>The Excellence Factory</span>
  </a>
  <div class="navbar-links">
    <a href="/posts">Letters</a>
    <a href="/#the-show">The Show</a>
    <a href="/#the-book">The Book</a>
    <a href="/#work-with-me">Work With Me</a>
    <a href="/#hero" class="navbar-cta">Get The Letter</a>
  </div>
</nav>
`;

const FOOTER = `
<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-top">
      <div class="footer-logo">
        <img src="/logo.png" alt="The Excellence Factory" style="height:24px;">
        <span>The Excellence Factory</span>
      </div>
      <div class="footer-links">
        <a href="/posts">The Invisible Letter</a>
        <a href="https://www.youtube.com/@theexcellencefactory" target="_blank" rel="noopener">YouTube</a>
        <a href="/#the-book">The Book</a>
        <a href="/#work-with-me">Work With Me</a>
      </div>
    </div>
    <div class="footer-bottom">&copy; 2026 The Excellence Factory &middot; Dr. D&eacute;Recco Lynch &middot; Helping people design their version of freedom.</div>
  </div>
</footer>
`;

const SUBSCRIBE_CTA = `
<div class="post-cta">
  <h3>Get The Invisible Letter every Sunday</h3>
  <p>Field notes on the invisible economy. Read in 5 minutes.</p>
  <form class="post-cta-form" action="https://app.kit.com/forms/9540956/subscriptions" method="post" data-sv-form="9540956" data-uid="9e29a68d32" data-format="inline" data-version="5">
    <input type="email" name="email_address" placeholder="Your best email" required>
    <button type="submit">Join free &rarr;</button>
  </form>
</div>
`;

function scrubKitContent(html) {
  if (!html) return '';
  return String(html)
    .replace(/\{\{\s*[^}]+\s*\}\}/g, '')
    .replace(/<div class="ck-section ck-hide-in-public-posts"[\s\S]*?<\/div>\s*<\/td>/g, '</td>');
}

function renderPost({ subject, content, publishedAt, slug, thumbnail }) {
  const title = escapeHtml(subject);
  const dateStr = formatDate(publishedAt);
  const ogImage = thumbnail || 'https://derecco.com/profile.jfif';
  content = scrubKitContent(content);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} &middot; The Invisible Letter</title>
<meta name="description" content="${title} — by Dr. DéRecco Lynch.">
<meta property="og:title" content="${title} · The Invisible Letter">
<meta property="og:description" content="By Dr. DéRecco Lynch.">
<meta property="og:image" content="${escapeHtml(ogImage)}">
<meta property="og:type" content="article">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${escapeHtml(ogImage)}">
<link rel="icon" href="/favicon.jpg">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
<style>${HEAD_STYLES}</style>
</head>
<body>
${NAVBAR}
<article class="post-wrap">
  <div class="post-eyebrow">The Invisible Letter</div>
  <h1 class="post-title">${title}</h1>
  ${dateStr ? `<div class="post-meta">${dateStr} &middot; Dr. D&eacute;Recco Lynch</div>` : ''}
  <div class="post-body">${content || ''}</div>
  ${SUBSCRIBE_CTA}
  <a href="/posts" class="back-link">&larr; All letters</a>
</article>
${FOOTER}
<script src="https://f.convertkit.com/ckjs/ck.5.js" async></script>
</body>
</html>`;
}

function renderIndex({ posts }) {
  const cards = posts.map(p => {
    const slug = p.slug;
    const title = escapeHtml(p.subject);
    const dateStr = formatDate(p.publishedAt);
    const alt = escapeHtml(p.thumbnailAlt || p.subject || '');
    const thumb = p.thumbnail
      ? `<div class="post-card-thumb"><img src="${escapeHtml(p.thumbnail)}" alt="${alt}" loading="lazy"></div>`
      : `<div class="post-card-thumb"></div>`;
    return `<a href="/posts/${slug}" class="post-card">
      ${thumb}
      <div class="post-card-body">
        ${dateStr ? `<div class="post-card-date">${dateStr}</div>` : ''}
        <div class="post-card-title">${title}</div>
      </div>
    </a>`;
  }).join('\n');

  const empty = `<p style="text-align:center; color:#777; font-size:15px;">No letters yet. The first one arrives Sunday morning.</p>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>The Invisible Letter &middot; All Letters</title>
<meta name="description" content="Every Invisible Letter by Dr. DéRecco Lynch. Field notes on the invisible economy.">
<meta property="og:title" content="The Invisible Letter · All Letters">
<meta property="og:image" content="https://derecco.com/profile.jfif">
<meta property="og:type" content="website">
<link rel="icon" href="/favicon.jpg">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
<style>${HEAD_STYLES}</style>
</head>
<body>
${NAVBAR}
<section class="posts-grid">
  <div class="posts-header">
    <h1>The Invisible Letter</h1>
    <p>Field notes on the invisible economy — career, higher ed, and tech. Read in 5 minutes.</p>
  </div>
  <div class="posts-list">${posts.length ? cards : empty}</div>
</section>
${FOOTER}
</body>
</html>`;
}

function renderNotFound() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Letter not found &middot; The Invisible Letter</title>
<style>${HEAD_STYLES}</style>
</head>
<body>
${NAVBAR}
<div class="post-wrap" style="text-align:center;">
  <h1 class="post-title">Letter not found</h1>
  <p style="color:#666; margin-bottom:24px;">This letter may have been moved or hasn't been published yet.</p>
  <a href="/posts" class="back-link">&larr; All letters</a>
</div>
${FOOTER}
</body>
</html>`;
}

module.exports = { renderPost, renderIndex, renderNotFound };
