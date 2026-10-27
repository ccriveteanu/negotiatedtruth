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
