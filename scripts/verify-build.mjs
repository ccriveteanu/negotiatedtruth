import { readdir, readFile, access } from 'node:fs/promises';
import { join, extname, resolve } from 'node:path';
import assert from 'node:assert/strict';
const root = resolve('dist');
const origin = process.env.SITE_URL || 'https://negotiatedtruth.com';
const base = (process.env.BASE_PATH || '/').replace(/\/$/, '');
async function files(dir) {
  return (
    await Promise.all(
      (await readdir(dir, { withFileTypes: true })).map((e) =>
        e.isDirectory() ? files(join(dir, e.name)) : join(dir, e.name),
      ),
    )
  ).flat();
}
const all = await files(root);
const htmlFiles = all.filter((f) => extname(f) === '.html');
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  assert(
    !/Private draft sentinel|Future article sentinel/.test(html),
    `Unpublished content leaked: ${file}`,
  );
  assert(
    !/Equilobe|Fortune 500|555\) 000|contact@negotiatedtruth\.example/.test(
      html,
    ),
    `Old template branding/content: ${file}`,
  );
  assert(
    html.includes('data-appearance-select') &&
      html.includes('value="dark"') &&
      html.includes('value="light"'),
    `Appearance options missing: ${file}`,
  );
  const initializer = html.indexOf('negotiatedtruth:appearance');
  assert(
    initializer > 0 && initializer < html.indexOf('<body'),
    `Appearance initializer must run before page content: ${file}`,
  );
  assert(html.includes('lang="en"'), `Missing language: ${file}`);
  assert(html.includes('rel="canonical"'), `Missing canonical: ${file}`);
  assert(html.includes('Skip to content'), `Missing skip link: ${file}`);
  for (const match of html.matchAll(
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
  ))
    JSON.parse(match[1]);
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
  for (const [, fragment] of html.matchAll(/href="#([^"]+)"/g)) {
    assert(
      ids.has(decodeURIComponent(fragment)),
      `Broken section/footnote link in ${file}: #${fragment}`,
    );
  }
  for (const [, srcset] of html.matchAll(/\bsrcset="([^"]+)"/g)) {
    for (const candidate of srcset.split(',')) {
      const url = candidate.trim().split(/\s+/)[0];
      if (!url.startsWith('/') || url.startsWith('//')) continue;
      const local = decodeURIComponent(url.split(/[?#]/)[0])
        .slice(base.length)
        .replace(/^\//, '');
      await access(join(root, local));
    }
  }
  for (const [, attr, value] of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
    if (!value.startsWith('/') || value.startsWith('//')) continue;
    const path = decodeURIComponent(value.split(/[?#]/)[0]);
    assert(
      !base || path === base || path.startsWith(base + '/'),
      `Base path missing in ${file}: ${value}`,
    );
    const relative = path.slice(base.length).replace(/^\//, '');
    const target = join(root, relative);
    try {
      await access(extname(relative) ? target : join(target, 'index.html'));
    } catch {
      assert.fail(`Broken ${attr} in ${file}: ${value}`);
    }
  }
}
const feed = await readFile(join(root, 'rss.xml'), 'utf8');
assert(feed.includes(origin), 'RSS origin is wrong');
const sitemapFile = all.find((f) => /sitemap-\d+\.xml$/.test(f));
assert(sitemapFile, 'Missing sitemap');
const sitemap = await readFile(sitemapFile, 'utf8');
const sources = (await files(resolve('src/content/writing'))).filter(
  (f) => extname(f) === '.md',
);
for (const source of sources) {
  const text = await readFile(source, 'utf8');
  const frontmatter = text.split('---')[1];
  const id = source
    .slice(resolve('src/content/writing').length + 1)
    .replace(/\.md$/, '');
  const sample = /^sample: true$/m.test(frontmatter);
  const draft = /^draft: true$/m.test(frontmatter);
  const date = /^publishedAt: (.+)$/m.exec(frontmatter)?.[1];
  assert(
    date && !Number.isNaN(Date.parse(date)),
    `Invalid publication date: ${source}`,
  );
  const published = !draft && new Date(date) <= new Date();
  const path = join(root, 'writing', id, 'index.html');
  if (!published) {
    assert(!all.includes(path), `Unpublished article was generated: ${id}`);
    assert(
      !feed.includes(`/writing/${id}/`) && !sitemap.includes(`/writing/${id}/`),
      `Unpublished article is discoverable: ${id}`,
    );
    continue;
  }
  const html = await readFile(path, 'utf8');
  const visual = /^type: ['"]?Visual essay['"]?$/m.test(frontmatter);
  const words = text.split('---').slice(2).join('---').split(/\s+/).length;
  if (visual) {
    assert(
      html.includes('article-page--visual') && html.includes('chapter-nav'),
      `Missing visual-story navigation: ${id}`,
    );
    assert(
      html.includes('story-cover-art') && html.includes('alt="'),
      `Missing visual-story artwork: ${id}`,
    );
  } else if (words < 1400 && !/^contents: true$/m.test(frontmatter)) {
    assert(
      !html.includes('class="chapter-nav"'),
      `Short essay has unnecessary contents navigation: ${id}`,
    );
  }
  if (sample) {
    assert(html.includes('noindex, follow'), `Sample is indexable: ${id}`);
    assert(
      html.includes('illustrative content'),
      `Sample label missing: ${id}`,
    );
    assert(
      !feed.includes(`/writing/${id}/`) && !sitemap.includes(`/writing/${id}/`),
      `Sample is discoverable: ${id}`,
    );
  } else {
    assert(
      feed.includes(`/writing/${id}/`),
      `Published article is missing from feed: ${id}`,
    );
    assert(
      sitemap.includes(`/writing/${id}/`),
      `Published article is missing from sitemap: ${id}`,
    );
  }
}
const home = await readFile(join(root, 'index.html'), 'utf8');
assert(
  !/journal-aside|featured-section|topics-section/.test(home),
  'Promotional homepage sections returned',
);
const visualExample = await readFile(
  join(root, 'writing/a-faster-answer-isnt-a-finished-task/index.html'),
  'utf8',
);
assert(
  visualExample.includes('5 minutes per task') &&
    visualExample.includes('class="review-controls" hidden'),
  'The worked example must have a readable static default and progressively enhanced controls',
);
assert(
  visualExample.includes('tabindex="0"') &&
    visualExample.includes('decision-path-mobile'),
  'Mobile diagram alternative or focusable detailed figure is missing',
);
console.log(
  `Verified ${htmlFiles.length} HTML pages: local assets and links, base path, structured data, draft/date filtering, sample exclusion, feed and sitemap.`,
);
