---
title: 'Build for the change you expect'
description: 'Good architecture is a choice about which kinds of change should be easy, and which costs are worth accepting.'
publishedAt: 2026-10-25T09:00:00+02:00
topic: technology
type: Field note
sample: true
reflection:
  label: 'What I’m testing next'
  text: 'For the next design decision, write down the kind of change it is supposed to make easier. If that sentence is vague, try the simpler design first.'
---

Every system makes some changes straightforward and others inconvenient. A useful architecture conversation starts by naming the changes we actually expect.

## Flexibility has a direction

An abstraction is valuable when it protects a boundary we expect to move. Without that expectation, it may simply add another place to look when something goes wrong.

Imagine a small publication. Its articles will change often. Its page layouts will change occasionally. Its hosting provider might change once in several years. Those are different rates of change, and the design can reflect them.

Plain text articles, reusable templates and a static build keep the frequent work simple. They also leave a reasonable path to changing the less frequent pieces later.

## Write down the trade-off

A short decision record can be more useful than a diagram that tries to explain everything:

```text
Decision: publish prebuilt pages
Reason: readers mostly need text and images
Accepted cost: publishing requires a new build
Revisit when: the site needs personalized content
```

This is an illustrative record, not a rule for every website. Its value lies in connecting the choice to the situation.

## Prefer a useful boundary

The question is rarely whether a system is flexible in the abstract. Ask which change it accommodates, what that convenience costs today, and whether the expected change is likely enough to justify it.

A boundary earns its place when it makes the work easier to understand or safer to change. Otherwise, simplicity remains a serious architectural option.
