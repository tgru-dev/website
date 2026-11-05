# tgru — Portfolio-Visitenkarte

Datum: 2026-11-05  
Status: Entwurf, wartet auf Freigabe

## Intent

Eine persönliche One-Page-Visitenkarte für **tgru**, Frontend- und AI-Entwickler im Studium. Besucher sollen in wenigen Sekunden verstehen, wer er ist, was er baut und wo sie die Projekte finden. Die Seite ersetzt die alte Vorlage unter `https://tgru-dev.github.io/website/`.

## Warum

Die alte Seite ist eine unveränderte Programming-Hero-Vorlage: „Welcome to Tim's page“, „Hire Me“ und „Download CV“ ohne Ziel, erfundene Erfahrung („master of HTML, CSS and Javascript“, „100% web solution“) und ein Peter-Parker-Footer. Sie zeigt weder die echte Person noch die echten Projekte. Eine Visitenkarte soll Vertrauen schaffen, nicht wie ein fremdes Template aussehen.

## Zielgruppe

Menschen, die den Link bekommen: Kommilitonen, potenzielle Arbeitgeber und Leute aus der Community. Sie wollen schnell einschätzen, ob tgru interessant ist, und dann auf GitHub oder in die Projekte klicken.

## Ziele

- In fünf Sekunden klar: tgru, Frontend & AI, im Studium.
- Drei echte Projekte mit ehrlicher Beschreibung und Link.
- Ein klarer Kontaktweg über GitHub.
- Schnell, responsiv und barrierearm, ohne Build-Schritt.
- Ein eigenständiges Aussehen, das nicht wie ein AI-Template wirkt.

## Non-Goals

- Kein Lebenslauf, kein Blog, keine Fallstudien.
- Kein Kontaktformular-Backend, keine Analytics, keine Cookies.
- Keine erfundenen Zahlen, Kundenstimmen, Verfügbarkeiten oder Titel.
- Keine Bildgenerierung; das vorhandene Avatar ist das visuelle Motiv.
- Keine Mehrsprachigkeit; Deutsch mit englischen Fachbegriffen.

## Anti-Goals

- Lila-Blau-Verlauf, Glow, Gradient-Text, Emoji-Labels.
- Zentrierter Template-Hero mit zwei Buttons und drei Feature-Karten.
- „Hire Me“ oder „Download CV“, wenn es kein konkretes Angebot gibt.
- Fake-Metriken wie „10x faster“ oder „Loved by 10,000+“.

## Bestehender Stand

- Repo: `tgru-dev/website`, Branch `main`, GitHub Pages aktiv.
- Live: `https://tgru-dev.github.io/website/`
- Dateien: `index.html`, `style.css`, `README.md`
- Audit der alten Seite:
  - Lila Akzent `#8845f4`, keine echte Markenfarbe.
  - Begrüßungs-Headline „Welcome to Tim's page“.
  - Erfundene Erfahrung und Superlative.
  - Zwei Buttons ohne Ziel (`href="#"`).
  - Peter-Parker-Footer aus einer fremden Vorlage.
  - Float-Layout, generische Systemschrift, uneinheitliche Abstände.
  - Keine echten Projekte, keine echte Kontaktmöglichkeit.

## Ansatz

**A — Statische One-Page (gewählt)**  
`index.html` + `style.css` + minimales JavaScript, kein Build-Schritt. Direkt auf GitHub Pages, sehr schnell, für eine Visitenkarte genau richtig.

**B — Astro**  
Wäre sinnvoll, wenn später Blog oder Projektseiten wachsen. Für diese eine Seite zusätzliches Build-Setup ohne echten Nutzen.

**C — Next.js/React**  
Zu viel für eine Visitenkarte: Build, Hosting und Wartung stehen in keinem Verhältnis zum Ergebnis.

## Gestaltungsrichtung

Nach dem Unslop-Prozess:

- **Product:** tgru, Frontend- und AI-Entwickler, aktuell im Studium.
- **Character:** ruhig, präzise, neugierig — nicht „modern“, „clean“ oder „premium“.
- **World:** Papier, Tinte und Werkbank. Das Avatar ist ein gestochener Seepferdchen-Stempel auf Creme; daraus kommen Papierfläche, Tintenfarbe und die ruhige, handgemachte Note.
- **Moments:** Die Hero-Karte mit dem Seepferdchen-Stempel und echten Metadaten; die Projektliste als nummerierter Index.
- **Signature:** Der Seepferdchen-Stempel plus kleine Mono-Labels wie Feldnotizen. Nur an diesen Stellen.

### Palette

- Papier / Seite: `#f7f4ee`
- Karte: `#fdfbf7`
- Erhabene Fläche: `#efe9df`
- Primärtext: `#1f1b16`
- Sekundärtext: `#5e554a`
- Gedämpft: `#7b7266`
- Akzent / Tinte: `#1e2a5a`
- Haarlinie: Primärtext bei 8 %

Der Akzent bleibt selten: Primäraktion, Fokusring, ein Detail. Kein Verlauf, kein Glow.

### Typografie

- Interface: **Instrument Sans**
- Name und große Headline: **Instrument Serif**
- Meta, Nummern, Stack: **IBM Plex Mono**

Schriftgrößen und Abstände folgen der Unslop-Skala (4px-Raster, Hero 56–72px desktop / 36–44px mobil, Fließtext 15–16px).

### Motion

- Ein kurzer Auftritt der Hauptinhalte, 6–12px Rise, 300–500ms.
- Hover: schnelle Farb-/Flächenänderung, 120–180ms.
- Eine Easing-Kurve: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Keine Loops, kein Parallax, kein `transition-all`; `prefers-reduced-motion` wird respektiert.

## Aufbau

```
┌──────────────────────────────────────────────────────────────┐
│ tgru              Projekte   Über   Kontakt        GitHub →  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Frontend & AI.              ┌────────────────────────────┐  │
│  Im Studium.                 │        [Seepferdchen]      │  │
│                              │                            │  │
│  Ich baue Interfaces und     │  tgru                      │  │
│  Apps, meist mit TypeScript, │  Frontend & AI             │  │
│  Swift oder Flutter.         │  Aktuell: Studium          │  │
│                              │  Stack: TS · Swift · Dart  │  │
│  [Projekte ansehen] [GitHub] └────────────────────────────┘  │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ Ausgewählte Projekte                                         │
│                                                              │
│ 01  Getränke-Club      Digitale Strichliste …      TypeScript│
│ 02  EU Flag Mapper     Flutter-App …               Flutter   │
│ 03  Open Imposter      Partyspiel …                Dart      │
├──────────────────────────────────────────────────────────────┤
│ Über                                                         │
│ Kurzer Absatz, keine Superlative.                            │
├──────────────────────────────────────────────────────────────┤
│ Kontakt                                                      │
│ GitHub →                                                     │
├──────────────────────────────────────────────────────────────┤
│ tgru · 2026                              GitHub ↗            │
└──────────────────────────────────────────────────────────────┘
```

## Inhalte

### Hero

- Headline: **Frontend & AI. Im Studium.**
- Subline: „Ich baue Interfaces und Apps, meist mit TypeScript, Swift oder Flutter.“
- Primäraktion: „Projekte ansehen“
- Sekundäraktion: „GitHub“

### Hero-Karte

- Seepferdchen-Avatar als Stempel
- `tgru`
- `Frontend & AI`
- `Aktuell: Studium`
- `Stack: TypeScript · Swift · Dart`

### Projekte

1. **Getränke-Club** — „Digitale Strichliste für den Jugendclub. React, Hono und Cloudflare D1, offline-fähig als PWA.“ — `TypeScript`
2. **EU Flag Mapper** — „Flutter-App zum Fotografieren und Mappen von EU-Flaggen mit Standort und Karte.“ — `Flutter`
3. **Open Imposter** — „Eigene Umsetzung des Partyspiels Imposter, gebaut mit Flutter.“ — `Dart`

Jede Zeile verlinkt auf das jeweilige Repository. Keine Screenshots, keine erfundenen Vorschaubilder.

### Über

„Ich bin tgru, Frontend- und AI-Entwickler im Studium. Ich baue Interfaces und Apps, meist mit TypeScript, Swift oder Flutter. Diese Seite ist meine Visitenkarte: drei Projekte, ein paar Links, sonst nichts.“

### Kontakt

- GitHub: `https://github.com/tgru-dev`
- Keine E-Mail erfinden. Eine Adresse kann später ergänzt werden.

## Technik

- Dateien: `index.html`, `style.css`, `assets/` (kein JavaScript nötig)
- Semantisches HTML, CSS Custom Properties, kein Framework.
- Responsive Breakpoints bei 720px und 1024px.
- Accessibility: Skip-Link, sichtbarer Fokusring, Kontrast mindestens 4.5:1, `prefers-reduced-motion`.
- Performance: selbst gehostete Fonts, komprimiertes Avatar, kein externes JavaScript.
- Deployment: bestehendes `website`-Repo ersetzen, GitHub Pages bleibt aktiv. Veröffentlichung erst nach separater Freigabe.

## Annahmen

- Der Name auf der Seite ist **tgru**, wie gewünscht. Die alte Seite nennt „Tim“; der Name wird nicht übernommen, außer du sagst es.
- Kontakt läuft über GitHub, weil keine E-Mail genannt wurde.
- Die drei angepinnten Repos sind die Projektauswahl.
- Das Seepferdchen-Avatar darf als Marke verwendet werden.

## Freigabe

Bitte bestätige diese Fassung oder nenne die Punkte, die anders sollen. Danach schreibe ich den Umsetzungsplan und baue die Seite lokal. Veröffentlicht wird sie erst nach deiner separaten Freigabe.
