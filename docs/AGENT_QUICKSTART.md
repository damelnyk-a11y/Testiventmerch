# Agent Quickstart

## 1) What this project is

Static merch-reference dashboard (no build step, no framework).

## 2) Run locally

```powershell
python -m http.server 5500
```

Open `http://localhost:5500`.

## 3) Edit flow by file

- Content/data changes: `assets/js/data.js`
- UI behavior changes: `assets/js/ui.js`
- Visual styling changes: `assets/css/styles.css`
- Layout/markup changes: `index.html`

## 4) Most common tasks

### Add new reference card

1. Add card object in `merchData` (`assets/js/data.js`)
2. Set media:

```js
...createRefMedia("REF-015", ["cover.jpg", "detail-1.jpg"])
```

1. Add `cover.*` and any optional extra images (any names) into `assets/images/references/REF-XXX/`
2. (Optional) create the folder manually, or let script create it automatically
3. Rebuild media manifest:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\update-media-manifest.ps1
```

What step 5 now does:

- Creates missing `assets/images/references/REF-XXX/` folders from `id: "REF-XXX"` in `assets/js/data.js`.
- Regenerates `assets/images/references/manifest.json` from actual files in folders.
- Prioritizes `cover.*` as first image in each gallery.

### Change modal behavior

Edit only `assets/js/ui.js` (`openModal`, `setModalImage`, `changeModalImage`).

### Update chart logic

- Dynamic radar source logic: `calculateSourceBalance()` in `assets/js/data.js`
- Chart rendering: `initCharts(...)` in `assets/js/ui.js`

## 5) Safety and consistency rules

- External links must use `target="_blank" rel="noopener noreferrer"`
- Keep `index.html` and `sections/*.html` labels synced when duplicated
- Do not re-wire `index.html` back to old monolithic script

## 6) Fast verification checklist

1. `get_errors` on edited files
2. Open page and click through all 3 tabs
3. Open a card modal and test arrows + thumbs
4. Click an insight card and confirm new-tab behavior
