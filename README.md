# Negotiated Truth Website

A production-quality public website built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Quick Start

### Local Development

```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

The site will be available at `http://localhost:4321` during development.

## Project Structure

```
.
├── src/
│   ├── components/      # Reusable Astro components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── Features.astro
│   │   └── ...
│   ├── layouts/         # Page layouts
│   │   └── MainLayout.astro
│   ├── styles/          # Global styles and design tokens
│   │   ├── global.css
│   │   └── design-tokens.css
│   ├── data/
│   │   └── site.ts      # Site configuration and content
│   ├── pages/
│   │   ├── index.astro  # Homepage
│   │   └── 404.astro    # Custom 404 page
│   └── favicon.svg      # Favicon (placeholder)
├── .github/workflows/   # GitHub Actions for deployment
└── astro.config.mjs     # Astro configuration
```

## Deployment to GitHub Pages

### For User/Organization Pages (`<username>.github.io`)

1. Update `astro.config.mjs`:
   ```javascript
   base: '/',
   site: 'https://<username>.github.io',
   ```

2. Push your changes to the repository.

3. In your GitHub repository, go to **Settings → Pages**:
   - Under **Build and deployment**, select **GitHub Actions**
   - No additional configuration needed

4. Your site will be live at `https://<username>.github.io` after the workflow completes.

### For Project Pages (`<username>.github.io/<repo>`)

1. Update `astro.config.mjs`:
   ```javascript
   base: '/<repository-name>/',
   site: 'https://<username>.github.io/<repository-name>/',
   ```

2. Push your changes and enable GitHub Pages as described above.

3. Your site will be live at `https://<username>.github.io/<repository-name>/`.

### Custom Domain

1. Add a `CNAME` file in the root of your project:
   ```
   yourdomain.com
   ```

2. Update `astro.config.mjs`:
   ```javascript
   site: 'https://yourdomain.com',
   ```

3. Configure your DNS provider with the appropriate records for GitHub Pages.

## Content Configuration

Edit `src/data/site.ts` to customize:
- Site title and description
- Navigation links
- Hero section content
- Services/features
- Featured work
- About section
- Contact information

## Design System

This site uses a custom CSS design system with tokens defined in `src/styles/design-tokens.css`. No external UI framework is used.

## Tech Stack

- **Astro** 5.x - Static site generator
- **TypeScript** - Type-safe development
- **CSS3** - Custom styling with design tokens
- **GitHub Pages** - Free static hosting
- **GitHub Actions** - Automated deployment

---

Built with 🧘‍♂️ for clarity through conversation.
