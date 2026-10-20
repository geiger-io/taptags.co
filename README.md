# taptags.co

Website for TapTags, the NFC tag product and companion app (app source: ../taptags).

Status: not yet built. Domain registered at GoDaddy, DNS on Cloudflare, nothing hosted.

Required pages for store listings: `/`, `/privacy`, `/support`.

## Pending assets

- Hero product photo: drop in `assets/img/hero.webp` (or `hero.png`) for
  desktop and `assets/img/hero-mobile.webp` (or `hero-mobile.png`) for mobile.
  Until these exist, the hero section shows a neutral CSS placeholder (see
  `assets/style.css`, `.hero-placeholder`).
- Store badges: official Apple/Google artwork lives in `assets/img/badges/`
  with sources noted in `assets/img/badges/README.md`.
- App Store link: `assets/stores.js` has `ios: null` until the app has a
  real App Store Connect ID. Every App Store button and `/ios` show a
  "Coming soon" state until that is filled in.
