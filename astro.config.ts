import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import { transformerNotationDiff } from "@shikijs/transformers";
import { lightTheme, darkTheme } from "./src/utils/shikiThemes";
import { rehypeImageSizes } from "./src/utils/rehypeImageSizes";
import { SITE } from "./src/config";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [sitemap()],
  redirects: {
    "/posts/2026-11-05-gitbutler-use-case": "/posts/2026-11-05-using-gitbutler-to-run-custom-open-source-software",
  },
  build: {
    // Inline all stylesheets into the HTML to avoid render-blocking CSS requests.
    // The site only emits a single Tailwind/global bundle, so this trades one extra
    // request for ~9 KiB of inlined CSS per page and improves LCP.
    inlineStylesheets: "always",
  },
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, { test: "Table of contents" }]],
    rehypePlugins: [rehypeImageSizes],
    shikiConfig: {
      themes: { light: lightTheme, dark: darkTheme },
      defaultColor: "light-dark()",
      wrap: false,
      transformers: [transformerNotationDiff({ matchAlgorithm: "v3" })],
    },
  },
  vite: {
    // eslint-disable-next-line
    // @ts-ignore
    // This will be fixed in Astro 6 with Vite 7 support
    // See: https://github.com/withastro/astro/issues/14030
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
      include: ["@pagefind/default-ui"],
    },
  },
  image: {
    responsiveStyles: true,
    layout: "constrained",
  },
});
