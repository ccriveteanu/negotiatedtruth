import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      topic: z.enum(['strategy', 'technology', 'ai']),
      type: z.enum(['Essay', 'Field note', 'Experiment', 'Visual essay']),
      draft: z.boolean().default(false),
      sample: z.boolean().default(false),
      contents: z.boolean().optional(),
      startHere: z
        .object({ question: z.string(), reason: z.string() })
        .optional(),
      cover: image().optional(),
      coverMobile: image().optional(),
      coverAlt: z.string().optional(),
      visualTool: z.enum(['review-time']).optional(),
      reflection: z
        .object({
          label: z.enum([
            'What would change my mind?',
            'What I’m testing next',
          ]),
          text: z.string(),
        })
        .optional(),
    }),
});
export const collections = { writing };
