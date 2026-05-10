# Pages Dependency Tree

## Home Page `/` — `src/app/page.tsx`
Dependencies:
- `src/app/globals.css`
- `src/components/Header.tsx`
- `src/components/Footer.tsx`
- `src/components/ClientCanvasWrapper.tsx` (3D canvas bg)
- `src/components/CustomCursor.tsx`
- gsap + ScrollTrigger (animations)

## Portfolio `/portfolio` — `src/app/portfolio/page.tsx`
Dependencies: globals.css, Header, Footer

## Contact `/contact` — `src/app/contact/page.tsx`
Dependencies: globals.css, Header, Footer
