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
  for (const old of ['Peter Parker', 'Hire Me', 'Download CV', 'Welcome to']) {
    assert.equal(html.includes(old), false, `found old content: ${old}`);
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
  assert.equal(urls.length, 4, 'expected four font URLs');
  for (const path of urls) {
    assert.ok(existsSync(fileURLToPath(new URL(path, root))), `missing font: ${path}`);
  }
});

test('CSS carries the approved system and safeguards', () => {
  for (const token of ['#f7f4ee', '#fdfbf7', '#efe9df', '#1f1b16', '#5e554a', '#7b7266', '#1e2a5a']) {
    assert.ok(css.includes(token), `missing token: ${token}`);
  }
  assert.equal((css.match(/@font-face/g) || []).length, 4);
  assert.equal((css.match(/font-display: swap/g) || []).length, 4);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /@media \(max-width: 900px\)/);
  assert.match(css, /@media \(max-width: 720px\)/);
  assert.match(css, /@media \(max-width: 420px\)/);
  assert.doesNotMatch(css, /linear-gradient|radial-gradient|text-shadow|transition:\s*all/i);
  assert.doesNotMatch(css, /#8845f4/i);
  assert.doesNotMatch(css, /position:\s*fixed/i);
});

test('CSS has the layout and motion contract', () => {
  assert.match(css, /\.hero\s*\{[^}]*grid-template-columns/s);
  assert.match(css, /\.profile-card\s*\{[^}]*animation:/s);
  assert.match(css, /@keyframes rise/);
  assert.match(css, /\.project\s*\{[^}]*grid-template-columns/s);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /outline:\s*2px solid var\(--accent\)/);
});
