# tgru Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the old Programming-Hero page at `tgru-dev/website` with a fast, accessible one-page portfolio for tgru.

**Architecture:** Static HTML and CSS with no runtime JavaScript and no build step. Self-hosted fonts and avatar. One `index.html`, one `style.css`, and an `assets/` folder. Node’s built-in test runner checks content, structure, and CSS invariants; Playwright checks the responsive layout, keyboard focus, and reduced motion.

**Tech Stack:** HTML5, CSS, Node 22 (built-in test runner), Playwright (development only), GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-11-05-tgru-portfolio-design.md`

## Global Constraints

- German UI; English technical terms are allowed.
- Name: `tgru`. Never `Tim`, `Peter Parker`, or another template name.
- Contact: GitHub only, `https://github.com/tgru-dev`.
- No invented claims, metrics, testimonials, job titles, or availability.
- No emoji in the UI.
- No gradients, glow, gradient text, colored shadows, or blobs.
- Palette: paper `#f7f4ee`, card `#fdfbf7`, raised `#efe9df`, ink `#1f1b16`, secondary `#5e554a`, muted `#7b7266`, accent `#1e2a5a`, hairline `rgba(31, 27, 22, 0.08)`.
- Fonts: Instrument Sans (interface), Instrument Serif (name and hero), IBM Plex Mono (meta, numbers, stack). Self-hosted WOFF2 only.
- All spacing values are multiples of 4.
- No runtime JavaScript, no framework, no build step.
- GitHub Pages compatible; all paths relative.
- No deployment or push to `main` without explicit approval.
- All external links use `target="_blank"` and `rel="noopener noreferrer"`.

## Review Focus

1. **Small screens:** 320–390px wide must not scroll horizontally; the hero card and project rows must stack cleanly.
2. **Keyboard:** The skip link is the first focusable element, every link has a visible focus ring, and focus order follows the visual order.
3. **Reduced motion:** With `prefers-reduced-motion: reduce`, entrance animations and hover transitions are disabled.
4. **Missing assets:** If a font or the avatar fails to load, the page still reads correctly with fallback fonts and an empty-image fallback.
5. **Long German copy:** Long project titles and descriptions wrap instead of overlapping or pushing the layout wider.

## File Structure

- `index.html` — semantic page structure and all copy.
- `style.css` — design tokens, typography, layout, responsive rules, motion.
- `assets/avatar.jpg` — the existing seahorse avatar, unchanged.
- `assets/favicon.png` — 64×64 favicon from the avatar.
- `assets/fonts/instrument-sans-latin.woff2` — variable interface font.
- `assets/fonts/instrument-serif-latin.woff2` — display serif.
- `assets/fonts/ibm-plex-mono-400-latin.woff2` — mono regular.
- `assets/fonts/ibm-plex-mono-500-latin.woff2` — mono medium.
- `assets/fonts/OFL-*.txt` — font licenses.
- `tests/site.test.mjs` — Node content, structure, and CSS checks.
- `tests/visual.spec.mjs` — Playwright responsive, focus, and motion checks.
- `playwright.config.mjs` — local server and browser config.
- `package.json` — test scripts and development dependency only.
- `README.md` — what the site is, how to preview it, and attribution.
- `docs/superpowers/specs/2026-11-05-tgru-portfolio-design.md` — approved design.
- `docs/superpowers/plans/2026-11-05-tgru-portfolio.md` — this plan.

---

### Task 1: Branch, design doc, and assets

**Files:**
- Create: `docs/superpowers/specs/2026-11-05-tgru-portfolio-design.md`
- Create: `assets/avatar.jpg`
- Create: `assets/favicon.png`
- Create: `assets/fonts/*.woff2`
- Create: `assets/fonts/OFL-*.txt`
- Create: `package.json`
- Create: `.gitignore`
- Modify: `README.md`

**Interfaces:**
- Consumes: the approved design at `/Users/tgru/tgru-portfolio-design.md`.
- Produces: `assets/avatar.jpg`, `assets/favicon.png`, and four font files used by `index.html` and `style.css`.

- [ ] **Step 1: Create the working branch**

```bash
cd ~/tgru-website
git checkout -b portfolio-redesign
```

- [ ] **Step 2: Copy the approved design into the repo**

```bash
mkdir -p docs/superpowers/specs docs/superpowers/plans
cp ~/tgru-portfolio-design.md docs/superpowers/specs/2026-11-05-tgru-portfolio-design.md
```

- [ ] **Step 3: Download the avatar and create the favicon**

```bash
mkdir -p assets/fonts
curl -sL 'https://avatars.githubusercontent.com/u/97314280?v=4' -o assets/avatar.jpg
sips -z 64 64 -s format png assets/avatar.jpg --out assets/favicon.png
```

Expected: `assets/avatar.jpg` is a 460×460 JPEG; `assets/favicon.png` is 64×64 PNG.

- [ ] **Step 4: Download the four Latin WOFF2 files**

```bash
curl -sL 'https://fonts.gstatic.com/s/instrumentsans/v4/pxiTypc9vsFDm051Uf6KVwgkfoSxQ0GsQv8ToedPibnr0SZe1ZuWi3g.woff2' -o assets/fonts/instrument-sans-latin.woff2
curl -sL 'https://fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-6zUTjnTLgNs.woff2' -o assets/fonts/instrument-serif-latin.woff2
curl -sL 'https://fonts.gstatic.com/s/ibmplexmono/v20/-F63fjptAgt5VM-kVkqdyU8n1i8q131nj-o.woff2' -o assets/fonts/ibm-plex-mono-400-latin.woff2
curl -sL 'https://fonts.gstatic.com/s/ibmplexmono/v20/-F6qfjptAgt5VM-kVkqdyU8n3twJwlBFgsAXHNk.woff2' -o assets/fonts/ibm-plex-mono-500-latin.woff2
```

Expected: all four files start with `wOF2` and are between 10KB and 80KB.

- [ ] **Step 5: Download the font licenses**

```bash
curl -sL 'https://raw.githubusercontent.com/google/fonts/main/ofl/instrumentsans/OFL.txt' -o assets/fonts/OFL-InstrumentSans.txt
curl -sL 'https://raw.githubusercontent.com/google/fonts/main/ofl/instrumentserif/OFL.txt' -o assets/fonts/OFL-InstrumentSerif.txt
curl -sL 'https://raw.githubusercontent.com/google/fonts/main/ofl/ibmplexmono/OFL.txt' -o assets/fonts/OFL-IBMPlexMono.txt
```

Expected: each file contains `SIL OPEN FONT LICENSE`.

- [ ] **Step 6: Write `package.json` and `.gitignore`**

`package.json`:

```json
{
  "name": "tgru-website",
  "private": true,
  "version": "1.0.0",
  "scripts": {
    "test": "node --test tests/site.test.mjs",
    "test:visual": "playwright test"
  },
  "devDependencies": {
    "@playwright/test": "^1.64.1"
  }
}
```

`.gitignore`:

```text
node_modules/
test-results/
playwright-report/
```

- [ ] **Step 7: Verify the assets and install the test dependency**

```bash
file assets/avatar.jpg assets/favicon.png assets/fonts/*.woff2
npm install
npx playwright install chromium
```

Expected: `file` reports JPEG/PNG/WOFF2; `npm install` succeeds; Chromium downloads.

- [ ] **Step 8: Commit**

```bash
git add docs assets package.json package-lock.json .gitignore
git commit -m "chore: add assets, fonts, and design doc"
```

---

### Task 2: HTML structure and copy

**Files:**
- Modify: `index.html` (replace completely)
- Create: `tests/site.test.mjs`
- Modify: `style.css` (only to keep the file present; full design in Task 3)

**Interfaces:**
- Consumes: asset paths from Task 1.
- Produces: the landmarks and IDs `#projekte`, `#ueber`, `#kontakt`, `#main`, `.skip-link`, `.hero-copy`, `.profile-card`, `.project`, `.project-index`, `.project-body`, `.project-tags`, `.site-header`, `.site-nav`, `.site-footer`.

- [ ] **Step 1: Write the failing content and structure tests**

`tests/site.test.mjs`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const html = readFileSync(new URL('index.html', root), 'utf8');
const css = readFileSync(new URL('style.css', root), 'utf8');

test('document language, title, and description', () => {
  assert.match(html, /<html lang="de">/);
  assert.match(html, /<title>tgru — Frontend &amp; AI<\/title>/);
  assert.match(html, /name="description" content="Portfolio von tgru, Frontend- und AI-Entwickler im Studium\./);
  assert.match(html, /name="viewport"/);
});

test('hero carries the positioning and actions', () => {
  assert.match(html, /Frontend &amp; AI\./);
  assert.match(html, /Im Studium\./);
  assert.match(html, /Ich baue Interfaces und Apps, meist mit TypeScript, Swift oder Flutter/);
  assert.match(html, /href="#projekte"[^>]*>Projekte ansehen/);
  assert.match(html, /href="https:\/\/github\.com\/tgru-dev"/);
});

test('profile card uses the avatar and real metadata', () => {
  assert.match(html, /assets\/avatar\.jpg/);
  assert.match(html, /alt="Seepferdchen-Stempel, das Markenzeichen von tgru"/);
  assert.match(html, /Aktuell/);
  assert.match(html, /Studium/);
  assert.match(html, /TypeScript · Swift · Dart/);
});

test('three real projects link to their repositories', () => {
  assert.match(html, /href="https:\/\/github\.com\/tgru-dev\/getraenke-club"/);
  assert.match(html, /href="https:\/\/github\.com\/tgru-dev\/eu-flag-mapper"/);
  assert.match(html, /href="https:\/\/github\.com\/tgru-dev\/open_imposter"/);
  assert.match(html, /Getränke-Club/);
  assert.match(html, /EU Flag Mapper/);
  assert.match(html, /Open Imposter/);
});

test('old template content is gone', () => {
  for (const old of ['Peter Parker', 'Hire Me', 'Download CV', 'Welcome to', '8845f4']) {
    assert.equal(html.includes(old) || css.includes(old), false, `found old content: ${old}`);
  }
});

test('no runtime JavaScript', () => {
  assert.equal(/<script\b/i.test(html), false);
});

test('local assets and links exist', () => {
  const paths = [...html.matchAll(/(?:src|href)="([^"#]+)"/g)]
    .map((match) => match[1])
    .filter((path) => !path.startsWith('http') && !path.startsWith('mailto:'));
  for (const path of paths) {
    assert.ok(existsSync(fileURLToPath(new URL(path, root))), `missing local asset: ${path}`);
  }
});

test('self-hosted font files exist', () => {
  const urls = [...css.matchAll(/url\("([^"]+)"\)/g)].map((match) => match[1]);
  assert.ok(urls.length >= 4, 'expected four font URLs');
  for (const path of urls) {
    assert.ok(existsSync(fileURLToPath(new URL(path, root))), `missing font: ${path}`);
  }
});

test('CSS carries the approved system and safeguards', () => {
  for (const token of ['#f7f4ee', '#fdfbf7', '#efe9df', '#1f1b16', '#5e554a', '#7b7266', '#1e2a5a']) {
    assert.ok(css.includes(token), `missing token: ${token}`);
  }
  assert.match(css, /@font-face/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /@media \(max-width: 720px\)/);
  assert.doesNotMatch(css, /linear-gradient|radial-gradient|text-shadow|transition:\s*all/i);
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test`  
Expected: FAIL because `index.html` still contains the old template and `style.css` has no tokens.

- [ ] **Step 3: Replace `index.html` with the complete semantic page**

Use this structure and exact copy:

```html
<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>tgru — Frontend &amp; AI</title>
  <meta name="description" content="Portfolio von tgru, Frontend- und AI-Entwickler im Studium. Projekte, Links und Kontakt.">
  <meta name="theme-color" content="#f7f4ee">
  <link rel="icon" href="assets/favicon.png" type="image/png">
  <link rel="preload" href="assets/fonts/instrument-serif-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="assets/fonts/instrument-sans-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <a class="skip-link" href="#main">Zum Inhalt springen</a>

  <header class="site-header">
    <a class="wordmark" href="#main" aria-label="tgru — Startseite">tgru</a>
    <nav class="site-nav" aria-label="Hauptnavigation">
      <a href="#projekte">Projekte</a>
      <a href="#ueber">Über</a>
      <a href="#kontakt">Kontakt</a>
      <a class="nav-github" href="https://github.com/tgru-dev" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
    </nav>
  </header>

  <main id="main">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow">Visitenkarte / 2026</p>
        <h1 id="hero-title">Frontend &amp; AI.<br><span>Im Studium.</span></h1>
        <p class="hero-subline">Ich baue Interfaces und Apps, meist mit TypeScript, Swift oder Flutter.</p>
        <div class="hero-actions">
          <a class="button button-primary" href="#projekte">Projekte ansehen</a>
          <a class="button button-secondary" href="https://github.com/tgru-dev" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        </div>
      </div>

      <aside class="profile-card" aria-label="Kurzprofil">
        <p class="card-label">Feldnotiz 001</p>
        <div class="profile-head">
          <div class="stamp">
            <img src="assets/avatar.jpg" width="460" height="460" alt="Seepferdchen-Stempel, das Markenzeichen von tgru">
          </div>
          <div class="profile-identity">
            <p class="profile-name">tgru</p>
            <p class="profile-role">Frontend &amp; AI</p>
          </div>
        </div>
        <dl class="profile-meta">
          <div><dt>Aktuell</dt><dd>Studium</dd></div>
          <div><dt>Fokus</dt><dd>Frontend, AI</dd></div>
          <div><dt>Stack</dt><dd>TypeScript · Swift · Dart</dd></div>
        </dl>
      </aside>
    </section>

    <section class="section projects" id="projekte" aria-labelledby="projects-title">
      <div class="section-heading">
        <p class="eyebrow">01—03</p>
        <h2 id="projects-title">Ausgewählte Projekte</h2>
      </div>

      <div class="project-list">
        <a class="project" href="https://github.com/tgru-dev/getraenke-club" target="_blank" rel="noopener noreferrer">
          <span class="project-index">01</span>
          <span class="project-body">
            <h3>Getränke-Club <span class="project-arrow" aria-hidden="true">↗</span></h3>
            <p>Digitale Strichliste für den Jugendclub, gebaut mit React, Hono und Cloudflare D1 und offline-fähig als PWA</p>
            <span class="project-tags">TypeScript <span aria-hidden="true">·</span> PWA</span>
          </span>
        </a>

        <a class="project" href="https://github.com/tgru-dev/eu-flag-mapper" target="_blank" rel="noopener noreferrer">
          <span class="project-index">02</span>
          <span class="project-body">
            <h3>EU Flag Mapper <span class="project-arrow" aria-hidden="true">↗</span></h3>
            <p>Flutter-App zum Fotografieren und Mappen von EU-Flaggen mit Standort und Karte</p>
            <span class="project-tags">Flutter <span aria-hidden="true">·</span> Dart</span>
          </span>
        </a>

        <a class="project" href="https://github.com/tgru-dev/open_imposter" target="_blank" rel="noopener noreferrer">
          <span class="project-index">03</span>
          <span class="project-body">
            <h3>Open Imposter <span class="project-arrow" aria-hidden="true">↗</span></h3>
            <p>Eigene Umsetzung des Partyspiels Imposter, gebaut mit Flutter</p>
            <span class="project-tags">Flutter <span aria-hidden="true">·</span> Dart</span>
          </span>
        </a>
      </div>
    </section>

    <section class="section about" id="ueber" aria-labelledby="about-title">
      <div class="section-heading">
        <p class="eyebrow">Über</p>
        <h2 id="about-title">Kurz gesagt</h2>
      </div>
      <p class="about-copy">Ich bin tgru, Frontend- und AI-Entwickler im Studium. Ich baue Interfaces und Apps, meist mit TypeScript, Swift oder Flutter. Diese Seite ist meine Visitenkarte: drei Projekte, ein paar Links, sonst nichts.</p>
    </section>

    <section class="section contact" id="kontakt" aria-labelledby="contact-title">
      <div class="contact-panel">
        <div>
          <p class="eyebrow">Kontakt</p>
          <h2 id="contact-title">Du findest mich auf GitHub.</h2>
        </div>
        <a class="button button-primary" href="https://github.com/tgru-dev" target="_blank" rel="noopener noreferrer">github.com/tgru-dev <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <p>tgru <span aria-hidden="true">·</span> 2026</p>
    <a href="https://github.com/tgru-dev" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
  </footer>
</body>
</html>
```

- [ ] **Step 4: Run the tests to verify the content and structure pass**

Run: `npm test`  
Expected: all tests pass except the CSS test, which still needs Task 3.

- [ ] **Step 5: Commit**

```bash
git add index.html tests/site.test.mjs
git commit -m "feat: add portfolio markup and content"
```

---

### Task 3: CSS design system, layout, and responsive rules

**Files:**
- Modify: `style.css` (replace completely)
- Modify: `tests/site.test.mjs` (extend CSS assertions if needed)

**Interfaces:**
- Consumes: the class names and IDs from Task 2.
- Produces: the final visual system, responsive layout, focus styles, and reduced-motion behavior.

- [ ] **Step 1: Write the failing CSS assertions**

The CSS test in Task 2 already checks the palette, font faces, focus, breakpoints, and forbidden properties. Add these assertions before writing the stylesheet:

```js
test('CSS has the layout and motion contract', () => {
  assert.match(css, /\.hero\s*\{[^}]*grid-template-columns/s);
  assert.match(css, /\.profile-card\s*\{[^}]*animation:/s);
  assert.match(css, /@keyframes rise/);
  assert.match(css, /\.project\s*\{[^}]*grid-template-columns/s);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /outline:\s*2px solid var\(--accent\)/);
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test`  
Expected: FAIL with missing CSS tokens and layout rules.

- [ ] **Step 3: Replace `style.css` with the complete system**

Define and use these values exactly:

```css
@font-face {
  font-family: "Instrument Sans";
  src: url("assets/fonts/instrument-sans-latin.woff2") format("woff2");
  font-style: normal;
  font-weight: 400 700;
  font-display: swap;
}

@font-face {
  font-family: "Instrument Serif";
  src: url("assets/fonts/instrument-serif-latin.woff2") format("woff2");
  font-style: normal;
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: "IBM Plex Mono";
  src: url("assets/fonts/ibm-plex-mono-400-latin.woff2") format("woff2");
  font-style: normal;
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: "IBM Plex Mono";
  src: url("assets/fonts/ibm-plex-mono-500-latin.woff2") format("woff2");
  font-style: normal;
  font-weight: 500;
  font-display: swap;
}

:root {
  --paper: #f7f4ee;
  --card: #fdfbf7;
  --raised: #efe9df;
  --ink: #1f1b16;
  --secondary: #5e554a;
  --muted: #7b7266;
  --accent: #1e2a5a;
  --accent-hover: #16204a;
  --line: rgba(31, 27, 22, 0.08);
  --font-sans: "Instrument Sans", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Instrument Serif", ui-serif, Georgia, serif;
  --font-mono: "IBM Plex Mono", ui-monospace, SFMono-Regular, monospace;
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  --container: 1180px;
}
```

Required layout and behavior:

- `box-sizing: border-box` reset; `margin: 0`; `img { display: block; max-width: 100%; height: auto; }`.
- Body: paper background, ink text, `font-family: var(--font-sans)`, `font-size: 16px`, `line-height: 1.55`, `text-rendering: optimizeLegibility`.
- `.container`, `.site-header`, `.hero`, `.section`, `.site-footer` use `width: min(100% - 64px, var(--container)); margin-inline: auto;`; at 720px reduce to `width: min(100% - 40px, var(--container));`.
- `.site-header`: `display: flex; align-items: center; justify-content: space-between; min-height: 64px; border-bottom: 1px solid var(--line); gap: 24px;`.
- `.wordmark`: serif, 24px, ink, no underline.
- `.site-nav`: flex, gap 24px, 14px, secondary; hover ink; `.nav-github` has a hairline border, 8px radius, 8px 12px padding, 32–36px tall.
- `.hero`: `display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr); gap: 64px; align-items: center; padding: 96px 0 80px;`.
- `.hero h1`: serif, `font-size: clamp(3.25rem, 6.4vw, 4.5rem)`, `line-height: 1.02`, `letter-spacing: -0.03em`, weight 400; the `span` inside uses `color: var(--secondary)`.
- `.hero-subline`: 18–20px, secondary, `max-width: 36rem`.
- `.hero-actions`: flex, gap 12px, wrap.
- `.button`: inline-flex, align/justify center, min-height 48px, padding 0 20px, radius 8px, 15px/500, no underline; transition color/background/border/transform 150ms.
- `.button-primary`: accent background, paper text; hover `--accent-hover`; active `transform: scale(0.98)`.
- `.button-secondary`: raised background, ink text, 1px hairline; hover card background.
- `.profile-card`: card background, 1px hairline, radius 16px, padding 24px, `box-shadow: 0 8px 24px rgba(31, 27, 22, 0.06)`, `animation: rise 0.5s var(--ease) 0.06s both;`.
- `.card-label`, `.eyebrow`, `.project-index`, `.project-tags`, `.profile-meta dt`, `.site-footer`: `font-family: var(--font-mono)`, 12px, muted; `letter-spacing: 0.01em`; no uppercase transform.
- `.profile-head`: flex, gap 20px, align center.
- `.stamp`: 132px square, `border: 1px solid var(--accent)`, `padding: 8px`, background `#f2e9d8`, radius 4px; image fills it.
- `.profile-name`: serif, 32px, line-height 1.
- `.profile-role`: 14px, secondary, margin-top 4px.
- `.profile-meta`: margin-top 24px; each row flex, justify-between, gap 16px, padding 12px 0, border-top 1px hairline; `dt` muted, `dd` 14px ink, text-align right.
- `.section`: `padding: 80px 0; border-top: 1px solid var(--line);`.
- `.section-heading`: `display: grid; grid-template-columns: 0.35fr 0.65fr; gap: 48px; align-items: baseline; margin-bottom: 40px;`.
- `.section h2`: sans, `font-size: clamp(1.75rem, 3vw, 2.25rem)`, line-height 1.15, weight 500, letter-spacing -0.02em.
- `.project-list`: border-top 1px hairline.
- `.project`: `display: grid; grid-template-columns: 48px minmax(0, 1fr); gap: 24px; padding: 28px 0; border-bottom: 1px solid var(--line); text-decoration: none; color: inherit;`.
- `.project h3`: sans, 24–28px, weight 500, letter-spacing -0.01em; `.project-arrow` inline-block, 12px left margin, transition transform 150ms.
- `.project p`: 15px, secondary, max-width 52rem, margin-top 8px.
- `.project-tags`: display block, margin-top 12px, 12px mono, muted.
- `.project:hover h3`: accent; `.project:hover .project-arrow`: `transform: translate(2px, -2px)`; focus-visible ring.
- `.about`: uses `.section-heading`; `.about-copy` in the second column, max-width 40rem, 16px, secondary.
- `.contact-panel`: flex, justify-between, align center, gap 32px, padding 32px, card background, 1px hairline, radius 16px.
- `.contact h2`: max-width 24ch.
- `.site-footer`: flex, justify-between, gap 16px, padding 24px 0 40px, border-top 1px hairline, 12px mono, muted.
- `.skip-link`: absolutely positioned off-screen; on focus top 12px left 12px, accent background, paper text, padding 12px 16px, radius 8px, z-index 10.
- `:focus-visible`: `outline: 2px solid var(--accent); outline-offset: 3px;`.
- `::selection`: accent background, paper text.
- `@keyframes rise`: from `opacity: 0; transform: translateY(10px);` to `opacity: 1; transform: none;`.
- `.hero-copy { animation: rise 0.5s var(--ease) both; }`.
- `@media (prefers-reduced-motion: reduce)`: `html { scroll-behavior: auto; }`, `.hero-copy, .profile-card { animation: none; }`, `*, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }`.
- `@media (max-width: 900px)`: hero one column, gap 40px, padding 64px 0; profile card max-width 480px; h1 `clamp(2.75rem, 8vw, 3.5rem)`; section heading one column, gap 12px.
- `@media (max-width: 720px)`: container width `min(100% - 40px, var(--container))`; header wraps with nav full width; hero h1 `clamp(2.25rem, 10vw, 3rem)`; hero actions wrap; project grid `32px minmax(0, 1fr)`; project h3 22px; contact panel stacks; footer stacks; section padding 64px 0.
- `@media (max-width: 420px)`: hero actions column, buttons full width; profile head stacks? Keep stamp and identity side by side if it fits; stamp 104px; section padding 56px 0.

Forbidden: `linear-gradient`, `radial-gradient`, `text-shadow`, `transition: all`, `animate-pulse`, `hover:scale`, `position: fixed` except the skip link, and any color outside the palette.

- [ ] **Step 4: Run the tests to verify the CSS passes**

Run: `npm test`  
Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add style.css tests/site.test.mjs
git commit -m "feat: add paper-and-ink design system"
```

---

### Task 4: Visual, responsive, focus, and motion verification

**Files:**
- Create: `playwright.config.mjs`
- Create: `tests/visual.spec.mjs`
- Modify: `style.css` and/or `index.html` only for issues found.

**Interfaces:**
- Consumes: the final page from Tasks 2 and 3.
- Produces: verified screenshots at 1440, 768, 390, and 320px; no horizontal overflow; working skip link and focus ring; reduced-motion behavior.

- [ ] **Step 1: Write the failing visual tests**

`playwright.config.mjs`:

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'python3 -m http.server 4173',
    port: 4173,
    reuseExistingServer: true,
  },
});
```

`tests/visual.spec.mjs`:

```js
import { test, expect } from '@playwright/test';

const widths = [1440, 1024, 768, 390, 320];

test('no horizontal overflow at any target width', async ({ page }) => {
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `overflow at ${width}px`).toBeLessThanOrEqual(1);
  }
});

test('skip link is the first focusable element', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  await expect(page.locator('.skip-link')).toBeVisible();
});

test('hero and project content are visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Frontend & AI.');
  await expect(page.locator('.project')).toHaveCount(3);
  await expect(page.getByRole('link', { name: /github\.com\/tgru-dev/i }).first()).toBeVisible();
});

test('reduced motion disables the entrance animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const animation = await page.locator('.hero-copy').evaluate(
    (element) => getComputedStyle(element).animationName,
  );
  expect(animation).toBe('none');
});

test('capture desktop and mobile screenshots', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await page.screenshot({ path: 'test-results/desktop.png', fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.screenshot({ path: 'test-results/mobile.png', fullPage: true });
});
```

- [ ] **Step 2: Run the visual tests to verify they fail or expose layout issues**

Run: `npm run test:visual`  
Expected: FAIL or reveal overflow/focus issues before final polish.

- [ ] **Step 3: Fix only the issues the tests and screenshots show**

Use the screenshots in `test-results/desktop.png` and `test-results/mobile.png` to check:

- The hero reads as one composition, no dead empty band.
- The seahorse stamp is the one rich element; everything else is quiet.
- Project rows align on the index column; titles and descriptions wrap.
- The card does not overlap the headline at 900px or 390px.
- The contact panel is not cramped at 320px.
- The footer does not collide with the contact panel.

- [ ] **Step 4: Re-run all checks**

Run: `npm test && npm run test:visual`  
Expected: all pass. Inspect both screenshots manually.

- [ ] **Step 5: Commit**

```bash
git add playwright.config.mjs tests/visual.spec.mjs style.css index.html
git commit -m "test: verify responsive layout, focus, and reduced motion"
```

---

### Task 5: Final audit, README, and local preview

**Files:**
- Modify: `README.md`
- Modify: `index.html` and `style.css` only for audit fixes.
- Create: `test-results/` screenshots (ignored by git).

**Interfaces:**
- Consumes: the verified page from Task 4.
- Produces: a local preview ready for the user, a README with preview instructions, and a deployment decision.

- [ ] **Step 1: Run the content, CSS, and visual suites**

```bash
npm test
npm run test:visual
```

Expected: all pass.

- [ ] **Step 2: Validate HTML and check external links**

```bash
tidy -qe index.html
for url in \
  https://github.com/tgru-dev \
  https://github.com/tgru-dev/getraenke-club \
  https://github.com/tgru-dev/eu-flag-mapper \
  https://github.com/tgru-dev/open_imposter; do
  printf '%s ' "$url"
  curl -s -o /dev/null -w '%{http_code}\n' "$url"
done
```

Expected: no tidy errors that affect rendering; every URL returns 200.

- [ ] **Step 3: Check the unslop checklist**

- [ ] Direction is visible: paper, ink, seahorse stamp, mono field notes.
- [ ] Spacing is on the 4px scale; equal things have equal sizes.
- [ ] Icons, labels, and numbers align in columns.
- [ ] One neutral ramp, three text roles, one accent.
- [ ] No hue gradients, gradient text, glows, colored shadows, or blobs.
- [ ] No emoji in the interface.
- [ ] One icon set at one size and stroke (arrow glyphs only; no icon library).
- [ ] Type: Instrument Sans, Instrument Serif, IBM Plex Mono; weights 400–500; no uppercase tracked labels; no italic; no negative tracking on small text.
- [ ] No exclamation marks, no trailing periods on short strings, no greeting headline, no unverified claims.
- [ ] Numbers use tabular figures.
- [ ] Nested radii add up.
- [ ] The hero has a real visual: the seahorse stamp and the real profile metadata.
- [ ] The first screen is composed as a whole with no dead empty band.
- [ ] No looping or bouncy motion; one easing curve; no animated layout properties.
- [ ] Template check: swapping in another developer’s name would break the seahorse/profile-card idea; the copy is specific to tgru.

- [ ] **Step 4: Update `README.md`**

```markdown
# tgru — Portfolio

Persönliche Visitenkarte von tgru, Frontend- und AI-Entwickler im Studium.

## Lokal ansehen

```bash
python3 -m http.server 4173
```

Dann `http://127.0.0.1:4173` öffnen.

## Tests

```bash
npm install
npx playwright install chromium
npm test
npm run test:visual
```

## Gestaltung

Die Richtung folgt dem Unslop-Prozess von Damir Sokolovsky:
https://github.com/heydamir/unslop (CC BY 4.0).

## Deployment

GitHub Pages, Branch `main`, Root-Verzeichnis.
```

- [ ] **Step 5: Commit**

```bash
git add README.md index.html style.css
git commit -m "docs: add preview and test instructions"
```

- [ ] **Step 6: Stop and ask for deployment approval**

Show the user:

- The local preview URL: `http://127.0.0.1:4173`
- The screenshots: `test-results/desktop.png`, `test-results/mobile.png`
- A short summary of the audit and any calls made.

Do not push or merge to `main` until the user explicitly approves.

---

### Task 6: Deployment (blocked until explicit approval)

**Files:**
- No file changes.
- Git: merge `portfolio-redesign` into `main`, push.

**Interfaces:**
- Consumes: the approved local build from Task 5.
- Produces: the live site at `https://tgru-dev.github.io/website/`.

- [ ] **Step 1: Confirm approval**

Ask: “Soll ich die Seite jetzt auf `main` veröffentlichen?” Wait for a clear yes.

- [ ] **Step 2: Merge and push**

```bash
git checkout main
git merge --ff-only portfolio-redesign
git push origin main
```

- [ ] **Step 3: Wait for GitHub Pages and verify**

```bash
gh api repos/tgru-dev/website/pages --jq '.status, .html_url'
curl -sI https://tgru-dev.github.io/website/ | head -1
```

Expected: `built`; HTTP 200. Open the live URL and compare with the local screenshots.

- [ ] **Step 4: Report**

Report the live URL, the commit hash, and any remaining risk.
