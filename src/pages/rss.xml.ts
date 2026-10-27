import rss from '@astrojs/rss';
import { getPosts, href } from '../lib/content';
import { siteConfig } from '../data/site';
import type { APIContext } from 'astro';
export async function GET({ site }: APIContext) {
  const posts = await getPosts({ includeSamples: false });
  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: new URL(href(), site!),
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.publishedAt,
      link: href(`writing/${p.id}/`),
    })),
    customData: '<language>en</language>',
  });
}
