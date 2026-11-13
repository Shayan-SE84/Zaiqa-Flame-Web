---
name: Epicurean Modern
colors:
  surface: '#f8f9ff'
  surface-dim: '#d0dbed'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dee9fc'
  surface-container-highest: '#d9e3f6'
  on-surface: '#121c2a'
  on-surface-variant: '#5c403d'
  inverse-surface: '#27313f'
  inverse-on-surface: '#eaf1ff'
  outline: '#916f6c'
  outline-variant: '#e5bdba'
  surface-tint: '#bf051e'
  primary: '#b3001a'
  on-primary: '#ffffff'
  primary-container: '#d9232d'
  on-primary-container: '#fff2f1'
  inverse-primary: '#ffb3ae'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fea619'
  on-secondary-container: '#684000'
  tertiary: '#545861'
  on-tertiary: '#ffffff'
  tertiary-container: '#6c707a'
  on-tertiary-container: '#f3f5ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad7'
  primary-fixed-dim: '#ffb3ae'
  on-primary-fixed: '#410004'
  on-primary-fixed-variant: '#930013'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#dfe2ee'
  tertiary-fixed-dim: '#c3c6d2'
  on-tertiary-fixed: '#181c24'
  on-tertiary-fixed-variant: '#434750'
  background: '#f8f9ff'
  on-background: '#121c2a'
  surface-variant: '#d9e3f6'
typography:
  headline-xl:
    fontFamily: Syne
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Syne
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Syne
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Syne
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Syne
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  price-display:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '800'
    lineHeight: 24px
    letterSpacing: -0.01em
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
The design system reflects a vibrant, high-end gastronomic brand balancing visceral culinary excitement with polished refinement. Designed for dynamic hospitality groups, contemporary multi-location bistros, and upscale digital ordering experiences, the interface evokes craving, energy, and meticulous quality.

The visual style blends **Modern Tactile Minimalism** with **Editorial Contrast**:
- **Appetite-First Immersion:** Generous photography space, rich warm undertones, and vivid micro-accents celebrate culinary texture and freshness.
- **Editorial Polish:** High-contrast pairing of deep obsidian structure against radiant crimson and warm cream planes creates an authoritative, curated restaurant atmosphere.
- **Energetic Modernity:** Punchy badge styling, micro-glows on primary interactions, and structured geometry maintain swift, seamless ordering frictionlessly.

## Colors
The palette balances appetizing warmth, luminous accents, and grounding structural darks.

### Palette Architecture
- **Primary (`#D9232D` / Dark Tone `#B91C1C`):** Appetizing Crimson Red. Reserved for primary conversion actions, active cart states, key notifications, and bold hero highlights.
- **Secondary (`#F59E0B` / Light Accent `#FEF08A` / Mid Accent `#FBBF24`):** Warm Saffron Gold and Mustard. Applied to promotional callouts, dietary highlight tags, review badges, and star ratings.
- **Tertiary & Anchors (`#0B0F17` / `#111827`):** Deep Onyx Charcoal & Rich Black. Dedicated to navigation bars, high-contrast modal backdrops, utility drawers, and authoritative headers.
- **Neutrals & Surfaces (`#FFFFFF` / `#FAFAFA` / `#FFFBEB`):** Crisp white for card elevations, tinted cream for warm secondary section backdrops, and muted warm slate (`#4B5563`, `#9CA3AF`) for supportive descriptions and structural borders.

## Typography
The typographic pair combines the expressive, modern architectural flair of **Syne** for headlines with the clean, highly legible geometry of **Plus Jakarta Sans** for menus, prices, and interactive components.

- **Syne (Headings & Signage):** Delivers distinct culinary attitude, striking presence, and luxury identity. Apply sentence-case styling for dish headings and uppercase for short section badges.
- **Plus Jakarta Sans (Body, Values, Badges):** Guarantees rapid scanning of dish descriptions, allergen alerts, nutritional data, and order modifiers across compact mobile viewports.
- **Price Hierarchy:** Price values must always utilize semibold or extra-bold weights (`price-display`) with currency symbols seated at a slightly reduced scale for effortless visual parsing.

## Layout & Spacing
The layout relies on a fluid 12-column grid on desktop screens, transitioning smoothly into 8 columns on tablets, and 4 columns on mobile devices.

### Layout Mechanics
- **Max Content Width:** Constrained to `1280px` for main menu grids and content containers, with full-width bleeding permitted for promotional culinary photography and dark marquee bars.
- **Rhythm & Proximity:** Modifiers, dish ingredients, and dietary pills share tight `space-xs` and `space-sm` spacing to preserve atomic grouping. Card internal padding maintains `space-lg` to create a light, uncluttered feel.
- **Form-Factor Adaptations:** On desktop viewports, sticky category sub-navigation anchors the top while persistent cart summaries float seamlessly. On mobile devices, margins compress to `1rem` and the checkout interface converts into a bottom-docked interactive bar.

## Elevation & Depth
Depth conveys tactile luxury using soft, diffused multi-stop shadows, warm tinting, and purposeful backdrops.

### Elevation Hierarchy
- **Level 0 (Base Canvas):** Off-white `#FAFAFA` background; alternated with dark-mode charcoal `#0B0F17` blocks for special collections or chef tasting menus.
- **Level 1 (Menu Cards & Containers):** Pure `#FFFFFF` resting on `#FAFAFA`, supported by a hairline border (`rgba(17, 24, 39, 0.06)`) and a delicate drop shadow: `0 4px 16px -2px rgba(17, 24, 39, 0.05)`.
- **Level 2 (Hover States & Overlays):** Cards lift on interaction to `0 12px 28px -4px rgba(17, 24, 39, 0.10)`.
- **Level 3 (Order Drawer & Sticky Bars):** Deep floating layers rely on `0 20px 40px -8px rgba(11, 15, 23, 0.22)` with subtle warm ambient tinting.
- **Glow Elevation (Primary CTA):** High-priority buttons feature an intentional colored ambient shadow (`0 8px 24px -2px rgba(217, 35, 45, 0.35)`), reinforcing energy and actionable urgency.

## Shapes
The shape language combines welcoming curvature with architectural stability.

- **Base Radius (0.5rem / 8px):** Applied to form fields, quantity adjusters, dropdowns, and micro-badges.
- **Large Radius (1rem / 16px):** Standard across food item cards, modals, checkout step containers, and category tiles.
- **Pill Radius (9999px):** Exclusively reserved for dietary chips (Vegan, Gluten-Free, Halal), primary button pills, counter bubbles, and promotional floating notices.

## Components

### Buttons & Interactive CTAs
- **Primary Action (Order Now / Checkout):** Deep Crimson `#D9232D` background, text in white (`#FFFFFF`), `roundedness: 2` (or pill form for mobile bottom bars), accompanied by the crimson ambient glow shadow. Active states darken to `#B91C1C`.
- **Secondary Action (Add to Cart / Customize):** Crisp white surface with a solid 1.5px border in charcoal `#111827`, or light cream tint (`#FFFBEB`) with mustard accents.
- **Tertiary / Ghost:** Borderless, semibold typography with crimson or rich charcoal underline on hover.

### Chips, Tags & Badges
- **Dietary & Flavour Chips:** Soft muted backgrounds with distinct dark typography (e.g., `#FEF08A` background with `#854D0E` text for "Chef's Pick"; `#DCFCE7` with `#166534` for "Vegan"). Fully rounded pill shape with horizontal padding `space-sm` to `space-md`.
- **Discount & Offer Badges:** Bright Crimson Red `#D9232D` or Saffron Gold `#F59E0B` banner pins attached to upper card corners or inline pill tags featuring high-contrast white or black text.

### Food & Menu Item Cards
- Surface: Crisp White (`#FFFFFF`).
- Image Aspect Ratio: 4:3 or 16:10 with smooth subtle zoom on card hover.
- Composition: High-contrast title in `title-lg`, concise two-line truncated ingredient narrative in `body-sm`, bold pricing anchoring bottom left, and an immediate quick-add plus button in the bottom right corner.

### Inputs & Modifiers
- **Form Fields:** Inset off-white (`#F9FAFB`) with a subtle `1px` border in `#E5E7EB`. Focus states transition to a `2px` ring in Crimson Red (`rgba(217, 35, 45, 0.2)`).
- **Checkboxes & Radios:** Rich Black border turning Crimson Red when active, with high-visibility white check or dot glyphs.
- **Quantity Selector:** Compact, pill-shaped stepper composed of muted charcoal glyphs on cream surfaces with clear numeric spacing.

### Order Drawer & Sticky Cart
- Full-height slide-over docked to the screen edge (right side on desktop, bottom sheet on mobile).
- Backdrop: Deep charcoal translucent overlay (`rgba(11, 15, 23, 0.6)`) with `backdrop-filter: blur(8px)`.
- Header: Sticky rich charcoal top bar with clear item tally.
- Subtotal Section: Emphasized price break-outs, instant gratuity selector chips, and a full-width glowing Crimson CTA button.