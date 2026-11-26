# CSS Architecture - Component-Based Organization

This project uses a **component-based CSS structure** where each component has its own CSS file containing all styles (desktop, responsive, variants) related to that component.

## 📋 Structure Overview

```
Your Component (TypeScript)              →    CSS File
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
src/components/demo/DemoHeader.tsx       →    styles/DemoHeader.css
src/components/demo/DemoFooter.tsx       →    styles/DemoFooter.css
src/components/demo/DemoHero.tsx         →    styles/DemoHero.css
src/components/demo/ImageText.tsx        →    styles/ImageText.css
src/components/demo/FullWidthStage.tsx   →    styles/FullWidthStage.css
src/components/demo/FullWidthTeaser.tsx  →    styles/FullWidthTeaser.css
src/components/demo/NewsCard.tsx         →    styles/NewsCard.css
src/components/demo/Quote.tsx            →    styles/Quote.css
src/components/demo/TwoColumnStage.tsx   →    styles/TwoColumnStage.css
src/components/demo/BackgroundWrapper.tsx→    styles/BackgroundWrapper.css
```

**Simple Rule**: One component = One CSS file. Everything for that component (desktop, tablet, mobile) is in that file.

## 📁 Directory Contents

### Core Files

- **variables.css** - All design tokens (colors, typography, layout constants)
- **base.css** - Global resets and element defaults

### Component CSS Files (Alphabetical)

- **BackgroundWrapper.css** - Background color wrapper utility
- **DemoFooter.css** - Site footer with columns and links
- **DemoHeader.css** - Site header with navigation
- **DemoHero.css** - Hero banner with image and copy
- **FullWidthStage.css** - Full-width section with overlapping content box
- **FullWidthTeaser.css** - Full-width teaser with image overlay
- **ImageText.css** - Feature list (image + text in 2-column layout)
- **NewsCard.css** - News card variants (full-width and half-width)
- **Quote.css** - Quote/testimonial component
- **TwoColumnStage.css** - Two-column layout (content + image)

## 🎨 Design Tokens (variables.css)

All design decisions defined once as CSS custom properties:

```css
/* Colors - Palette */
--navy: #062e62
--blue: #0050ff
--ink: #17385f
--muted: #526882
--pale: #f3f4f6
--white: #fff
--text-light: #f3f3f3

/* Colors - Semantic (use these in components) */
--color-text-primary: var(--ink)
--color-text-secondary: var(--muted)
--color-link: var(--blue)
--color-bg-primary: var(--navy)
--color-bg-secondary: var(--pale)

/* Typography */
--font-family-base: Inter, Arial, sans-serif
--font-size-xs: 10px through --font-size-5xl: 48px
--font-weight-normal: 400 through --font-weight-bold: 700

/* Layout */
--content-width: 1232px
```

**Why semantic colors?** Easy theme switching - change `--color-text-primary` once and all text updates automatically.

## 📝 Component CSS File Structure

Every component CSS follows this pattern:

```css
/* ============================================================================
   COMPONENT NAME
   ============================================================================ */

/* Desktop/Default Styles */
.component-name {
  property: value;
}

.component-name__element {
  property: value;
}

.component-name--variant {
  property: value;
}

/* Tablet Responsive (@media max-width: 767px) */
@media (max-width: 767px) {
  .component-name { ... }
}

/* Mobile Responsive (@media max-width: 640px) */
@media (max-width: 640px) {
  .component-name { ... }
}
```

**Key Point**: All styles for DemoHeader are in DemoHeader.css (desktop + mobile). No splitting.

## 🔗 How They're Connected (globals.css)

The main `src/app/globals.css` file imports all component CSS in this order:

```css
@import "./styles/variables.css";   /* 1. Design tokens (required first) */
@import "./styles/base.css";        /* 2. Global resets */
@import "./styles/DemoHeader.css";  /* 3-12. Components (alphabetical) */
@import "./styles/DemoFooter.css";
@import "./styles/DemoHero.css";
/* ... etc ... */
```

**Import order matters**:
1. variables.css must be first (all files depend on it)
2. base.css second (applies to all elements)
3. Component files alphabetically (order doesn't affect styling, but easier to maintain)

## 💡 Best Practices

### ✅ DO

1. **Keep all component styles together**
   ```css
   /* ✓ Good - everything in one file */
   /* DemoHeader.css contains ALL header styles */
   .site-header { ... }
   .site-header--standalone { ... }
   @media (max-width: 640px) {
     .site-header { ... }
   }
   ```

2. **Use CSS variables everywhere**
   ```css
   /* ✓ Good */
   color: var(--color-text-primary);
   font-size: var(--font-size-base);
   
   /* ✗ Bad */
   color: #17385f;
   font-size: 16px;
   ```

3. **Use semantic class names (BEM style)**
   ```css
   .news-card                    /* Block - main component */
   .news-card__title             /* Element - child part */
   .news-card--full-width        /* Modifier - variant */
   ```

4. **Include responsive rules in the same file**
   ```css
   /* Desktop in DemoHeader.css */
   .site-header { padding: 16px; }
   
   /* Mobile also in DemoHeader.css */
   @media (max-width: 640px) {
     .site-header { padding: 14px; }
   }
   ```

### ❌ DON'T

1. **Don't split one component across multiple files**
   - Bad: DemoHeader.css + DemoHeader-mobile.css
   - Good: DemoHeader.css (includes mobile rules)

2. **Don't hardcode color or font values**
   - Bad: `color: #062e62;`
   - Good: `color: var(--color-bg-primary);`

3. **Don't create separate responsive.css**
   - Bad: Keep responsive in responsive.css
   - Good: Keep responsive in component's CSS file

4. **Don't forget to include mobile styles**
   - Bad: Only desktop styles
   - Good: Desktop + all responsive breakpoints

5. **Don't duplicate styles**
   - Bad: Same style in multiple component files
   - Good: Use CSS variables to centralize

## 🆕 Adding a New Component

**Step 1**: Create component TypeScript file
```bash
src/components/demo/MyNewComponent.tsx
```

**Step 2**: Create matching CSS file
```bash
src/app/styles/MyNewComponent.css
```

**Step 3**: Write CSS with all responsive rules
```css
/* ============================================================================
   MY NEW COMPONENT
   ============================================================================ */

.my-new-component {
  color: var(--color-text-primary);
  font-size: var(--font-size-base);
}

@media (max-width: 640px) {
  .my-new-component {
    font-size: var(--font-size-sm);
  }
}
```

**Step 4**: Import in globals.css (alphabetically)
```css
@import "./styles/MyNewComponent.css";  /* After "base.css", before other components */
```

## 📏 Responsive Breakpoints

Three main breakpoints used throughout:

| Breakpoint | Width | Usage |
|-----------|-------|-------|
| Tablet | 767px and below | Adjust spacing, adjust fonts |
| Mobile | 640px and below | Stack columns, reduce padding |
| Tiny | 360px and below | Extra adjustments for very small phones |

## 🎯 Common CSS Variables to Use

```css
/* Use these in your component CSS */

/* Colors */
var(--color-text-primary)      /* Main text (#17385f) */
var(--color-text-secondary)    /* Secondary text (#526882) */
var(--color-link)              /* Links/buttons (#0050ff) */
var(--color-bg-primary)        /* Dark background (#062e62) */
var(--color-bg-secondary)      /* Light background (#f3f4f6) */

/* Typography */
var(--font-size-sm)            /* 12px */
var(--font-size-base)          /* 16px */
var(--font-size-md)            /* 20px */
var(--font-size-lg)            /* 24px */
var(--font-size-5xl)           /* 48px - hero titles */

var(--font-weight-normal)      /* 400 */
var(--font-weight-bold)        /* 700 */

/* Layout */
var(--content-width)           /* 1232px */
var(--font-family-base)        /* Inter, Arial, sans-serif */
```

## 🛠️ Common Tasks

### Finding styles for a component
1. Find component in `src/components/demo/`
2. Look for matching name in `src/app/styles/`
3. Example: `DemoHeader.tsx` → `DemoHeader.css`

### Modifying a component's style
1. Open its CSS file: `src/app/styles/ComponentName.css`
2. Find the class you want to change
3. Update desktop styles first, then responsive rules
4. Save and hot-reload in browser

### Changing a global color
1. Edit `src/app/styles/variables.css`
2. Update the semantic color variable
3. Example: `--color-text-primary: var(--blue);` now all text is blue
4. All components update automatically ✓

### Testing responsive design
1. Open component CSS file
2. Check `@media` queries for 640px, 767px, 900px
3. Test in browser DevTools mobile view
4. Adjust if needed

## 📊 File Sizes

Each component CSS file is kept small and focused:

| File | Size |
|------|------|
| variables.css | 1.3 KB |
| base.css | 0.6 KB |
| DemoHeader.css | 2.6 KB |
| DemoFooter.css | 2.2 KB |
| DemoHero.css | 2.4 KB |
| ImageText.css | 2.3 KB |
| FullWidthStage.css | 3.0 KB |
| FullWidthTeaser.css | 3.9 KB |
| NewsCard.css | 4.5 KB |
| Quote.css | 2.6 KB |
| TwoColumnStage.css | 3.5 KB |
| BackgroundWrapper.css | 0.8 KB |
| **Total** | **~30 KB** |

## ✅ Verification Checklist

Before deploying:

- [ ] variables.css is imported first in globals.css
- [ ] base.css is imported second
- [ ] All component CSS files are imported
- [ ] No orphaned CSS files (created but not imported)
- [ ] No hardcoded colors (all use var(--color-*))
- [ ] All components have responsive rules
- [ ] Component CSS files are in alphabetical order

## 🚀 Development Commands

```bash
npm run dev         # Start dev server (hot reload)
npm run build       # Build for production
npm run lint        # Check code quality
npm run type-check  # TypeScript validation
```

CSS changes hot-reload automatically - save and check browser.

## ❓ Troubleshooting

**Styles not applying?**
- Check CSS file is imported in globals.css
- Verify CSS variable names are spelled correctly
- Clear `.next/` folder and rebuild
- Check browser DevTools for specificity issues

**Component styles affecting other components?**
- Verify styles are scoped to component classes
- Use specific class names (not generic like `.heading`)
- Check for conflicting variable names

**Mobile styles not showing?**
- Verify @media query is in component CSS
- Check breakpoint values (640px, 767px)
- Test in browser DevTools mobile view
- Ensure mobile styles use correct class names
