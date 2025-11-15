# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Medicare Presentation Website** - a multi-language, multi-persona marketing site for a healthcare SaaS platform. Built with React + Vite + Hono, deployed to Cloudflare Workers.

**Key Characteristics:**
- **Medical Futurism Design Theme**: Teal/cyan color palette (#0A4D4E, #00D9FF), modern healthcare aesthetic
- **Three Persona Pages**: Patient, Small Private Practice, Clinic/Hospital - each with tailored messaging
- **Multi-language**: English (en), Romanian (ro), Arabic (ar) with i18next
- **Wizard Onboarding**: Two-step flow (language selection → persona selection)
- **Edge Deployment**: Runs on Cloudflare Workers with Hono backend

## Development Commands

### Essential Commands
```bash
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Build for production (TypeScript + Vite)
npm run preview      # Preview production build locally
npm run deploy       # Deploy to Cloudflare Workers
npm run lint         # Run ESLint
npm run check        # Full check: TypeScript + build + dry-run deploy
```

### Cloudflare Specific
```bash
npx wrangler tail    # Monitor live Worker logs
npm run cf-typegen   # Generate Cloudflare Workers types
```

## Architecture

### Application Flow

**Initial Load:**
1. User lands on `/` → `Wizard` component (Step 1: Language Selection)
2. User selects language → Navigate to `/{lang}` → `Wizard` (Step 2: Persona Selection)
3. User selects persona → Navigate to `/{lang}/{persona}` → Persona-specific page
4. Preferences saved to `localStorage` → Future visits redirect to saved persona page

**URL Structure:**
```
/                        → Wizard (Language Selection) or redirect if preferences exist
/{lang}                  → Wizard (Persona Selection): /en, /ro, /ar
/{lang}/patient          → Patient persona page
/{lang}/practice         → Small Practice persona page
/{lang}/clinic           → Clinic/Hospital persona page
```

### Key Files & Locations

**Core Application:**
- `src/react-app/App.tsx` - Main app with routing, wizard flow, persona navigation
- `src/react-app/Wizard.tsx` - Two-step wizard component (language + persona selection)
- `src/react-app/i18n.ts` - i18next configuration for en/ro/ar translations
- `src/worker/index.ts` - Hono backend serving the React SPA

**Pages (Persona-Specific):**
- `src/react-app/pages/PatientPage.tsx` - Patient-focused messaging
- `src/react-app/pages/PracticePage.tsx` - Small practice/solo practitioner messaging
- `src/react-app/pages/ClinicPage.tsx` - Enterprise clinic/hospital messaging

**Translations:**
- `src/react-app/locales/en.json` - English (source)
- `src/react-app/locales/ro.json` - Romanian
- `src/react-app/locales/ar.json` - Arabic (RTL)

**Styling:**
- `src/react-app/App.css` - Global styles, Medical Futurism theme
- `src/react-app/Wizard.css` - Wizard-specific styles

### Translation System

Uses `react-i18next` with JSON translation files. All user-facing strings MUST be translated.

**Usage Pattern:**
```tsx
const { t } = useTranslation();

// Simple translation
<h1>{t('hero.title')}</h1>

// With parameters
<p>{t('hero.greeting', { name: userName })}</p>

// Array iteration (features list)
{(t('features', { returnObjects: true }) as string[]).map((feature, i) => (
  <li key={i}>{feature}</li>
))}
```

**Translation Structure (en.json):**
```json
{
  "hero": {
    "badge": "Live Now",
    "title": "Your Health,",
    "titleGradient": "Our Priority"
  },
  "features": {
    "scheduling": {
      "title": "Smart Scheduling",
      "description": "AI-powered appointment booking..."
    }
  }
}
```

**Critical:** When adding new copy, update ALL three language files (en, ro, ar).

### Hero Banner Images

Hero banners are stored in `/public/` with responsive variants for different devices.

**Current Setup:**
- All pages use: `/public/hero-banner-image.jpg` (1920×800px, 2.4:1 aspect ratio)
- Shows doctor-patient consultation in teal/turquoise setting (matches brand palette)

**Available (Unused) Responsive Images:**
Practice page variants exist but not currently used:
- `practice-hero-banner.jpg` / `@2x.jpg` (desktop)
- `practice-hero-banner-mobile.jpg` / `@2x.jpg` (portrait)
- `practice-hero-banner-tablet.jpg` / `@2x.jpg` (landscape)

Clinic page variants exist but not currently used:
- `clinic-hero-banner.jpg` / `@2x.jpg` (desktop)
- `clinic-hero-banner-mobile.jpg` / `@2x.jpg` (portrait)
- `clinic-hero-banner-tablet.jpg` / `@2x.jpg` (landscape)

**Image Guidelines:** See `HERO_BANNER_IMAGE_GUIDE.md` for:
- Technical specifications (dimensions, aspect ratios, file sizes)
- Visual concept requirements per persona
- Stock photo search keywords
- Image optimization workflow with `sips` (macOS)

To implement responsive images, use `<picture>` element with media queries (see guide).

### Custom Slash Commands

Located in `.claude/commands/`, these are specialized copywriting prompts:

**Available Commands:**
- `/translate-copy` - Translate marketing copy to en/ro/ar while preserving Medical Futurism tone
- `/refine-medical-tone` - Improve copy to match Medical Futurism brand voice
- `/generate-cta` - Generate compelling call-to-action copy
- `/generate-hero` - Create hero section copy (title, subtitle, badge)
- `/generate-persona` - Generate persona-specific content (Patient/Practice/Clinic)
- `/generate-features` - Create feature descriptions for product pages

**Usage:** These commands help maintain consistent brand voice across all personas and languages.

## Development Patterns

### Adding a New Persona Page

1. Create page component: `src/react-app/pages/NewPersonaPage.tsx`
2. Add route in `App.tsx`:
   ```tsx
   <Route path="/:lang/newpersona" element={<Layout><NewPersonaPage /></Layout>} />
   ```
3. Add persona option in `Wizard.tsx` (Step 2)
4. Add translations for new persona in all locale files
5. Optionally add persona-specific hero banner image

### Updating Translations

1. Edit `src/react-app/locales/en.json` (source language)
2. Use `/translate-copy` command to translate to Romanian and Arabic
3. Update `ro.json` and `ar.json` with translations
4. Test all languages by navigating to `/{lang}/persona` URLs
5. For Arabic, verify RTL layout renders correctly

### Modifying Medical Futurism Theme

**Color Palette** (defined in `App.css`):
```css
--color-primary: #0A4D4E;     /* Deep Teal */
--color-accent: #00D9FF;      /* Electric Cyan */
--color-accent-light: #5EEEFF;
--color-coral: #FF6B6B;       /* Warm accent */
--color-navy: #0F1419;        /* Dark backgrounds */
```

When changing theme colors, update:
- CSS variables in `App.css`
- Hero banner images (ensure teal/cyan colors align)
- Translation files if color-based metaphors change

### Testing Wizard Flow

1. Clear localStorage: `localStorage.clear()` in browser console
2. Navigate to `/` → Should show language selection
3. Select language → Should show persona selection
4. Select persona → Should navigate to `/{lang}/{persona}`
5. Reload page → Should stay on selected persona (localStorage check)
6. Clear localStorage again → Should redirect to wizard

## Cloudflare Workers Specifics

**Backend**: Hono serves the built React SPA from `dist/client` directory.

**Worker Entry**: `src/worker/index.ts`
```typescript
// Serves static React build with SSR-like behavior
app.get('*', async (c) => {
  // Returns index.html for all routes (SPA routing)
})
```

**Deployment:**
- Build creates `dist/` output
- `wrangler deploy` pushes to Cloudflare Workers
- Environment: Edge computing (no Node.js runtime)

## Important Notes

- **No Backend API**: This is a static presentation site. All "features" are marketing copy, not functional.
- **localStorage Used**: Wizard preferences (language, persona) persist client-side only.
- **RTL Support**: Arabic (ar) requires RTL-aware CSS. Lucide icons may need mirroring.
- **Medical Context**: All copy should maintain professional healthcare standards while being accessible.
- **Responsive Design**: Mobile-first approach, but desktop is primary marketing target.

## Related Documentation

- `README.md` - Standard Vite + React + Cloudflare Workers template info
- `HERO_BANNER_IMAGE_GUIDE.md` - Comprehensive guide for hero banner image specifications
- `.claude/commands/*.md` - Copywriting and translation prompt templates
