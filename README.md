# sesova-website (React)

Marketing website for SeSova — a coordination platform for renewable energy
project finance and delivery (lenders, developers, vendors and EPC
contractors working from one project record).

Plain React app, built with `react-scripts` (Create React App tooling) via
Yarn. No Vite, no Next.js/Gatsby/other framework — just React, React Router
for client-side pages, and a single global stylesheet.

## Structure

```
sesova-website/
├── public/
│   └── index.html         CRA shell (fonts, meta, #root)
└── src/
    ├── index.js            Entry point
    ├── index.css           Design system + all page styles (plain CSS)
    ├── App.js              Router setup
    ├── components/
    │   ├── Header.js       Sticky nav + mobile menu (React state)
    │   ├── Footer.js
    │   ├── BrandMark.js    Inline SVG logo
    │   └── ScrollToTop.js  Scroll-to-top / anchor scroll on route change
    └── pages/
        ├── Home.js
        ├── Solutions.js    #lenders / #developers / #vendors / #epc anchors
        ├── About.js
        └── Contact.js       Demo request form (client-side only, see below)
```

## Getting started

Requires [Yarn](https://yarnpkg.com/) and Node.js 18+.

```bash
yarn install
yarn start
```

Opens the dev server at `http://localhost:3000` with hot reload.

```bash
yarn build
```

Produces a production build in `build/` — a static bundle you can host
anywhere (Netlify, S3 + CloudFront, nginx, etc.). Because this uses
`react-scripts` (Webpack under the hood via CRA), `yarn build` is the only
build step; there's no separate bundler configuration to maintain.

## Routing

Client-side routes are declared in `src/App.js` with `react-router-dom`:

| Path         | Page        |
|--------------|-------------|
| `/`          | Home        |
| `/solutions` | Solutions (with `#lenders`, `#developers`, `#vendors`, `#epc` anchors) |
| `/about`     | About       |
| `/contact`   | Contact     |

`ScrollToTop.js` resets scroll position on navigation and scrolls to the
matching anchor when a link includes a hash.

## Notes

- The contact form (`src/pages/Contact.js`) is a static prototype: submitting
  it swaps in a confirmation message locally, but nothing is sent anywhere.
  Wire `handleSubmit` up to your CRM, form endpoint, or serverless function.
- Design tokens (colors, type, spacing) live at the top of `src/index.css`
  as CSS custom properties on `:root`.
- Fonts (Fraunces, IBM Plex Sans) load from Google Fonts via `<link>` tags
  in `public/index.html`.
