# NegotiatedTruth

A personal journal about strategy, technology and AI. Built with Astro and Markdown, deployed as static files to GitHub Pages.

## Develop and verify

Use the Node version in `.nvmrc`, then `npm ci`.

- `npm run dev -- --background` starts the local preview. Use `npm exec astro -- dev status`, `npm exec astro -- dev logs`, and `npm exec astro -- dev stop` to manage it.
- `npm run verify` checks types, builds the site, and validates internal links, assets, publication filtering, sample exclusions and structured data.
- `npm run build` creates `dist/`; `npm run preview` serves that production build.

## Write an article

Add a Markdown file in `src/content/writing/`. Its filename becomes its stable article slug. Use this front matter:

```yaml
title: 'A clear title'
description: 'A short summary for the archive, social card and RSS feed.'
publishedAt: 2026-10-27T09:00:00+02:00
topic: strategy # strategy | technology | ai
type: Essay # Essay | Field note | Experiment | Visual essay
draft: true
sample: false
contents: false # optional; long articles get a contents list automatically
```

Use explicit timezone offsets (Bucharest is UTC+2 in winter and UTC+3 in summer). Dates are displayed in Europe/Bucharest. Add `updatedAt` for a substantive revision.

Drafts and future articles are excluded from all generated outputs. **Source files committed to this public repository remain publicly readable**, including drafts. Keep confidential writing elsewhere.

Four clearly labelled sample posts make the first design reviewable. They appear in the journal but are excluded from RSS and the sitemap and marked `noindex`. Replace them with real writing, set `sample: false`, and remove the provisional preview wording in the archive/About pages before launch. `_draft-example.md` and `_future-example.md` demonstrate publication filtering. The initial RSS feed intentionally has no items.

## Editorial formats

The home page leads with the newest article and takes its opening paragraphs directly from its Markdown. It then mixes compact field notes, plain essay entries and illustrated visual-essay entries in date order. No featured flag or dedicated promotional sidebar is used.

Ordinary essays use a centred reading column. Contents navigation appears automatically at 1,400 words with at least four sections; `contents: true` or `false` overrides that choice. Markdown footnotes are supported. Optional closing reflections belong in the front matter:

```yaml
reflection:
  label: 'What would change my mind?' # or 'What I’m testing next'
  text: 'A short, specific reflection appropriate to this piece.'
```

Set `type: Visual essay` for a wider cover, numbered sections and chapter navigation. Supply article-specific artwork using `cover`, `coverAlt`, and optionally `coverMobile` with file paths relative to the Markdown. Keep a readable narrative and captions alongside the images. The sample visual story demonstrates an original workflow diagram and acceptance map, with a stacked cover for small screens and a keyboard-accessible scrolling figure for the detailed map.

`visualTool: review-time` adds the sample's optional comparison of draft and review time. Its illustrative default result is readable without JavaScript; controls appear only when the enhancement loads. Only use this tool for content to which its declared assumptions apply. For a different interactive story, add a purpose-built component and a corresponding schema option. Respect reduced-motion preferences; no scroll animation is required by the format.

Only publish work that the author has reviewed. The personal sample voice and About copy are provisional and should be checked along with the byline before launch.

## Deployment and domain

The canonical domain defaults to `https://negotiatedtruth.com` with root paths. Pull requests run the verification workflow without deploying. Merging to `main` runs verification and deploys the successful artifact to GitHub Pages.

Before merging the first release, verify the domain in GitHub, set the repository's Pages custom domain, configure the appropriate DNS records, and enable HTTPS when the certificate is ready. No DNS or Pages-domain settings are changed by this branch. The custom Actions workflow does not need a CNAME file.

For a temporary GitHub project-page deployment before domain setup, build with:

```sh
SITE_URL=https://ccriveteanu.github.io BASE_PATH=/negotiatedtruth/ npm run verify
```

Set the same two variables in the build workflow if you choose that temporary deployment. Remove them for domain cutover. See [GitHub custom-domain guidance](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

Roll back by reverting the offending commit on `main` or redeploying a known-good revision. A failed verification/build does not replace the live site.

## Identity and assets

The geometric symbol is extracted from the supplied vector logo. The old wordmark is replaced with NegotiatedTruth. The site uses an independent ink-green, lime and near-white design system with locally served Geist and a system serif reading font. `public/brand/mark.svg` is the symbol; `public/brand/negotiatedtruth.svg` is a portable lockup; `social.png` is a social preview image. Master brand files stay outside the public website.

No analytics, cookies, remote fonts, accounts or external form service are used. Archive search filters the loaded titles and summaries in the browser.
