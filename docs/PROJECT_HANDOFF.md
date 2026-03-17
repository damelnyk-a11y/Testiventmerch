# Project Handoff

## Current Architecture Snapshot

- Runtime entry: `index.html`
- Data layer: `assets/js/data.js`
- UI layer: `assets/js/ui.js`
- Styles: `assets/css/styles.css`
- Media store: `assets/images/references/REF-XXX/`

## Implemented Features (current)

1. Tabbed SPA navigation (Analytics / References / Strategy)
2. Filterable reference grid by category
3. Modal with:

- large main image
- left/right gallery arrows
- thumbnail strip

1. Dynamic radar chart based on `merchData` tags/category
2. Insight cards linking to Instagram hashtag pages in new tab

## Known Product Decisions

1. No external placeholder images in card data
2. Per-reference folder model for images
3. If gallery is empty, UI shows `No photo`
4. External links always open in separate tab

## Maintenance Hotspots

- `calculateSourceBalance()` in `assets/js/data.js`:
  Keep tag taxonomy aligned with actual `merchData.tags`
- `initCharts(...)` in `assets/js/ui.js`:
  Receives precomputed source-balance data
- `openModal(...)` in `assets/js/ui.js`:
  Single point for modal rendering

## Suggested Next Improvements

1. Make doughnut chart dynamic from `merchData`
2. Add lightweight search input for grid cards
3. Add keyboard navigation in modal (left/right/esc)
4. Add smoke-check script for docs consistency

## Sync Checklist for Future Agents

If you change labels/headings duplicated in two places, update both:

- `index.html`
- `sections/dashboard.html`

If you change architecture/workflow, update:

- `README.md`
- `.instructions.md`
- `docs/AGENT_QUICKSTART.md`
- `docs/PROJECT_HANDOFF.md`
