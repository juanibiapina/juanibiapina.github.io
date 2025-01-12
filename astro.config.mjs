// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { remarkReadingTime } from './src/utils/remark-reading-time.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://juanibiapina.github.io',
  integrations: [tailwind()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  content: {
    remarkPlugins: [remarkReadingTime],
  },
});
