# taylormarrbuilds.github.io

Personal site for Taylor Marr. Two jobs: an app-a-day log, and a page for full-time roles and one-off projects.

The site is plain static files. GitHub Pages serves the repository root at [https://taylormarrbuilds.github.io](https://taylormarrbuilds.github.io). There is no build step.

## Local preview

From the repository root:

```bash
python3 -m http.server 8000
```

Open [http://127.0.0.1:8000/](http://127.0.0.1:8000/). Use a local server. Opening the HTML files directly will not load the app list, because the pages fetch `/data/apps.json`.

## Add a new app

About two minutes. You add a folder and one JSON object. You do not edit `apps/index.html`.

1. Pick a slug: lowercase letters, numbers, and hyphens, like `grocery-list`.
2. Create the folder `apps/grocery-list/`.
3. Put the app at `apps/grocery-list/index.html`. Keep it self-contained. If it has its own CSS or JS, put those files in the same folder and link them with relative paths.
4. Add one object to the array in `data/apps.json`:

```json
{
  "slug": "grocery-list",
  "name": "Grocery list",
  "date": "2026-10-26",
  "description": "One sentence on what it does.",
  "learned": "One or two sentences on what you learned.",
  "live": "/apps/grocery-list/",
  "code": "https://github.com/taylormarrbuilds/taylormarrbuilds.github.io/tree/main/apps/grocery-list"
}
```

5. Save, commit, and push to `main` (after GitHub Pages is turned on, that push updates the live site).

`date` is `YYYY-MM-DD`. The Apps page and the “latest app” line on the home page sort by that date, newest first, so the order of objects in the file does not matter. `live` is a root-relative path on this site. `code` is the GitHub folder for that app.

The first entry, Hours of freedom (`apps/hours-of-freedom/index.html`, dated 2026-10-23), is the original prototype. Leave its behavior as it is unless you are changing that app on purpose.

## GitHub Pages

Turn this on once, in the GitHub website. This repository does not change those settings for you.

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Set **Branch** to `main` and the folder to **`/ (root)`**.
5. Save.

The site is published at [https://taylormarrbuilds.github.io](https://taylormarrbuilds.github.io). The first deploy can take a minute. Later pushes to `main` publish the root of the repo. `.nojekyll` is committed so Pages serves these files as they are, without running Jekyll.

## Placeholders for Taylor

Visible **Draft** and **TODO** labels mark copy that still needs an edit. Search the repo for `Draft`, `TODO`, and `DRAFT`.

- Home intro, in `index.html`.
- About bio, in `index.html`. The Nike title stays in that bio. It is not the headline.
- “What I learned” for Hours of freedom, in `data/apps.json` (the text starts with `DRAFT`).
- Full-time path and one-off project path, in `work/index.html`.
- Résumé PDF. `work/index.html` links to `/resume.pdf`. Add the file at `resume.pdf` in the repo root. Until then the link 404s.
- Contact email. `contact/index.html` uses `mailto:taylor@example.com`. That address is fake. Replace it with a real one. The contact page is only a mailto link. There is no form.
- Meta descriptions and Open Graph tags repeat the draft intro and page summaries, in `index.html`, `apps/index.html`, `work/index.html`, and `contact/index.html`. Update them if you change the public wording.

## Layout

`AGENTS.md` describes the files and the conventions for later edits.
