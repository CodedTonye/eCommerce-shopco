# SHOP.CO — React + Redux + Tailwind

E-commerce front end built from the SHOP.CO Figma design:

- **React 18** + **React Router**
- **Redux Toolkit** for products, cart, filters and auth
- **Tailwind CSS** for styling
- **DummyJSON** (`https://dummyjson.com`) as the live data API — no backend needed

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (usually http://localhost:5173). For production: `npm run build && npm run preview`.

## Pages

- `/` Homepage (hero, brand logos, New Arrivals, Top Selling, dress styles, testimonials). "View All" expands the grid in place.
- `/category/:category` Category listing with filters, sort and pagination
- `/product/:id` Product detail (gallery, options, tabs, reviews, related)
- `/cart` Cart with quantities, promo code, order summary
- `/search?q=...` Search results
- `/signin`, `/signup` Auth pages

## Where the API is called

All calls are in Redux async thunks:

- `src/store/productsSlice.js`: `fetchHomeProducts`, `fetchProductById`, `fetchRelatedProducts`, `fetchCategoryProducts`, `fetchSearchProducts`, `fetchSearchSuggestions`
- `src/store/authSlice.js`: `loginUser` (`POST /auth/login`), `signupUser` (`POST /users/add`)

## Search

The navbar search does a debounced live lookup (8 results, scrollable) against `/products/search`. Enter or "See all results" opens `/search?q=...`.

## Sign in / Sign up

Auth state persists to `localStorage`. DummyJSON only accepts its own seeded users for sign in (e.g. `emilys` / `emilyspass`), and its `/users/add` endpoint simulates account creation without saving it, so a new signup can't then log in. The Sign Up page explains this after submit.

## Fonts & type scale

- Body: **Satoshi** (the design's real body font, free via Fontshare), loaded in `index.html`.
- Headings: **Clash Display** (free via Fontshare). The design's **Integral CF** is a paid font and can't be bundled; to use it, add its `@font-face` in `src/index.css` and change `fontFamily.display` in `tailwind.config.js`.
- Custom sizes in `tailwind.config.js`: `text-hero`, `text-h2`, `text-h3`, `text-product-title`, `text-product-price`. These were matched visually from screenshots, not Figma Dev Mode values.

## Assets

Hero and dress-style images are in `src/assets/images`. The SHOP.CO wordmark, brand logos, social and payment icons are your SVGs in `src/assets/icons`.
