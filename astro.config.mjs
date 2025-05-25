// @ts-check
import { defineConfig } from 'astro/config';
import { remarkReadingTime } from './src/utils/remark-reading-time.mjs';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://juanibiapina.dev',
  integrations: [],

  markdown: {
    remarkPlugins: [remarkReadingTime],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
