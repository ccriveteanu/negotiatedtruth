import { getCollection, type CollectionEntry } from 'astro:content';
export type Post = CollectionEntry<'writing'>;
export const href = (path = '') =>
  `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Bucharest',
  }).format(date);
export const readingTime = (post: Post) =>
  Math.max(1, Math.ceil((post.body || '').split(/\s+/).length / 220));
export async function getPosts({ includeSamples = true } = {}) {
  const now = new Date();
  return (
    await getCollection(
      'writing',
      ({ data }) =>
        !data.draft &&
        data.publishedAt <= now &&
        (includeSamples || !data.sample),
    )
  ).sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
}

// Pull the opening from the article itself so the home page stays in sync.
export function openingParagraphs(post: Post, limit = 2) {
  return (post.body || '')
    .split(/^##? /m)[0]
    .trim()
    .split(/\n\s*\n/)
    .filter((p) => p && !/^[#>|`!<\[]/.test(p.trim()))
    .slice(0, limit)
    .map((p) =>
      p
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/\[\^[^\]]+\]/g, '')
        .replace(/[*_`]/g, '')
        .replace(/\n/g, ' '),
    );
}
