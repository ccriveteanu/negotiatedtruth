import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';
const sampleIds = readdirSync('./src/content/writing')
  .filter(
    (f) =>
      f.endsWith('.md') &&
      /^sample: true$/m.test(
        readFileSync(`./src/content/writing/${f}`, 'utf8'),
      ),
  )
  .map((f) => f.replace(/\.md$/, ''));

// Use SITE_URL and BASE_PATH to preview a GitHub project URL before domain cutover.
const site = process.env.SITE_URL || 'https://negotiatedtruth.com';
export default defineConfig({
  output: 'static',
  site,
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (url) => !sampleIds.some((id) => url.endsWith(`/writing/${id}/`)),
    }),
  ],
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
    },
  },
});
