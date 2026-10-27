import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    topic: z.enum(['strategy', 'technology', 'ai']),
    type: z.enum(['Essay', 'Field note', 'Experiment']),
    draft: z.boolean().default(false),
    sample: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});
export const collections = { writing };
