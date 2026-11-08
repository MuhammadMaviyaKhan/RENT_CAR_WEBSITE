# RENTCARS — Premium Car Rental

A cinematic car-rental experience built with **React + Vite**, with a multi-page flow for the fleet, car details, booking, about, contact and legal pages.

The live GitHub Pages site is served from the **repository root** (`index.html`, `assets/` and `Image/`). Those files are the production build.

## Source code

The complete React source lives in [`app/`](app/README.md).

```bash
cd app
npm install
npm run dev
```

## Build and publish

```bash
cd app
npm run build
```

Then copy the contents of `app/dist/` to the repository root (replacing `index.html`, `assets/` and `Image/`). On Windows PowerShell:

```powershell
Copy-Item app\dist\* . -Recurse -Force
```

Every push to `main` also runs the **Deploy to GitHub Pages** workflow in `.github/workflows/deploy.yml`, which builds `app/` and deploys `app/dist/`.

## Pages

| Route | Page |
| --- | --- |
| `#/` | Home |
| `#/fleet` | Full fleet — search, filters and sorting |
| `#/fleet/:id` | Car details |
| `#/booking` | Booking form |
| `#/booking/:id` | Booking with a car preselected |
| `#/about` | Our story |
| `#/contact` | Contact and FAQs |
| `#/privacy`, `#/terms`, `#/cookies` | Legal pages |
| anything else | Designed 404 fallback |

Built with React 19, Vite 8 and a lightweight hash router — no server rewrites required.
