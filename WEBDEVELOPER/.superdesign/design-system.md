# Design System

## Target Design (from user reference screenshots)

### Color Palette
```
--bg:        #F2EDE4   /* Warm cream/off-white — main page background */
--bg-sage:   #CAD5BE   /* Muted sage green — services section background */
--text:      #1A1A1A   /* Near-black — primary text */
--text-muted:#666666   /* Medium gray — secondary text */
--lime:      #BAFF29   /* Neon lime/yellow-green — primary accent, CTA */
--lime-dark: #1A1A1A   /* Dark text on lime buttons */
--white:     #FFFFFF   /* Card backgrounds */
--border:    rgba(0,0,0,0.08) */
```

### Typography
- Headings: **Plus Jakarta Sans** (or Inter), weight 800-900, tight tracking (-0.02em)
- Body: Inter or system-ui, weight 400-500
- Eyebrow labels: uppercase, 11-12px, letter-spacing 0.15em, lime color

### Component Patterns

#### Navigation
- Light background (cream/white)
- Logo: icon + "WEBSOLUTION" in bold dark text
- Nav links: dark text, centered
- CTA button: lime filled with dark text + arrow, border-radius 100px

#### Hero
- Split layout: left 55% text, right 45% image
- Availability badge: green dot + "Available for new projects" text, pill-shaped light border
- H1: Very large bold (clamp 48px-72px), dark text, "digital" word in lime
- Description: muted gray, max-width ~320px
- CTA buttons: lime filled "View My Work ↘" + outline "Start a Project"
- Stats: bold large numbers + small muted labels below, separated by thin dividers
- Right image: large rounded rectangle (border-radius 20px), dark olive/green bg
- Lime circle decorative element top-right of image

#### Featured Projects Grid
- Eyebrow "SELECTED WORK" in lime
- H2 "Featured Projects" bold dark
- "View All Projects →" right-aligned link
- 2-column card grid, each card:
  - Full-width image with border-radius 16px, overflow hidden, no border
  - Project title bold + ↗ arrow icon inline
  - Category tags below in muted text separated by "•"

#### Services Section
- Background: sage green `#CAD5BE`
- Centered eyebrow + H2 + description
- 3-column card grid (white cards):
  - Small icon in dark square box top-left
  - Service number (01, 02...) top-right, muted
  - Service title bold
  - Description muted gray
  - Border-radius 16px, no border stroke visible on sage bg

#### Testimonials
- Light cream background
- Eyebrow "TESTIMONIALS" in lime
- H2 "What Clients Say"

### Spacing
- Section padding: 80-100px vertical, 80px horizontal (container max-width 1200px)
- Card gap: 24px
- Border-radius: 16-20px for cards, 100px for pills

### Buttons
```css
.btn-lime {
  background: #BAFF29;
  color: #1A1A1A;
  font-weight: 700;
  border-radius: 100px;
  padding: 14px 28px;
}
.btn-outline-dark {
  background: transparent;
  border: 2px solid #1A1A1A;
  color: #1A1A1A;
  border-radius: 100px;
  padding: 12px 28px;
}
```
