# Theme — Design Tokens & CSS

## Framework
- Next.js 16 (App Router)
- Vanilla CSS (no Tailwind)
- Fonts: DM Sans (body), DM Serif Display (headings)

## globals.css (full)
```css
:root {
  --cream: #FDEEC8;
  --orange: #F97316;
  --orange-raw: 249, 115, 22;
  --theme-b: #7c3aed;
  --warm-white: #F5F0E8;
  --black: #080808;
  --black-soft: #0f0f0f;
  --black-card: #141414;
  --border: rgba(255, 255, 255, 0.07);
  --border-warm: rgba(249, 115, 22, 0.22);
  --font-sans: 'DM Sans', system-ui, sans-serif;
  --font-serif: 'DM Serif Display', Georgia, serif;
  --cubic: cubic-bezier(0.65, 0.05, 0, 1);
  --dur: 0.75s;
}

html, body {
  background-color: var(--black);
  color: var(--cream);
  font-family: var(--font-sans);
}

.btn-primary {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 14px 32px;
  background: linear-gradient(135deg, var(--orange) 0%, var(--theme-b) 100%);
  color: #fff; font-weight: 700; font-size: 13px;
  letter-spacing: 0.06em; text-transform: uppercase;
  border-radius: 100px; border: none; cursor: pointer; text-decoration: none;
}
.btn-outline {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 13px 30px; background: transparent;
  color: var(--cream); font-weight: 600; font-size: 13px;
  letter-spacing: 0.06em; text-transform: uppercase;
  border-radius: 100px; border: 1px solid rgba(255,255,255,0.15);
  cursor: pointer; text-decoration: none;
}
```

## Target NEW Design (from reference screenshots)
The user wants to completely change to a LIGHT theme matching these specs:
- **Background**: Cream/off-white `#F2EDE4`
- **Accent**: Neon lime/yellow-green `#BAFF29` or `#C8FF00`
- **Text**: Near-black `#1A1A1A`
- **Muted text**: `#666666`
- **Services section bg**: Muted sage `#CAD5BE`
- **Card bg**: `#FFFFFF`
- **Font**: Plus Jakarta Sans (heavy/800 weight for headings), Inter for body
- **Border radius**: 16-20px on cards/images
- **No dark background, no 3D canvas**
