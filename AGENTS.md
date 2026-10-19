# AGENTS.md - taptags.co

## Summary
Marketing and support website for TapTags (NFC tags plus iOS/Android app). Static HTML and CSS, no build step.
Tags ship programmed with https://taptags.co/get, which must keep working permanently. Read PLAN.md first.
Hosting: GitHub Pages (public repo), DNS on Cloudflare. Not yet live.
App source and store assets live in ../taptags (privacy policy on branch store-launch-assets).

## Required pages
- `/` landing page
- `/get` tag landing page (redirects to the right store)
- `/ios`, `/android` store redirect pages
- `/privacy` privacy policy (needed for App Store and Play Store listings)
- `/support` support page with contact details

## Deployment (owner rule)
- Merging to the main branch must never publish the site.
- Agents never deploy, publish, push to the publishing branch, trigger deploy workflows or change DNS or hosting settings.
- Publishing happens only through a Deploy card on the Kanban board. The owner approves it; then the operator deploys, checks the live site and attaches evidence (URL, HTTP status, screenshot) to the card.

## Rules
- Work on branches and open pull requests. Never push to main.
- This repo is public. Never commit internal business notes, security details about the app, secrets, API tokens or .env files.
- No public copy, pricing or claims about the product without owner approval. Never invent facts.
- No analytics, trackers or third-party scripts without owner approval.
- Report with evidence: commands run, screenshots of changed pages at 375 px and 1280 px wide.
- UK English. No em dashes.
