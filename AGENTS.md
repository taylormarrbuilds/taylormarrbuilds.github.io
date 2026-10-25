# Agent notes

Static personal site. GitHub Pages serves the repository root. No build step, no package install, no framework.

## Structure

- `index.html` — home. One-line intro, two calls to action, a short about bio, and a “latest app” line.
- `apps/index.html` — app feed. Fills `#app-list` from `data/apps.json`.
- `apps/<slug>/index.html` — one self-contained app. Hours of freedom is the first.
- `work/index.html` — full-time (W2) roles and one-off projects, plus the résumé placeholder.
- `contact/index.html` — a `mailto:` link only. No form and no backend.
- `data/apps.json` — the only app catalog. Both the feed and the home page read it.
- `js/apps.js` — fetches that file, sorts by `date` newest first, and renders cards.
- `css/site.css` — shared layout. Navy accent is `#16324f`.
- `favicon.svg` — icon.
- `.nojekyll` — Pages serves the files as committed.

Header, footer, and nav are copied on each site page. There is no template. If you change chrome, update every page: `index.html`, `apps/index.html`, `work/index.html`, `contact/index.html`.

## Conventions

- Prefer plain HTML, CSS, and a little vanilla JavaScript. Do not add a bundler, a framework, or a host-side form.
- Adding an app is a folder plus one object in `data/apps.json`. The exact steps are in the README under “Add a new app”. Do not hand-maintain the feed markup. The `<noscript>` link on the Apps page is only a fallback for the current app; the JSON file is the list.
- Dates are `YYYY-MM-DD`. Paths on this site are root-relative (`/apps/...`, `/css/site.css`), because the site is a user page at the domain root.
- Keep each app’s assets inside its own folder. Do not let an app’s CSS or JS leak into `css/site.css` or `js/apps.js`.
- `apps/hours-of-freedom/index.html` was copied from the prototype and should stay behavior-identical unless the task is to change that app.
- Copy Taylor has not signed off is marked with a visible **Draft** or **TODO** label, and often an HTML comment. Leave the label in place until the words are actually replaced. The Nike role stays inside the neutral About bio. Do not promote it to a headline or a job-seeking pitch.
- Contact stays a mailto link. The placeholder address is `taylor@example.com` in `contact/index.html`. Topic links from the work page add a subject (`?topic=role` or `?topic=project`); the script reads the existing `href`, so there is one address to replace.
- The résumé link points at `/resume.pdf`. Do not invent a résumé file.
- Accessibility to keep: one `h1` per page, skip link, header and footer landmarks, `aria-current="page"` on the active nav item, visible `:focus-visible`, link text that still makes sense beside the app name, and contrast on the navy / off-white palette.
- Meta description, canonical URL, and Open Graph tags (`og:title`, `og:description`, `og:url`, `og:type`) live in each site page’s `<head>`. Update them when the public wording changes. App prototypes do not have to use the site chrome.
- Do not change GitHub repository settings. How to turn on Pages (Settings → Pages → Deploy from a branch → `main` → `/ (root)`) is in the README.
