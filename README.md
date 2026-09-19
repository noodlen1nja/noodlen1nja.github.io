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
