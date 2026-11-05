# tgru — Portfolio

Persönliche Visitenkarte von tgru, Frontend- und AI-Entwickler im Studium.
Statisches HTML und CSS, kein Build-Schritt und kein JavaScript zur Laufzeit.

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

`npm test` prüft Inhalt, Struktur und CSS-Invarianten, `npm run test:visual`
prüft Layout, Fokus und reduzierte Bewegung in Chromium.

## Gestaltung

Die Richtung folgt dem Unslop-Prozess von Damir Sokolovsky:
https://github.com/heydamir/unslop (CC BY 4.0).

## Deployment

GitHub Pages, Branch `main`, Root-Verzeichnis.
