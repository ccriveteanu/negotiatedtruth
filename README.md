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
type: Essay # Essay | Field note | Experiment
draft: true
sample: false
featured: false
```

Use explicit timezone offsets (Bucharest is UTC+2 in winter and UTC+3 in summer). Dates are displayed in Europe/Bucharest. Add `updatedAt` for a substantive revision.

Drafts and future articles are excluded from all generated outputs. **Source files committed to this public repository remain publicly readable**, including drafts. Keep confidential writing elsewhere.

Three clearly labelled sample posts make the first design reviewable. They appear in the journal but are excluded from RSS and the sitemap and marked `noindex`. Replace them with real writing, set `sample: false`, and remove the preview notices in the home/archive/about pages before launch. `_draft-example.md` and `_future-example.md` demonstrate publication filtering. The initial RSS feed intentionally has no items.

Only publish work that the author has reviewed. The About copy is provisional and should be checked along with the byline before launch.

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
