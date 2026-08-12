import { defineConfig } from 'astro/config';

// https://docs.astro.build/en/guides/deploy/
export default defineConfig({
  output: 'static',
  
  // For GitHub Pages, use "/" for user/org pages or "/<repo>/" for project pages
  base: '/',
  
  site: 'https://negotiatedtruth.github.io',
  
  integrations: [],
});
