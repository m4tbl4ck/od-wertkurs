# USAGE.md — wertkurs

Agent-facing router for the wertkurs Open Design package. Read this first, then pull only what the task needs.

## Read Order

1. **`manifest.json`** — package identity, category (`Finance & Fintech`), declared files and provenance.
2. **`tokens.css`** — the canonical token contract. Paste its `:root` block into your artifact's `<style>` (there is no runtime cascade). It carries the shared schema tokens **and** the `--wk-*` / `--gradient-*` / `--accent-mint` brand extensions.
3. **`DESIGN.md`** — the full design prose: theme, colour roles, typography, spacing, components, motion, iconography, data-viz, editorial voice, accessibility and anti-patterns. Sync every value you use back to `tokens.css`.
4. **`components.html`** — executable proof: buttons, inputs, cards, tags, nav, table, alert built only from declared tokens, with focus and reduced-motion behaviour. Copy patterns from here rather than reinventing them.
5. **`preview/`** — `colors.html`, `typography.html`, `spacing.html` for quick visual reference.
6. **Derived caches** (do not hand-edit): `design-tokens.json` (W3C Design Tokens), `tailwind-v4.css` (`@theme` mapping), `components.manifest.json` (selector/token index). Regenerate from `tokens.css` + `components.html`.
7. **`source/`** — provenance evidence and the token-contract report backing the normalized import.

Fonts: add `<link rel="stylesheet" href="https://use.typekit.net/pdd3dqx.css">` for **new-hero** / **new-astro**; IBM Plex Mono is declared inline in `tokens.css`. Icons: load Lucide once (`https://unpkg.com/lucide@0.544.0/dist/umd/lucide.min.js`) and call `lucide.createIcons()` after injecting markup.

## Design Highlights

- **Identity = mint field + Ming→Lotus wordmark gradient.** `--wk-mint` is the signature surface; `--accent` (Ming) is the interactive accent; the spectrum appears only as thin accents.
- **UPPERCASE, staccato headings** in **New Hero** (all levels). New Astro (`--font-logo`) is wordmark-only. Wordmark **"wertkurs"** stays lowercase; cobrand is always **`FiNUM.`**.
- **Angular 8px everything** (`--radius-sm`), including buttons. Pill radius is avatars only.
- **Two shadow systems:** soft `--elev-raised` for clean UI, hard `--shadow-sticker` for retro/pixel.
- **Human, edutainment voice** (German Du-form); emotion carried by Werner + pixel emoticons, not emoji.
- **Background-neutral charts** with mint = growth, Lotus = cost, grey = baseline.

## Do

- Paste the whole `tokens.css` `:root` and reference values via `var(--…)`; use the semantic slots (`--fg`, `--surface`, `--accent`) over raw hex.
- Keep to **one or two background colours per surface** (white + mint, or white + `#020202`).
- Set headings UPPERCASE with `--tracking-display`; keep body sentence case at `--leading-body`.
- Give the mint button **white** text (`--accent-mint-on`); give every control a `--focus-ring`.
- Use Lucide for UI icons; use Werner / founder emoticons for emotional beats.
- Honour `prefers-reduced-motion`; use `--motion-fast`/`--motion-base` on `--ease-standard`.
- Write German, Du-form, three-word period-split claims; sprinkle concrete trust signals (DIN 77230, 100+ Produktgeber).

## Avoid

- New Astro for anything but the wordmark; pill-radius buttons; a rainbow of fills.
- Forest green (`--wk-forest`) as a general dark section — trust badges only; dark canvas is `#020202`.
- Grain on saturated/dark fills; on-screen VHS effects (scanlines/RGB glitch) as a default; any literal tape jargon.
- Ming/Lotus or `--muted`/`--meta` as small body text (they clear 3:1, not 4.5:1).
- Unicode emoji in polished copy.
- The word **"unabhängig"**; and any of `FINUM` / `Finum` / `FiNUM` written without the trailing dot.
