import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import compress from 'astro-compress';

const defaultSite = 'https://tim-freelance.github.io';
const repoBase = '/tim-freelance-landing/';
const publicBaseUrl = process.env.PUBLIC_BASE_URL;
const ensureSlash = (value) => (value.endsWith('/') ? value : `${value}/`);

const siteUrl = publicBaseUrl ? ensureSlash(publicBaseUrl) : `${defaultSite}${repoBase}`;
const baseUrl = publicBaseUrl ? ensureSlash(new URL(publicBaseUrl).pathname) : repoBase;

export default defineConfig({
  site: siteUrl,
  base: baseUrl,
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
