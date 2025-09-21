import { defineCollection, z } from 'astro:content';

const timeline = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    company: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    location: z.string().optional(),
    tags: z.array(z.string()).default([]),
    highlight: z.boolean().default(false)
  })
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    link: z.string().url().optional(),
    repo: z.string().url().optional(),
    tech: z.array(z.string()).default([]),
    featured: z.boolean().default(false)
  })
});

const certs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    issuer: z.string(),
    issued: z.string(),
    credentialUrl: z.string().url().optional(),
    skills: z.array(z.string()).default([])
  })
});

export const collections = {
  timeline,
  projects,
  certs
};
