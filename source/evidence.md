# Source evidence — wertkurs

**Import mode:** `normalized` — the wertkurs foundation was re-authored into the
Open Design shared token schema rather than copied verbatim.

## Provenance

- **System:** wertkurs Design System — brand of Matthias Schwarz, full-service
  financial advisor; Vertriebspartner der FiNUM.Finanzhaus AG.
- **DESIGN.md:** ported near-verbatim from the brand's **approved** `DESIGN.md`
  (project root), re-expressed in the Open Design package structure (prose +
  `tokens.css` bindings; no DS-side YAML front-matter — `manifest.json` carries
  that metadata here). Section set and wording follow the approved file:
  Overview, Colors, Typography, Components, Layout & spatial principles, Depth &
  elevation, Motion & interaction, Do's and Don'ts, Anti-Patterns — plus the
  Open-Design rich-profile sections (Iconography, Data viz, Editorial voice,
  Brand token extensions, Accessibility).
- **Primary token source:** the bundled `colors_and_type.css` foundation (colours,
  fluid type scale, 8px standard radius, 4px spacing, soft + sticker shadows,
  the Ming→Lotus and full-spectrum gradients) plus the system `README.md`
  (brand values, voice, visual foundations, iconography).
- **License:** proprietary brand assets. This package reproduces the *structure*
  (tokens + prose) in the Open Design format; brand imagery (Werner, founder
  emoticons, wordmark) is referenced, not redistributed here.

## Mapping decisions

- `--font-display` maps to **new-hero**, not new-astro: in wertkurs *all*
  headings use new-hero; new-astro is wordmark-only and is preserved as the
  C-extension `--font-logo`.
- `--accent` = **Ming #d962b7** (the default interactive accent). The signature
  **mint** becomes the C-extension `--accent-mint` (growth colour, white text).
- `--danger` = **Lotus #f25835**, which the brand already uses for
  costs/attention in charts.
- The four **B-slot** tokens are bound to independent values (not aliased),
  reflecting wertkurs' real neutral ramp.
- Spacing tokens follow the schema's fixed names/steps (4,8,12,16,20,24,32,48);
  the brand's larger 64/96/128 steps fold into `--section-y-*`.
- Dark theme uses the brand's deep-black canvas (#020202), never the
  trust-badge forest green.
## Coverage

All required A1-identity, A1-structure, A2 and B-slot tokens are declared — see
`token-contract.report.json` (result: PASS).
