import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const html = readFileSync(new URL('index.html', root), 'utf8');

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
