# wertkurs

> Category: Finance & Fintech · „Finanzen. Verstanden. Geregelt."

The brand system of **wertkurs**, the practice of **Matthias Schwarz** — a self-employed
full-service financial & insurance advisor ("Full-Service Finanzberater") and distribution
partner of **FiNUM.Finanzhaus AG** (JDC Group network). The brand sells *financial advice for
everyone* and deliberately looks **less bank-like, less elitist and far more human** than a
classic financial-services provider, while staying structured, clear and trustworthy. It sits
visually between modern FinTech clarity, creator/startup energy, educational personal branding,
iconic 80s cassette-sleeve graphics and 16-bit retro pixel gaming.

This document is the canonical design prose for agents. Every decision named here is bound in
[`tokens.css`](tokens.css); the agent read order is in [`USAGE.md`](USAGE.md) and executable proof
of the tokens is in [`components.html`](components.html). It is a faithful port of the wertkurs
Design System's approved `DESIGN.md`, re-expressed in the Open Design package structure — if this
file names a colour, scale step or duration, the matching `tokens.css` binding expresses the same
decision.

## Overview

A clean, ultramodern design for financial advisors, but not bank-like or typical of the industry;
rather more fintech, yet definitely human and unconventional. Clean layout and typography combined
with bold color accents and 16-bit pixel-art motifs. Plenty of white space and a clear, left-aligned
hierarchy. The whole point is the collision of *clinical-clean UI* with *playful pixel imagery*: a
bright, witty, fundamentally kind advisor who treats you like a smart friend, hands you the remote
control over your own future, and does the paperwork for you.

## Colors

- **Primary / Mint** `--wk-mint` #8fd9b6 — the hero accent, growth, primary button fill; one or two
  fill colors per surface, never a rainbow.
- **Secondary / Ming** `--accent` / `--wk-ming` #d962b7 — wordmark & headline gradient start, the
  interactive accent.
- **Accent / Lotus** `--danger` / `--wk-lotus` #f25835 — gradient end (Ming → Lotus), costs/negatives.
- **Sun / Makara** `--wk-makara` #f2e96d & **Violet / Purple** `--wk-purple` #9d62d9 — restrained
  accents, spectrum members.
- **Surface** `--bg` #ffffff, **subtle** `--surface-warm` #f2f2f2, **mint** `--wk-mint` #8fd9b6 —
  light backgrounds.
- **Surface-dark** `--bg` (dark) #020202 — dark canvas and top nav; **forest** `--wk-forest` #1d402f
  is trust badges only.
- **On-surface** `--fg` #1b1b1b / **muted** `--fg-2` #4d4d4d / **on-dark** #ffffff — text;
  **border** `--border` #d9d9d9 hairlines.
- **Gradients** — `--gradient-brand` (Ming → Lotus) for the wordmark & few headlines;
  `--gradient-spectrum` situational only (hero, ads, social).

## Typography

- **new-hero — everything** (`--font-display` / `--font-body`): headings, body, eyebrows, numerals,
  UI labels; a clean neo-grotesque across weights 100–900.
- **Headlines**: UPPERCASE, heavy (700–800), near-zero `--tracking-display`, short and staccato with
  hard full-stops.
- **Body**: regular, sentence case, `--leading-body` ~1.6.
- **new-astro — wordmark "wertkurs" only** (`--font-logo`, lowercase); never on any other text.
- **IBM Plex Mono** (`--font-mono`): retro/tech labels and badges (DIN 77230, eyebrow micro-labels) only.

Two casing exceptions travel with the brand: the wordmark **"wertkurs" is always lowercase**, and the
cobrand is **always `FiNUM.`** (lowercase `i`, trailing period, divisions attach with no space —
`FiNUM.Finanzhaus`) and is never uppercased by the headline rule. Type steps are fluid:
`--text-xs`…`--text-4xl`, headings tightening to `--leading-tight` 1.04.

## Components

- **Buttons**: 8px radius (`--radius-sm`), never pill; UPPERCASE bold; primary = mint fill, white text
  (`--accent-mint-on`); the gradient fill (`--gradient-brand`) is situational. Secondary = ink outline
  on white.
- **Cards**: soft white, 8px, soft diffuse shadow (`--elev-raised`) — or a retro variant with hard ink
  outline + hard offset shadow, no blur (`--shadow-sticker`). Smaller cards on a flat single-color
  background instead carry a subtle thin grey hairline contour (`--border` #d9d9d9) rather than a
  shadow. Active/expanded states (e.g. an opened FAQ) can swap the hairline for a brand-gradient
  contour (Ming → Lotus).
- **Inputs / Forms**: 8px radius, 1.5px hairline border (#d9d9d9) on subtle surface (#f2f2f2); label
  above the field, helper/error text below (error in Lotus #f25835); focus ring in mint
  (`--focus-ring`) — no pill fields, no floating labels.
- **Icons**: Lucide (UI affordances) 24×24, 2px stroke, inline SVG + custom 16-bit pixel icons for
  finance topics.
- **Imagery**: transparent pixel cutouts (Werner, founder emoticons) or full-bleed pixel scenes, on
  solid color — missing assets are generated via the wertkurs Content Factory MCP.

## Layout & spatial principles

- **Left-aligned by default, asymmetric-friendly** — favour split-screen and offset whitespace over
  symmetric hero blocks; hierarchy through position and weight. Centering is fine where it serves
  (single statements, focused CTAs) — just not the reflexive default.
- **Generous whitespace** — the layout breathes; density stays low (gallery-to-app, not cockpit). One
  idea per band, wide margins, clear vertical rhythm (`--section-y-*` 128 → 64px).
- **Grid over math** — CSS Grid for structure; no `calc()` percentage hacks. Contain content with a
  max-width (`--container-max` ≈1200px), full-bleed only for pixel scenes and color bands.
- **No overlap** — every element owns its spatial zone; text never sits on text or on busy imagery.
- **Pixel cutouts are transparent for a reason** — Werner, the emoticons and pixel props are freed so
  they can sit *on top of* photos, pixel scenes and full-bleed color. Do NOT park a transparent cutout
  back on a plain solid box as if it were a framed sticker.
- **Color bands, not boxes** — separate sections with full-width mint / dark / forest bands and
  hairline borders rather than stacking bordered cards.
- **Section backgrounds** — alternate plain white with a faint light-grey surface (#f2f2f2) for rhythm;
  for extra variance, layer the brand grain texture over a band (subtle, low-opacity) rather than
  inventing new fills. Grain reads on light fields only.
- **Mobile-first collapse (<768px)** — all multi-column layouts drop to a single column, no horizontal
  scroll ever; headlines scale with `clamp()`, body ≥16px, tap targets ≥44px.

## Depth & elevation

- **Two shadow languages, never mixed in one element.** Soft: whisper-diffuse, surface-tinted shadows
  (`--elev-raised`) for the clean/fintech surfaces — elevation only where it signals real hierarchy.
  Retro: a hard ink outline + solid offset shadow with zero blur (`--shadow-sticker`) for the
  16-bit/pixel treatments. Colored brand glows (`--shadow-brand-mint`, `--shadow-brand-ming`) sit under
  hero imagery and primary buttons.
- **Prefer negative space and color bands over stacked elevation** — a mint/dark/forest band or a
  hairline divider separates sections better than piling up drop-shadowed cards.
- **No neon or outer-glow shadows**, and shadows are tinted toward the surface hue, never pure black.

## Motion & interaction

At wertkurs something is always subtly in motion — to keep the surface alive and to signal dynamism and
progress. Motion is generous but never frantic: spring-damped, purposeful, always in service of
comprehension. Baseline durations are `--motion-fast` 150ms / `--motion-base` 200ms on `--ease-standard`.

- **Micro-interactions (tactile):** Magnetic/sticky buttons — the cursor gently pulls the button, the
  label springs back on release; mint fill deepens on hover, never a neon glow. Icon tiles kick on
  hover (`rotate(-8deg) scale(1.06)`). Pixel emoticons (Werner & co.) blink or hop one frame on hover —
  stepped, not smooth, true to the 16-bit look (`--ease-bounce`).
- **Perpetual ambient loops:** Drifting blur-orbs and a slow grain pulse in dark bands; the spectrum
  gradient shifts across the wordmark / hero headline (the one place color is allowed to travel); trust
  & KPI cards float on offset delays; a marquee/ticker of partner houses or quotes as continuous forward
  motion.
- **Scroll choreography (dynamism & progress):** Reveal-on-scroll with staggered cascades for process
  steps and lists (never mount instantly); sticky-scroll stories where copy scrolls while a pinned pixel
  scene changes state; a thin spectrum progress line / flamingo tracking the scroll; gentle multi-speed
  parallax between pixel foreground cutouts and their scene; count-up of real numbers on entering the
  viewport.
- **Transitions:** Short spring-damped page wipes in mint/spectrum between routes; skeletal shimmer
  loaders matching layout dimensions — never a circular spinner.
- **Guardrails:** Animate only `transform` and `opacity`, never `top/left/width/height`. Always honour
  `prefers-reduced-motion` — Werner and the ambient loops hold still. Keep motion spring-damped and
  weighty, never jittery; the spectrum color-travel stays the exception, not a default on every element.

## Iconography & imagery

wertkurs has **no proprietary icon font**. UI affordance icons use **Lucide** (community successor to
Feather) — a 24×24, 2px-stroke inline-SVG set sized to `1em`, inheriting `currentColor`; ids are
kebab-case (`chevron-down`, `shield-check`, `trending-up`). The brand's *emotional* icons are the
pixel-art characters: **Werner**, the pink-flamingo mascot in a navy suit who lives on the mint field,
and the **founder emoticons** (Matthias' pixel face in ~16 expressions), used like reaction stickers.
The 16-bit language extends into pixel-icons-in-context, isometric scenes, theme characters (Easy Robi),
Werner's finance gaming world and Wimmelbilder. Imagery is transparent-cutout pixel art on solid colour —
not full-bleed photos. Missing assets are generated via the wertkurs Content Factory MCP, not forced from
an unrelated existing file. Brand/social logos use Simple Icons via CDN.

## Data visualization

Finance charts are clean fintech and **background-neutral**: transparent canvas, mid-grey axis labels
(`--muted` #808080), a low-alpha grey hairline grid — one config reads on white *and* deep-black. **Mint
(`--accent-mint`) is the hero/growth colour** (single series, "mit wertkurs"); **Lotus (`--danger`)**
marks costs/negatives; **neutral grey** is the comparison baseline ("ohne"); multi-series follows Mint →
Ming → Purple → Lotus → Makara — never a rainbow of solid fills. Tooltips are near-black #020202, titles
UPPERCASE new-hero, animation a quick `easeOutQuart`. KPI tiles and the comparison table are pure
HTML/CSS. No grain, no pixelation and no Werner/emoticons inside charts.

## Editorial voice & compliance

German, **Du-form** (never Sie); wertkurs speaks in first person ("ich übernehme den Papierkram"). Tone:
direct, understandable, empathetic, modern, competent — **explain instead of sell** (Edutainment).
Signature devices: three-word claims split by periods ("Finanzen. Verstanden. Geregelt."), colloquial
phrasing ("schmeißen wir raus", "an den Reglern schieben"), numbered step-by-step processes, and
micro-trust signals (DIN 77230, 100+ Produktgeber, transparent compensation). Emotional beats are carried
by the pixel faces and Werner, **not** by Unicode emoji.

> **Compliance — never "unabhängig".** As a Versicherungsmakler / tied distribution partner, the claim
> **"unabhängig"** is legally risky and must never appear — even where factually true. Use **"ungebunden"**
> or state the concrete fact ("freie Produktauswahl aus 100+ Häusern"). Write "wertkurs" lowercase and
> the cobrand as **`FiNUM.`** — never `FINUM`, `Finum` or without the dot.

## Do's and Don'ts

- Do keep headlines UPPERCASE and solid; gradient text is situational (hero, ads, social).
- Do write "wertkurs" lowercase and "FiNUM." with lowercase i + trailing period, no space before
  divisions (`FiNUM.Finanzhaus`).
- Do give the mint button white text and every control a `--focus-ring`.
- Don't use new-astro on anything but the wordmark.
- Don't use pill buttons, flooded rainbow fills, or gradient slop.
- Don't say "unabhängig" — use "ungebunden" or state the concrete fact.

## Brand token extensions

Beyond the shared schema, wertkurs declares **C-extension** tokens that other brands must not reference
(see the `--wk-*`, `--gradient-*`, `--accent-mint/warm/sun/violet`, `--font-logo`, `--shadow-sticker`,
`--shadow-brand-*`, `--ease-bounce` blocks in `tokens.css`). They carry the identity the generic slots
can't: the five-colour **spectrum** and its two gradients, the **mint** growth colour and its white-text
rule, the deep-forest trust green, the **sticker** shadow, the wordmark font and the playful bounce
easing. Keep prose and compiled values in sync.

## Accessibility

- Verify normal text at **4.5:1** and large text at **3:1** against the *actual* paired background — Ming
  `--accent` and Lotus `--danger` clear 3:1 but not 4.5:1, so keep them to large text, icons and fills,
  never small body copy. `--muted`/`--meta` are for large/decorative text only.
- Give every interactive control a visible `:focus-visible` treatment using `--focus-ring`.
- Preserve native semantics and keyboard behaviour; the UPPERCASE styling is presentational only — keep
  real sentence-case text content and `aria` labels intact.
- Scope `prefers-reduced-motion` overrides to the elements and properties that animate; Werner and the
  ambient loops hold still.

## Anti-Patterns (Banned)

- **No generic serif** and no swapping new-hero for Inter/Roboto/Arial — new-hero is the single typeface;
  new-astro only ever on the "wertkurs" wordmark.
- **No pure black (#000000)** as text or canvas — use ink #1b1b1b and surface-dark #020202.
- **No standard emoji** — emotional beats come from Werner and the founder emoticons only.
- **No AI-slop visuals** — no aggressive gradient backgrounds, no gradient text on every headline
  (gradient is situational), no neon/outer-glow shadows, no oversaturated fills.
- **No pill buttons**, no rounded-container-with-left-border-accent trope, no flooded rainbow surfaces
  (max 1–2 fill colors per surface); pill radius is avatars only.
- **No `LABEL // YEAR` typography**, no fabricated stats or fake round numbers — use real data or a clear
  `[metric]` placeholder.
- **No filler UI** — "scroll to explore", bouncing chevrons, scroll arrows are banned; content pulls the
  reader on its own.
- **No on-screen "VHS" effects** (scanlines, RGB glitch) as a default — the retro look is the *print
  sleeve* style, and never put literal tape jargon ("VHS", "HiFi", "Stereo") into output.
- **No "unabhängig"** claim (compliance) and no broken stock-image links — imagery is brand pixel art or
  generated via the Content Factory MCP.
