# Bala Gopala Gurukul — Project Rules & Guidelines

These rules apply whenever Antigravity works on this repository:

## 1. Zero External Runtime Dependencies
- All artwork must remain 100% scalable vector graphics (SVG) defined in `vedic-assets.js` with no external image URLs.
- All sound effects and music must remain procedural using the Web Audio API in `audio.js` with no external audio file downloads.
- The app must function 100% offline via the Service Worker (`sw.js`).

## 2. Toddler Ear Safety & Hearing Protection
- All sound synthesis nodes MUST connect to `this.getDestination()`, which routes through the `DynamicsCompressorNode` (-12dB threshold, 8:1 ratio) and master limiter.
- Never connect sound oscillators directly to `ctx.destination` without passing through the safety limiter.

## 3. Universal Tablet & WebView Compatibility
- Do NOT use modern syntax features such as optional chaining (`?.`) or nullish coalescing (`??`) without polyfills/transpilation, as they crash older iPad and Android WebViews.
- Always check compatibility using `node -c *.js`.

## 4. Child Lock & Parent Gate Security
- Any parent-oriented feature (Parent Guide, screen-time limit settings, volume adjustments) must remain guarded behind the grown-up math verification gate (`requestParentAccess()`).
- Toddler lock mode must always require a 2-second hold to unlock.

## 5. Verification Protocol
- After making changes to any file, always run `node test.js` to ensure all automated regression checks pass.

## 6. One Source of Truth
- Adding a game means: the class in `games.js`, one entry in `this.games` and one in `GAME_CATALOG` (`app.js`), one sidebar tab in `index.html`, and its guidance text. Never hard-code the number of games.
- Games must only touch the container element they are given (each game gets its own `.game-root`), and must not assume the stage cannot scroll.
- A release bumps `CACHE_VERSION` (`sw.js`), the `?v=` strings (`index.html`) and `package.json` together.
- No third-party requests: fonts live in `fonts/`, icons in `icons/`. No inline scripts or inline event handlers (strict CSP).
