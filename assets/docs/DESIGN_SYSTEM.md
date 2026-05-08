# Design System Guidelines

## Overview

The NACH Dashboard v6.5 uses a professional institutional design system with emphasis on clarity, accessibility, and enterprise-grade appearance.

## Color Palette

### Primary Colors

| Color | Hex | Usage | Notes |
|-------|-----|-------|-------|
| NPCI Blue | #2558e8 | Primary actions, links, accents | Brand color |
| Dark Blue | #1d4ed8 | Hover states, active elements | Darkened primary |

### Semantic Colors

| Status | Color | Hex | Usage |
|--------|-------|-----|-------|
| Success | Green | #0a7d3e | ✓ Successful operations, healthy status |
| Warning | Amber | #c67211 | ⚠ Warnings, degraded status |
| Critical | Red | #b0232e | ✕ Errors, critical issues |
| Info | Blue | #2558e8 | ℹ Information, AI insights |

### Neutral Scale

| Level | Hex | Usage |
|-------|-----|-------|
| Ink (Darkest) | #0a0f1e | Primary text, dark backgrounds |
| Text | #1e2238 | Body text, headings |
| Text Secondary | #4a4f6a | Secondary text, descriptions |
| Text Tertiary | #7a7f96 | Disabled text, captions |
| Muted | #a8acc0 | Placeholder text, borders |
| Rule | #dbdfe8 | Borders, dividers |
| Paper | #fafbfc | Light background, section bg |
| Card | #ffffff | Card/container background |

### Pale Variants (For Backgrounds)

- `--v6-ok-pale: #eef7f0` (Success background)
- `--v6-warn-pale: #fdf6ea` (Warning background)
- `--v6-crit-pale: #fcedef` (Critical background)
- `--v6-accent-pale: #eef2ff` (Blue background)

## Typography

### Font Families

```css
Display/Serif: 'Georgia', 'EB Garamond', serif
Body/Sans: 'Inter', 'Inter Tight', -apple-system, sans-serif
Mono/Code: 'JetBrains Mono', 'Consolas', monospace
```

### Font Sizes

| Tier | Size | Usage | Weight |
|------|------|-------|--------|
| Display | 22px | Page titles | 700 |
| H1 | 18px | Section heads | 700 |
| H2 | 15px | Card titles | 700 |
| Body | 12.5px | Regular text | 400-600 |
| Data | 11.5px | Numbers, metrics | 600-800 |
| Caption | 9px | Labels, tags | 700 |
| Eyebrow | 8.5px | Uppercase labels | 700-800 |

## Spacing Scale

```css
8px   : Single unit
12px  : --v6-gap (component gap)
14px  : --v6-pad (padding)
16px  : 
20px  : 
24px  : Card padding, section margin
32px  : Large spacing
40px  : Container margin
48px  : Page header margin
```

## Components

### Cards

```html
<div class="card">
  <div class="card-head">
    <div class="card-icon">📊</div>
    <div class="card-title">Title</div>
  </div>
  <div class="card-body">Content</div>
  <div class="card-footer">Footer</div>
</div>
```

**Variants**:
- `.card-accent.ok` - Green top accent
- `.card-accent.warn` - Amber top accent
- `.card-accent.crit` - Red top accent

### Buttons

```html
<!-- Primary Button -->
<button class="btn btn-primary">Action</button>

<!-- Secondary Button -->
<button class="btn">Secondary</button>

<!-- Ghost Button -->
<button class="btn btn-ghost">Ghost</button>

<!-- Sizes -->
<button class="btn btn-sm">Small</button>
<button class="btn btn-xs">Extra Small</button>

<!-- Critical Action -->
<button class="btn btn-crit">Destructive</button>
```

**States**:
- Default: Light border, dark text
- Hover: Accent color border and text
- Primary: Solid accent background, white text
- Focus: Accent weak background shadow

### Badges

```html
<span class="badge">Default</span>
<span class="badge ok">✓ Success</span>
<span class="badge warn">⚠ Warning</span>
<span class="badge crit">✕ Critical</span>
<span class="badge muted">Muted</span>
```

### Severity Indicators

```html
<!-- Dot Indicator -->
<div class="sev ok/warn/crit"></div>

<!-- With Pulsing Animation (Critical) -->
<div class="sev crit">
  <div style="animation: pulse 2s infinite;"></div>
</div>
```

### Tables

```html
<table>
  <thead>
    <tr>
      <th>Column</th>
      <th class="tc">Center Aligned</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Data</td>
    </tr>
  </tbody>
</table>
```

**Features**:
- Striped on hover
- Alternating row backgrounds (optional)
- Monospace numbers
- Right-aligned metrics

### Forms

```html
<div class="form-group">
  <label>Field Label</label>
  <input type="text" placeholder="Placeholder..." />
  <select></select>
  <textarea></textarea>
</div>
```

**States**:
- Default: Light border, dark text
- Focus: Accent border with weak accent background
- Disabled: Muted text, light background
- Error: Red border (add `.error` class)

## Grids & Layout

### Responsive Grids

```html
<!-- Auto-responsive (320px min) -->
<div class="grid"></div>

<!-- Fixed columns -->
<div class="grid-2">  <!-- 2 columns -->
<div class="grid-3">  <!-- 3 columns -->
<div class="grid-4">  <!-- 4 columns -->

<!-- Flexbox -->
<div class="flex items-center justify-between gap-2">
```

**Breakpoints**:
- Desktop: 1400px max container
- Tablet: 1200px and below (2 columns)
- Mobile: 768px and below (1 column)

## Utility Classes

```css
/* Text Alignment */
.text-center
.text-right

/* Text Colors */
.text-muted      /* Secondary text */
.text-error      /* Error/critical text */
.text-success    /* Success text */
.text-warning    /* Warning text */

/* Spacing */
.mt-0 .mt-1 .mt-2 .mt-3 .mt-4  /* Margin-top */
.mb-0 .mb-1 .mb-2 .mb-3 .mb-4  /* Margin-bottom */

/* Flexbox */
.flex                   /* Display flex */
.flex-col              /* Flex column */
.flex-1                /* Flex: 1 */
.items-center          /* Align items center */
.justify-center        /* Justify center */
.justify-between       /* Justify space-between */

/* Gaps */
.gap-1 .gap-2 .gap-3  /* Gap utilities */
```

## Animations

### Hover Transitions
- Default: 0.2s ease
- Button: 0.12s ease
- Smooth color transitions

### Card Hover
```css
transform: translateY(-2px);
box-shadow: elevated shadow;
border-color: accent;
```

### Status Pulse (Critical)
```css
animation: pulse 2s infinite;
/* Pulses opacity from 0.3 to full */
```

## Accessibility

### Color Contrast
- Text on background: 4.5:1 (WCAG AA)
- UI components: 3:1 (WCAG AA)
- All semantic colors testable with colorblind simulators

### Focus States
- Visible focus ring on all interactive elements
- Focus color: Accent with weak background
- Minimum 44x44px touch targets

### Semantic HTML
- Proper heading hierarchy (h1 > h2 > h3)
- Form labels with `<label>` tags
- Table with `<thead>` and `<tbody>`
- ARIA attributes where needed

## Dark Mode Preparation

CSS variables are structured for easy dark mode:

```css
/* Light mode (default) */
--v6-paper: #fafbfc;
--v6-card: #ffffff;
--v6-text: #1e2238;

/* Dark mode (ready) */
@media (prefers-color-scheme: dark) {
  :root {
    --v6-paper: #1a1f2e;
    --v6-card: #242d3d;
    --v6-text: #e4e9f3;
  }
}
```

## Responsive Best Practices

1. **Mobile First**: Design for mobile, enhance for desktop
2. **Touch Targets**: Minimum 44x44px (11mm)
3. **Legibility**: Minimum 12px font on mobile
4. **Layout Shift**: Fixed heights for interactive elements
5. **Safe Areas**: Respect device safe areas on notched devices

## Performance Guidelines

1. **CSS Organization**: Variables → Defaults → Components → Utilities
2. **Minimize Reflows**: Use transform over layout properties
3. **Lazy Load Images**: Add loading="lazy" attribute
4. **Critical CSS**: Inline above-fold styles
5. **Font Loading**: Use font-display: swap

## Brand Voice

- **Formal, Professional**: Suited for enterprise/banking
- **Clear, Concise**: Avoid jargon where possible
- **Data-Driven**: Show metrics and facts
- **Action-Oriented**: Clear CTAs and next steps
- **Trustworthy**: Security and compliance focused

## Example Implementations

### Success Alert
```html
<div class="card" style="background: var(--v6-ok-pale); border-color: var(--v6-ok);">
  <div class="card-head" style="border-bottom-color: var(--v6-ok);">
    <div class="card-icon">✓</div>
    <div class="card-title">Success</div>
  </div>
  <div class="card-body">Operation completed successfully</div>
</div>
```

### Metric Card
```html
<div class="card">
  <div class="card-body">
    <div style="font-size: 18px; color: var(--v6-muted);">Transaction Volume</div>
    <div style="font-family: 'JetBrains Mono'; font-size: 28px; font-weight: 800; color: var(--v6-accent); margin: 12px 0;">2.8M</div>
    <div style="font-size: 11px; color: var(--v6-text-3);">↑ 12.5% from yesterday</div>
  </div>
</div>
```

---

**Last Updated**: May 2026  
**Status**: Complete  
**Version**: 6.5
