import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import compress from 'astro-compress';
import node from '@astrojs/node';

const defaultSite = 'https://dynamics-tim.dev';
const defaultBase = '/';
const publicBaseUrl = process.env.PUBLIC_BASE_URL;
const ensureSlash = (value) => (value.endsWith('/') ? value : `${value}/`);

const siteUrl = ensureSlash(publicBaseUrl ?? defaultSite);
const baseUrl = ensureSlash(publicBaseUrl ? new URL(publicBaseUrl).pathname : defaultBase);

export default defineConfig({
  site: siteUrl,
  base: baseUrl,
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  prerender: {
    default: true
  },
  prefetch: true,
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
      sitemap: `${siteUrl}sitemap-index.xml`
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
