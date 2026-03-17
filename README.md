# Testiventmerch

Static one-page dashboard for merch research and strategy.

## Project Purpose

The page is used as a live reference base for future merch production decisions.

Main focus:

- Reference cards with images and deep-dive modal
- Fast filtering by category
- Visual summary blocks (charts + insights)

## Tech Stack

- HTML: `index.html`
- CSS: Tailwind (CDN) + custom styles in `assets/css/styles.css`
- JS: vanilla JavaScript (split by responsibility)
- Charts: Chart.js (CDN)

## Current JS Structure

- `assets/js/data.js` - data layer and helper functions
- `assets/js/ui.js` - UI logic (tabs, charts, grid, modal)

Load order is important:

1. `data.js`
2. `ui.js`

Configured in `index.html`.

## Run Locally

From project root:

```powershell
python -m http.server 5500
```

Open:

- `http://localhost:5500`

## Data Editing Guide

All card content is in `assets/js/data.js` (`merchData`).

Required fields per card include:

- `id`, `brand`, `year`, `category`, `item`
- `idea`, `design`, `tech`, `packaging`
- `price`, `relevance`, `takeaways`, `tags`, `vibe`
- Media via helper `createRefMedia(...)`

## Gallery Workflow

Each card uses a dedicated folder:

- `assets/images/references/REF-XXX/`

Folder creation can be done manually or automatically by the script below (it scans `assets/js/data.js` IDs and creates missing `REF-XXX` folders).

Recommended file naming:

- `cover.jpg` or `cover.png` - preview for card tile
- `detail-1.jpg`, `detail-2.jpg`, ... - extra modal images

In `assets/js/data.js`, set media like this:

```js
...createRefMedia("REF-015", ["cover.jpg", "detail-1.jpg", "detail-2.jpg"])
```

Rules:

- First item in array is used as preview.
- Modal gallery shows all images.
- If array is empty, UI shows `No photo`.

### Automatic Gallery From Folder Files

The project supports automatic gallery loading from folder contents via:

- `assets/images/references/manifest.json`
- Script: `scripts/update-media-manifest.ps1`

Why this exists:

- Static hosting cannot list folder files at runtime.
- `manifest.json` is the file index used by UI.
- `cover.*` is always prioritized as the first image.
- `manifest.json` itself is not a script; it is generated JSON data consumed by UI.

When to run:

- After adding/removing/renaming images in any `REF-XXX` folder.

How to run (from project root):

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\update-media-manifest.ps1
```

Notes:

- Supported extensions: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.avif`.
- File names can be anything; only `cover.*` has special priority.

## Charts Behavior

### Source Balance (Radar)

- Calculated dynamically from `merchData`
- Uses `tags` + `category` mapping in `calculateSourceBalance()`
- Updates automatically when cards are added/edited

### Category Distribution (Doughnut)

- Currently static values in `assets/js/ui.js`
- Can be migrated to dynamic in the same style as radar

## External Links

- Insight cards open Instagram hashtag pages in new tab
- Modal source links open in new tab
- Safe link mode enabled: `target="_blank" rel="noopener noreferrer"`

## Agent Handoff Docs

For next-agent onboarding:

- `docs/AGENT_QUICKSTART.md`
- `docs/PROJECT_HANDOFF.md`
- `.instructions.md`
