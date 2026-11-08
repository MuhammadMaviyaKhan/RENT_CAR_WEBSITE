# RENTCARS — Premium Car Rental

A cinematic car-rental experience built with **React + Vite**.

## Run locally

```bash
npm install
npm run dev
```

Vite prints the local URL (usually `http://localhost:5173`). If that port is busy, it automatically picks the next free port.

## Production build

```bash
npm run build
npm run preview
```

The production bundle is written to `dist/`.

## Pages

The site uses a lightweight hash router (`#/path`) so every page works on any static host without server rewrites.

| Route | Page |
| --- | --- |
| `#/` | Home — hero, how it works, benefits, fleet preview, reviews, app |
| `#/fleet` | Full fleet — search, category filters and sorting |
| `#/fleet/:id` | Car details — specs, features, pricing and related cars |
| `#/booking` | Booking — car picker, trip details, extras and live price summary |
| `#/booking/:id` | Booking with a car preselected |
| `#/about` | Our story — values, milestones and founder note |
| `#/contact` | Contact — channels, message form and FAQs |
| `#/privacy`, `#/terms`, `#/cookies` | Legal pages with on-page table of contents |
| anything else | Designed 404 fallback |

## Project structure

```
index.html            Vite HTML entry (fonts, icon CDN, root element)
src/
  main.jsx            React entry + toast provider
  App.jsx             Route map, layout and global link toasts
  router.jsx          Hash router, Link component and scroll handling
  styles.css          Cinematic design system and shared styles
  pages.css           Page-specific styles and responsive rules
  pages/              Home, Fleet, Car Details, Booking, About, Contact, Legal, 404
  components/         Header, Hero, Fleet, Reviews, Footer, CarCard, PageHero, etc.
  context/            Toast context
  data/               Cars, reviews, navigation, booking extras, FAQs and footer content
  hooks/              Reveal-on-scroll, page title and spotlight helpers
  utils/              Public image URL helper
public/Image/         Original and optimized image assets
```

## Interactions included

- Sticky glass header with mobile menu, active states and scroll-spy
- Hero parallax, reveal-on-scroll animations and animated counters
- Fleet search, category filters, sorting and empty states
- Car detail pages with specs, features and related cars
- Booking form with validation, extras and a live price summary
- Booking confirmation with reference number and trip summary
- Contact form with validation, FAQ accordion and success state
- Newsletter validation, favourites, link toasts and back-to-top
- Fully responsive at desktop, tablet and mobile widths
