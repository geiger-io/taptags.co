# taptags.co project plan

Status: planning. Last updated 19 Oct 2026 (hosting changed to GitHub Pages).
Work in progress is saved on branch `site-v1` (566bc08: icons, screenshots, OG image, base stylesheet). Nothing is deployed.

## Purpose

1. Promote the TapTags app and link to the App Store and Google Play.
2. Be the landing page for new TapTags. Each tag ships programmed with a link to this site. Tapping it opens the site, which sends the buyer to the right store for their phone.
3. Host the privacy policy and support pages that both store listings require.

Out of scope for v1: shop, accounts, analytics, tracking, blog.

## How a new tag works

1. A tag ships from the manufacturer with one NDEF URI record: `https://taptags.co/get`.
2. The buyer taps it. Android opens the link straight away. iPhone XS and later show a notification to open it. iPhone 7 to X cannot read tags in the background (they need the NFC Tag Reader in Control Centre), so the packaging should also print the link or a QR code.
3. `/get` detects the phone and redirects: iPhone or iPad to `/ios`, Android to `/android`. Anything else (desktop, unknown) sees both store buttons.
4. `/ios` and `/android` are small redirect pages (instant meta refresh plus a visible link) to the store listings. GitHub Pages has no server-side redirects, so the store URLs live in one config file (`assets/stores.js` or equivalent) and can change without touching tags.
5. The buyer installs the app and sets up the tag. The app overwrites the URL with their phone number and lock record.

**The tag URL is permanent.** Once tags are manufactured, `https://taptags.co/get` must keep working for the life of the product. Never rename or remove it.

**Tags must ship writable** (not permanently locked at the factory), or the app cannot program them.

The record is 15 bytes (`https://` prefix code plus `taptags.co/get`), so it fits easily on NTAG213, 215 and 216.

## Site map

| Path | Purpose |
|---|---|
| `/` | Landing page: what TapTags is, how it works, compatibility, store buttons |
| `/get` | Tag landing page: detects the phone and redirects, with store buttons as a fallback |
| `/ios` | Redirect to the App Store listing |
| `/android` | Redirect to the Google Play listing |
| `/privacy` | Privacy policy (from `taptags` branch `store-launch-assets`, `store-assets/privacy/privacy-policy.md`) |
| `/support` | Getting started, FAQ, contact |
| `404` | Not found page with store buttons |

## Technical approach

- Plain static HTML and CSS, with no framework and no build step. A little JavaScript on `/get` only.
- Hosting: GitHub Pages (owner decision, 19 Oct 2026; repo made public for this). DNS stays on Cloudflare and points `taptags.co` and `www` at GitHub Pages.
- Deployment: merging to `main` does not publish. Publishing runs a manual GitHub Actions workflow (`workflow_dispatch`), triggered only after the owner approves a Deploy card.
- No cookies, analytics or third-party scripts. This matches the app's privacy policy.
- Cost: free (GitHub Pages on a public repo). The domain renews on 30 Sep 2027 (GoDaddy).

## Decisions needed from the owner

| # | Decision | Recommendation |
|---|---|---|
| D1 | Tag URL | `https://taptags.co/get` |
| D2 | Support email | `support@taptags.co`, forwarded to your inbox with Cloudflare Email Routing (free) |
| D3 | Hosting | **Decided:** GitHub Pages, public repo, manual deploy workflow |
| D4 | Approve site copy | Review in the pull request before anything goes live |
| D5 | Security wording | Avoid strong security claims about the lock code until the app's lock feature has been reviewed |

## Dependencies outside this repo

| Item | Needed for | Where |
|---|---|---|
| App Store app ID | `/ios` redirect | App Store Connect (exists once the app record is created, before release) |
| Google Play listing live | `/android` redirect (`play.google.com/store/apps/details?id=com.taptags.app`) | Play Console |
| Final privacy policy and support email | `/privacy`, `/support` | `taptags` repo, `store-launch-assets` branch |
| Tag programming spec agreed with manufacturer | Physical product | Owner |

The store listings need `/privacy` and `/support` live first, so **the site blocks store submission**, not the other way round. Live store links can be switched on later in the store links config file.

## Milestones

### M1: Site v1 on a branch (agent work)
- Build the pages above on `site-v1` and open a pull request.
- Done when:
  - every page renders at 375 px and 1280 px wide with no horizontal scroll (screenshots attached to the PR)
  - `/get` sends an iPhone user agent to `/ios`, an Android one to `/android`, and shows both buttons on desktop
  - there are no external requests apart from the store links, checked in the browser network panel
  - no em dashes appear, and the copy is UK English

### M2: Hosting (owner, about 15 minutes, with a written guide)
- Enable GitHub Pages (source: GitHub Actions), set the custom domain `taptags.co`, add the DNS records in Cloudflare (DNS only, not proxied), enforce HTTPS, and set up Cloudflare Email Routing for the support address.
- Done when `curl -sI https://taptags.co/privacy` and `/support` return 200 with a valid certificate, and `www` redirects to the bare domain.

### M3: Store wiring
- Fill in the store links in the config file once the IDs exist. Put the privacy and support URLs into both store listings.
- Done when `https://taptags.co/ios` and `/android` open the correct listings on a real iPhone and Android phone.

### M4: Tag spec for the manufacturer
- A one-page spec: NDEF URI `https://taptags.co/get`, tag type, left writable, sample batch tested on iPhone and Android before the full order.
- Done when a sample tag opens the right store on one iPhone and one Android phone, and the app can then reprogram it.

### M5 (later): Open the app directly
- Universal Links (iOS) and App Links (Android), so a tag opens the app when it is already installed. This needs app changes plus `apple-app-site-association` and `assetlinks.json` on the site.
- Not needed for launch.

## Agent rules

See `AGENTS.md`. Agents work on branches and open pull requests. They never deploy, change DNS or publish copy without approval.
