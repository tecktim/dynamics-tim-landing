import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import compress from 'astro-compress';

const siteUrl = 'https://tim-freelance.github.io';

export default defineConfig({
  site: siteUrl,
  base: '/tim-freelance-landing/',
  output: 'static',
  integrations: [
    tailwind({
      applyBaseStyles: false
    }),
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/404')
    }),
    robotsTxt({
      policy: [
        {
          userAgent: '*',
          allow: '/' 
        }
      ],
      sitemap: `${siteUrl}/tim-freelance-landing/sitemap-index.xml`
    }),
    compress({
      HTML: true,
      CSS: true,
      JS: true,
      Image: true,
      SVG: true,
      Logger: 1
    })
  ]
});
