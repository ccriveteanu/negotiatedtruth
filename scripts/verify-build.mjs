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
  assert(html.includes('lang="en"'), `Missing language: ${file}`);
  assert(html.includes('rel="canonical"'), `Missing canonical: ${file}`);
  assert(html.includes('Skip to content'), `Missing skip link: ${file}`);
  for (const match of html.matchAll(
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
  ))
    JSON.parse(match[1]);
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
console.log(
  `Verified ${htmlFiles.length} HTML pages: local assets and links, base path, structured data, draft/date filtering, sample exclusion, feed and sitemap.`,
);
