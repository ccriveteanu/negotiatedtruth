export const siteConfig = {
  title: 'NegotiatedTruth',
  description:
    'A personal journal by Cătălin Criveteanu. Essays, notes and visual stories about strategy, technology and AI.',
  author: 'Cătălin Criveteanu',
  github: 'https://github.com/ccriveteanu',
};
export const topics = [
  {
    id: 'strategy',
    name: 'Strategy',
    question: 'Which trade-offs are we actually making?',
    editorialFocus:
      'Problem framing, priorities and the capabilities behind a plan. How do we decide what to pursue, what to leave out and when to reconsider?',
    number: '01',
    description:
      'Choices, trade-offs and the work of turning intent into action.',
  },
  {
    id: 'technology',
    name: 'Technology',
    question: 'What should be easy to change?',
    editorialFocus:
      'Architecture, delivery and the systems behind the software. The interesting choices often concern what a design makes easier today and what it asks us to carry tomorrow.',
    number: '02',
    description: 'Systems, software and the decisions behind what we build.',
  },
  {
    id: 'ai',
    name: 'AI',
    question: 'What makes an AI system useful?',
    editorialFocus:
      'Evaluation, adoption and the complete route from a generated answer to accepted work. What do we measure, where does the effort move and which assumptions need testing?',
    number: '03',
    description:
      'Useful intelligence, honest evaluation and room for uncertainty.',
  },
] as const;
