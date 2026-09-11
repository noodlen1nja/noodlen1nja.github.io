# Rohith Menon · Portfolio

Personal portfolio for **Rohith Raghuprakash Menon**, Senior Machine Learning Engineer (AI/ML, Agentic AI, AWS).

Plain HTML, CSS and JavaScript: no framework, no build step, no dependencies, no trackers. It loads fast, scores well on Lighthouse, and every `git push` to `main` deploys it to GitHub Pages.

## Project structure

```
.
├── index.html                    # All page content. Edit this to update the site.
├── 404.html                      # Self-contained "not found" page
├── resume.pdf                    # ← add this yourself (see below)
├── robots.txt
├── .nojekyll                     # Skips Jekyll if you ever deploy from a branch
├── assets/
│   ├── css/styles.css            # Design tokens (colours, fonts, radii) at the top
│   ├── js/main.js                # Theme toggle, mobile nav, scroll-spy, reveal, copy-email
│   └── favicon.svg
└── .github/workflows/deploy.yml  # Auto-deploys to GitHub Pages on push to main
```

## Run locally

Nothing to install. Serve the folder with any static file server:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Customise

### Add your résumé

Put your PDF at the repo root, named exactly **`resume.pdf`**. Both **Download Resume** buttons link to it (visitors get it saved as `Rohith_Menon_Resume.pdf`). If the file is missing, the deploy workflow prints a warning.

### Fill in the project cards

In `index.html`, search for `PROJECT CARD TEMPLATE`. Each card has a title, a summary, tags and a links row. When a project is ready:

1. Update the text and tags.
2. Replace `<span class="link is-disabled">Write-up coming soon</span>` with real links:
   ```html
   <a class="link" href="https://github.com/..." target="_blank" rel="noopener noreferrer">
     Code <svg class="icon"><use href="#i-external"/></svg>
   </a>
   ```
3. Delete the `<span class="status">Coming soon</span>` pill.

To add a card, copy an existing `<article class="card card-hover project-card">` block. Available icons are in the SVG sprite at the top of `<body>` (`#i-agents`, `#i-layers`, `#i-chart`, `#i-cloud`, `#i-cycle`, `#i-code`, …).

### Certification verification links

Each certification card has a commented-out **Verify credential** link. Uncomment it and paste your Credly badge URL.

### Colours & typography

All colours are CSS custom properties at the top of `assets/css/styles.css`:

- **Light palette:** on `:root`
- **Dark palette:** appears **twice**, once for the OS dark-mode setting and once for the manual toggle. Keep both blocks identical.

The accent is teal (`--accent`). To switch to navy, try:

| Token | Light | Dark |
| --- | --- | --- |
| `--accent` | `#1e3a8a` | `#8fb3ff` |
| `--accent-strong` | `#172554` | `#b4cbff` |
| `--accent-soft` | `rgb(30 58 138 / .08)` | `rgb(143 179 255 / .1)` |
| `--accent-line` | `rgb(30 58 138 / .35)` | `rgb(143 179 255 / .35)` |
| `--on-accent` | `#ffffff` | `#0a1633` |

Also update the teal (`#4fd1c1`) in `assets/favicon.svg` and `404.html`.

Fonts are system stacks (SF Pro / Segoe UI / Roboto, and SF Mono / Cascadia / Menlo for the monospace accents), so no font files are downloaded. If you want a web font, self-host a single `woff2` file and add `font-display: swap` rather than loading it from Google Fonts. That keeps Lighthouse happy.

### Before you go live

Once you know your final URL, open `index.html` and uncomment and fill in the `canonical` and `og:url` tags in `<head>`. Optionally add an `og:image` (1200×630 PNG) for nicer link previews on LinkedIn and Slack.

## Deploy to GitHub Pages

### 1. Pick a repository name

| Repository name | Live URL |
| --- | --- |
| `<username>.github.io` | `https://<username>.github.io/` |
| Anything else, e.g. `portfolio` | `https://<username>.github.io/portfolio/` |

All asset and résumé links are **relative** (`assets/…`, `resume.pdf`, never `/resume.pdf`), so the site works under either URL with no code changes. Keep them relative if you add more.

### 2. Push the code

Create an **empty** repository on GitHub (no README or licence), then from this folder:

```bash
git init -b main          # skip if already initialised
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

### 3. Enable Pages (one-time)

1. In the repository, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Go to the **Actions** tab, open the **Deploy to GitHub Pages** run and click **Re-run all jobs**. The very first run can fail if it started before Pages was enabled. That's expected.

From then on, every push to `main` deploys in about a minute. You can also deploy manually from **Actions → Deploy to GitHub Pages → Run workflow**. The live URL appears on the run summary and under **Settings → Pages**.

### What the workflow does

`.github/workflows/deploy.yml` uses GitHub's official Pages actions:

1. **Checkout** the repo.
2. **Configure Pages** to discover the site's base path (`""` for a user site, `/<repo>` for a project site).
3. **Stage** the site into `_site/`, leaving out `README.md`, `.github/` and other repo-only files. It rewrites the 404 page's home link to the base path and warns if `resume.pdf` is missing.
4. **Upload** `_site/` as a Pages artifact.
5. **Deploy** it to the `github-pages` environment.

### Custom domain (optional)

1. Add a file named `CNAME` at the repo root containing just your domain, e.g. `rohithmenon.dev`.
2. Configure DNS as described in [GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
3. In **Settings → Pages**, enter the domain and tick **Enforce HTTPS** once the certificate is issued.

### Alternative: deploy from a branch (no Actions)

If you'd rather not use Actions: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**, and delete `.github/workflows/deploy.yml`. The only difference is that nothing rewrites the 404 page's home link. That's fine for a `<username>.github.io` repo. For a project repo, change `href="/"` in `404.html` to `href="/<repo>/"`.

## Performance & accessibility

- **No web fonts, no images, no third-party requests.** Icons come from one inline SVG sprite.
- **One stylesheet and one small deferred script.** The saved theme is applied by a tiny inline script before first paint, so there's no flash and no layout shift.
- **Works without JavaScript.** Content is fully visible and the nav falls back to a scrollable row. Scroll-reveal animations only switch on after the script loads, and never when the visitor prefers reduced motion.
- **Accessible:** skip link, semantic landmarks and heading order, visible focus rings, `aria-expanded` on the mobile menu, and a palette chosen for WCAG AA contrast in both themes.

To audit, run Lighthouse from Chrome DevTools (**Lighthouse** tab), or:

```bash
npx lighthouse http://localhost:8000 --view
```
