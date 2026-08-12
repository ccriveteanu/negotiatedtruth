import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://docs.astro.build/en/guides/deploy/
export default defineConfig({
  output: 'static',

  // For GitHub Pages, use "/" for user/org pages or "/<repo>/" for project pages
  base: '/negotiatedtruth/',

  site: 'https://ccriveteanu.github.io/negotiatedtruth',

  trailingSlash: 'never',

  image: {
    remotePatterns: [{ protocol: 'https' }],
    breakpoints: [414, 576, 768, 976, 1440, 1600],
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  integrations: [],
});
