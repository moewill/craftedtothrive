# Brand System & Guidelines (v1.0)

> Purpose: a single source of truth for visual/verbal identity so humans and LLMs produce consistent, on-brand work.

**Applies to:** website, podcast cover & episodes, socials, email, slide decks, ads, thumbnails, docs.

---

## Table of Contents
1. Brand Core  
2. Visual Identity  
   2.1 Logos & Marks · 2.2 Color System · 2.3 Typography · 2.4 Iconography  
   2.5 Illustration · 2.6 Photography · 2.7 Shapes/Patterns · 2.8 Motion  
   2.9 Layout & Grids · 2.10 Elevation/Shadow  
3. Verbal Identity (Voice & Tone)  
4. Components & Templates (Social/Web/Email/Print/Podcast)  
5. Accessibility (WCAG 2.2 AA)  
6. Design Tokens (JSON, CSS variables, Tailwind)  
7. File Management & Exports  
8. Governance (Reviews, Versioning, Approvals)  
9. Do & Don’t Library  
10. QA Checklists & LLM Prompt Library  
11. Glossary

---

## 1) Brand Core

**Brand attributes (pick 3–5 and lock them):**  
`Confident · Warm · Practical · Modern · Trustworthy`  
**Mood keywords:**  
`Clean · High-contrast · Editorial · Spacious · Human`

**Voice pillars:** Clarity, Empathy, Action.  
**Tone by context:** Educational (blog), Energetic (social), Reassuring (support), Persuasive (landing).

> **LLM directive:** Always include the 3–5 attributes and mood keywords in prompt preambles when generating creative.

---

## 2) Visual Identity

### 2.1 Logos & Marks
- **Primary lockup:** Horizontal wordmark + symbol.  
- **Secondary:** Stacked wordmark; icon-only (square/circle safe-area).  
- **Clear space:** `>= 1×` cap height around all sides.  
- **Min sizes:** Wordmark 120px width (web); 24mm (print). Icon 24px (web).  
- **Color use:** Primary brand color on light; white/neutral-100 on dark.  
- **Misuse (never):** distort, rotate, add shadows/glows, recolor non-approved, place on low-contrast backgrounds, outline the wordmark.  
- **File formats:**  
  - Vector: SVG (web), PDF/EPS (print).  
  - Raster: PNG (transparent), JPG (photos), 1×/2×/3×.  
- **Favicon/App icons:** 16/32/48 px ICO; 180×180 Apple Touch; 512×512 maskable PNG.

### 2.2 Color System
**Usage ratios:** 60% neutrals · 30% primary · 10% accent. Ensure AA contrast.

**Core palette (replace with actual extracted values):**
- **Primary**  
  - `brand.primary.050` `#F5F7FF`  
  - `brand.primary.100` `#EAF0FF`  
  - `brand.primary.500` `#4A63FF` *(anchor)*  
  - `brand.primary.700` `#2C3BCC`  
  - `brand.primary.900` `#1A237A`
- **Accent**  
  - `brand.accent.500` `#FF6B3D`
- **Neutrals**  
  - `neutral.000` `#FFFFFF`  
  - `neutral.050` `#F7F7F8`  
  - `neutral.100` `#EFEFF1`  
  - `neutral.300` `#D5D7DB`  
  - `neutral.600` `#636773`  
  - `neutral.900` `#111318`
- **States**  
  - `success.500` `#16A34A` · `warning.500` `#F59E0B` · `danger.500` `#DC2626` · `info.500` `#0EA5E9`
- **Data viz**  
  - `chart.1` `#4A63FF` · `chart.2` `#FF6B3D` · `chart.3` `#10B981` · `chart.4` `#EAB308` · `chart.5` `#14B8A6`

**Rules**
- Backgrounds: `neutral.000/050`.  
- Text on light: `neutral.900`; on dark: `neutral.000`.  
- Links: `brand.primary.700` default, underline on hover/focus.  
- Never use accent colors for body text.

### 2.3 Typography
- **Primary typeface:** `Inter` (UI/Body). Fallback: `-apple-system, Segoe UI, Roboto, Arial, sans-serif`.  
- **Display typeface (optional):** `Clash Display` for H1/Hero only.  
- **Mono (code/metrics):** `JetBrains Mono`, fallback `monospace`.

**Type scale (Major Third ~1.25)**  
- H1 44/52, H2 32/40, H3 26/34, H4 22/30, H5 18/28, Body 16/26, Small 14/22, Micro 12/18.  
- Tracking: Headlines -1% to 0%, Body 0% to +1%.  
- Don’t center long paragraphs; 60–75 CPL (characters per line).

**Usage**
- Headlines: sentence case, bold (700).  
- Body: regular (400) or medium (500).  
- Emphasis: bold; avoid italics for long-form.  
- Numbers: tabular lining for data tables.

### 2.4 Iconography
- **Grid:** 24×24 px, live area 20×20, 2px padding.  
- **Stroke:** 1.75px; round caps/joins; corner radius 2px for shapes.  
- **Styles:** Outline default; Filled for active states only.  
- **Metaphors:** literal over clever.  
- **Export:** SVG with `stroke="currentColor"`.

### 2.5 Illustration
- Simplified geometric, limited palette (primary + accent + 2 neutrals).  
- Inclusive people, minimal facial detail.  
- Subtle shadows; neutral.050 backgrounds.  
- Layered for motion.

### 2.6 Photography
- Natural light, high contrast, slight warmth.  
- Rule of thirds; negative space for text.  
- Real, authentic subjects.  
- Subtle overlay tint for legibility.

### 2.7 Shapes & Patterns
- **Corner radius scale:** `r.xs=4`, `r.sm=8`, `r.md=12`, `r.lg=16`, `r.xl=24`, `r.2xl=32`.  
- **Card radius default:** `r.lg`.  
- Patterns: 2–4% tints, max 10% coverage.

### 2.8 Motion & Interaction
- Durations: 120–320ms.  
- Easings: `cubic-bezier(.2,.8,.2,1)` standard.  
- Respect `prefers-reduced-motion`.  
- Subtle microinteractions.

### 2.9 Layout & Grids
- **Spacing:** 8pt scale.  
- **Containers:** sm 640, md 768, lg 1024, xl 1280, 2xl 1440.  
- **Grid:** 12-col desktop, 8-col tablet, 4-col mobile.  
- **Line length:** ≤ 72ch.

### 2.10 Elevation & Shadows
- **Shadows:**  
  - Elev.0 none  
  - Elev.1 0 1px 2px rgba(0,0,0,.08)  
  - Elev.2 0 4px 10px rgba(0,0,0,.10)  
  - Elev.3 0 10px 24px rgba(0,0,0,.12)  
- **Focus ring:** dual-color visible.

---

## 3) Verbal Identity (Voice & Tone)

### 3.1 Voice
- **Clarity:** strong verbs, short sentences.  
- **Warmth:** speak to “you,” use contractions.  
- **Action:** always end with a next step.

### 3.2 Tone Matrix
- Landing pages: confident, minimal.  
- Docs: neutral, precise.  
- Social: energetic, light.  
- Support: empathetic, calming.

### 3.3 Editorial Rules
- Sentence case headings; Oxford comma; numerals for 10+.  
- Inclusive language.  
- Avoid buzzwords like “ninja,” “world-class.”

---

## 4) Components & Templates

### 4.1 Social & Podcast
- **Podcast cover:** 3000×3000, legible at 200×200.  
- **Episode art:** 1600×1600, color-coded by series.  
- **YouTube thumb:** 1280×720, ≤ 4 words.  
- **IG Post:** 1080×1350; **Story:** 1080×1920.  
- **Twitter/X:** 1600×900, alt text required.

### 4.2 Web
- Buttons: Primary (filled), Secondary (outline), Destructive (danger).  
- Forms: 44px height, error states red.  
- CTAs: top & bottom.

### 4.3 Email
- Width 600–700px, dark-mode safe, alt text, live text.

### 4.4 Print
- A4/US Letter, 6mm margins, CMYK 300 DPI.

---

## 5) Accessibility
- Contrast: text ≥ 4.5:1.  
- Focus visible.  
- Touch targets ≥ 44px.  
- Captions/transcripts required.  
- Alt text for all images.

---

## 6) Design Tokens

### 6.1 JSON
```json
{
  "brand": {
    "primary": { "050":"#F5F7FF","100":"#EAF0FF","500":"#4A63FF","700":"#2C3BCC","900":"#1A237A" },
    "accent":  { "500":"#FF6B3D" }
  },
  "neutral": { "000":"#FFFFFF","050":"#F7F7F8","100":"#EFEFF1","300":"#D5D7DB","600":"#636773","900":"#111318" },
  "state": { "success":"#16A34A","warning":"#F59E0B","danger":"#DC2626","info":"#0EA5E9" }
}
6.2 CSS
css
Copy code
:root {
  --brand-primary-500:#4A63FF;
  --brand-accent-500:#FF6B3D;
  --neutral-900:#111318;
}
6.3 Tailwind
js
Copy code
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: { primary: {500:'#4A63FF'}, accent: {500:'#FF6B3D'} },
        neutral: {900:'#111318'}
      }
    }
  }
}
7) File Management
Naming: Area_Component_Variant@2x.ext.

Folders: 00_Tokens · 01_Logos · 02_Typography · 03_Colors · 04_Icons · 05_Illustrations · 06_Photography · 07_Components · 08_Templates · 09_Exports.

8) Governance
Owners: design/content/dev leads.

RFC process for changes.

Versioning: vMAJOR.MINOR.PATCH.

Approvals: logo, color, type need lead sign-off.

9) Do & Don’t Library
Do: use spacing, consistent icons, high contrast.
Don’t: distort logo, misuse accent colors, center long text.

10) QA & LLM Prompts
10.1 QA Checklist
Contrast passes.

Logo clear space respected.

Alt text added.

10.2 LLM System Prompt
less
Copy code
You are a brand compliance assistant. Enforce Brand System v1.0.
- Visual: primary #4A63FF, accent #FF6B3D, neutrals 60/30/10.
- Typography: Inter body, Clash Display H1.
- Tone: confident, warm, practical.
- Accessibility: WCAG AA.
Reject outputs that violate tokens or spacing.
11) Glossary
Tokens: platform-agnostic values.

Live area: safe zone within icon grid.

CPL: characters per line (~60–75 ideal).

Implementation Notes
Extract palette from the PDF design.

Confirm typography in the PDF.

Capture icon/illustration style.

Build patterns from PDF shapes.

Insert real logos into section 2.1.


Muli (Regular, SemiBold, Italic, SemiBold Italic) → used for body and headers.

Crimson Pro (Regular, Bold, Italic, Bold Italic) → used for elegant serif text (probably body or pull quotes).

MoonTime (Regular) → script font for accents/titles.

Nunito Sans (Regular, SemiBold) → some secondary UI/body usage.
