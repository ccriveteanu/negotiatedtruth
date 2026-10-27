export const siteConfig = {
  title: 'NegotiatedTruth',
  description:
    'A personal journal about strategy, technology and AI. Better questions for clearer decisions.',
  author: 'Cătălin Criveteanu',
  github: 'https://github.com/ccriveteanu',
};
export const topics = [
  {
    id: 'strategy',
    name: 'Strategy',
    number: '01',
    description:
      'Choices, trade-offs and the work of turning intent into action.',
  },
  {
    id: 'technology',
    name: 'Technology',
    number: '02',
    description: 'Systems, software and the decisions behind what we build.',
  },
  {
    id: 'ai',
    name: 'AI',
    number: '03',
    description:
      'Useful intelligence, honest evaluation and room for uncertainty.',
  },
] as const;
