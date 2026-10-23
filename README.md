# Atelier House

A responsive editorial storefront concept for a home-textile studio. The shopping experience is organized around natural materials, product photography, and practical tools for exploring and saving products.

## Main features

- Product collection with category filters and live search
- Product detail quick view
- Wishlist and shopping bag with quantity controls and subtotal
- Shipping threshold progress indicator
- Responsive navigation, product drawers, and checkout form
- Sample order confirmation without payment processing

Product and brand details are illustrative. The checkout flow runs locally in the browser and does not send orders or process payments.

## Technologies

- React and TypeScript
- Vite
- Custom CSS
- Inline SVG icons

Product photography is served from Unsplash and display fonts are loaded from Google Fonts.

## Project structure

```text
project-3/
├── .gitignore
├── public/
│   └── favicon.svg
├── screenshots/
│   └── work.png
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css
├── README.md
├── description-ar.md
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
└── vite.config.ts
```

## Run locally

Requires Node.js and npm.

```bash
npm ci
npm run dev
```

Vite prints the local URL after startup, usually `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

The production build is written to `dist/`. The finished-site screenshot is available at [`screenshots/work.png`](./screenshots/work.png), and the Arabic work description is in [`description-ar.md`](./description-ar.md).
