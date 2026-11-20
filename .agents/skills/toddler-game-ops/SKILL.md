---
name: toddler-game-ops
description: Operational runbook and test/deployment procedures for the Bala Gopala Gurukul Toddler PWA project. Use when the user asks to test, audit, run, or deploy the toddler game.
---

# Toddler Game Operations Runbook

This skill guides operational tasks for the **Bala Gopala Gurukul** application.

## 1. Running the Local Server
Execute:
```powershell
node server.js
```
The server binds to `0.0.0.0:3000` and displays both local and Wi-Fi IP addresses for mobile/tablet testing.

## 2. Running Automated Quality Tests
Execute:
```powershell
node test.js
```
Validates:
- Presence and non-zero size of all required files (`manifest.json`, `sw.js`, `favicon.svg`, etc.)
- SVG vector integrity in `vedic-assets.js`
- Game class interfaces (`start`, `stop`, `handleAnyKey`) in `games.js`
- Absence of breaking ES2020 syntax (e.g., `?.`)
- HTTP 200 responses on all local endpoints

## 3. Deploying to Production
This project has zero build steps and zero runtime external dependencies:
- **GitHub Pages**: Push repository directly to the `main` or `gh-pages` branch.
- **Vercel / Cloudflare Pages / Netlify**: Configure root directory as public publish directory.
- **Self-Hosted Node / Docker**: Run `node server.js` behind an HTTPS reverse proxy (e.g. Caddy or Nginx).
