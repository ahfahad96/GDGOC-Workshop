# Technical Design: Pinterest-style Image Gallery Home Page

## Entry Check
- Input file: `docs/01-spec.md`
- Status: Confirmed present and non-empty (43 lines, complete specification).

## Constraints
- **Data volume & structure**: Dataset consists of exactly 10 mock image items. Each item contains metadata attributes: unique string ID, title string, tag array (strings), integer like count, image visual representation (inline SVG / data URI), aspect ratio, and accessible alt text.
- **Latency**: 0ms network latency requirement. Instant synchronous DOM rendering and layout computation, operating entirely offline without remote API calls or external asset loading.
- **Failure modes**: Malformed dataset or missing card metadata; DOM modal state errors (e.g. body scroll lock leak upon unexpected closure); image rendering fallback when visual SVG data is corrupt.
- **Integration points**: Zero external services, CDNs, databases, or third-party web frameworks. Browser-native client-side HTML, CSS, and Vanilla JavaScript (`src/index.html`, `src/styles.css`, `src/app.js`).
- **Security boundary**: Client-side DOM execution environment. All metadata strings (titles, tags) rendered securely via DOM text node insertion to prevent cross-site scripting (XSS). No external script loading or tracking.

## Repository Component Search
- **Existing Components**: Analyzed repository directory structure (`src/`, `tests/`). Currently `src/` and `tests/` contain only `.gitkeep` placeholders without pre-existing UI components, style system, or data managers.
- **Decision**: No existing component can be extended. New lightweight implementation required.
- **Track Selection**: Selected **Track A — Static Website** as defined in `AGENTS.md`.
  - Application files: `src/index.html`, `src/styles.css`, `src/app.js`.
  - Test files: `tests/test_gallery.py` (Python `unittest` checking static HTML structure, DOM components, metadata rendering, accessibility attributes, and offline compliance).

## Approaches & Trade-offs

### Approach 1: Pure CSS Multi-Column Layout with Vanilla JS Overlay Modal (Selected)
- **How it works**: Uses standard CSS Multi-column layout (`column-count: 3` for desktop viewports `>= 768px`, `column-count: 1` for mobile `< 768px`) with `break-inside: avoid` on cards. JavaScript populates the grid container from a 10-item data array and manages modal visibility and keyboard events (`Escape` key).
- **Build cost**: Low (~100 lines CSS, ~80 lines JavaScript). No external libraries or build setup.
- **Failure modes**: If JavaScript is disabled, pure HTML fallback can render pre-structured cards in columns without modal interactivity.
- **What it locks you into**: CSS column flow where items flow top-to-bottom within column 1 before moving to column 2.

### Approach 2: Dynamic JS-Balancing Column Containers
- **How it works**: JavaScript calculates card heights dynamically and distributes 10 items into explicit column `<div>` containers based on current window width and resize observers.
- **Build cost**: Medium-High (~180 lines JavaScript with resize debouncing and layout height calculation).
- **Failure modes**: Layout recalculation lag or visual reflow flash during viewport resizing; grid breaks completely if JavaScript fails to execute.
- **What it locks you into**: Heavy JS dependency for layout geometry; complex resize lifecycle management.

### Approach 3: CSS Grid with Experimental Masonry / Auto-Fit
- **How it works**: Employs CSS Grid auto-fit / auto-fill properties with `grid-template-rows: masonry`.
- **Build cost**: Low.
- **Failure modes**: Inconsistent browser rendering due to non-standard or experimental CSS masonry grid browser support across major browsers.
- **What it locks you into**: Browser engine compatibility issues.

## Architectural Decision Record (ADR)

### ADR 001: Pure CSS Multi-Column Layout with Vanilla JS Modal

- **Context**: The application requires displaying 10 mock image items in a responsive Pinterest-style masonry layout on desktop and single-column on mobile, with card metadata and modal inspection capabilities, operating 100% offline.
- **Options**:
  1. Pure CSS Multi-column layout (`column-count`) with Vanilla JS DOM rendering and overlay modal.
  2. JS-calculated dynamic column container layout.
  3. Experimental CSS Grid masonry layout.
- **Decision**: Select Option 1 (Pure CSS Multi-column layout with Vanilla JS).
- **Consequences**:
  - *Positive*: Native browser layout engine performance, zero JS calculation overhead for responsive columns, 100% offline capable, minimal codebase footprint.
  - *Trade-off (Accepted bad consequence)*: In CSS column layout (`column-count`), items wrap vertically top-to-bottom within each column before filling subsequent columns to the right, rather than strict top-left to bottom-right order.

## Contract Definitions

### 1. Data Schema (`ImageItem`)
```typescript
interface ImageItem {
  id: string;          // Unique identifier, e.g. "gallery-item-1"
  title: string;       // Image title string
  tags: string[];      // Array of tag category strings
  likes: number;       // Integer count of likes (>= 0)
  imageUrl: string;    // Data URI SVG format for offline rendering
  aspectRatio: string; // CSS aspect ratio or dimension helper, e.g. "4/3", "3/4", "1/1"
  alt: string;         // Accessible text description
}
```

### 2. Gallery Component & Function Signatures
```javascript
/**
 * Global mock dataset containing exactly 10 offline items.
 * @type {Array<ImageItem>}
 */
const GALLERY_DATA = [ ... ];

/**
 * Initializes and renders gallery cards into the target container.
 * @param {Array<ImageItem>} items
 * @param {HTMLElement} containerEl
 */
function renderGallery(items, containerEl) {}

/**
 * Creates a gallery card DOM element from an ImageItem data object.
 * @param {ImageItem} item
 * @return {HTMLElement}
 */
function createCardElement(item) {}

/**
 * Opens the detail modal overlay with the specified image card details.
 * @param {ImageItem} item
 */
function openModal(item) {}

/**
 * Closes the detail modal overlay and restores page background scroll.
 */
function closeModal() {}
```

### 3. DOM & Event Signatures
- **Grid Container Selector**: `#gallery-grid` (CSS `column-count: 3` at `>= 768px`, `column-count: 1` at `< 768px`).
- **Modal Containers**: `#image-modal` (overlay wrapper), `.modal-content`, `.modal-close` (close button), `.modal-backdrop`.
- **Event Listeners**:
  - `click` on `.gallery-card`: Triggers `openModal(item)`.
  - `click` on `.modal-close` or `.modal-backdrop`: Triggers `closeModal()`.
  - `keydown` on `window`: If `event.key === 'Escape'`, triggers `closeModal()`.

### 4. Error & Edge Cases
- **Missing or Corrupt Image**: Render fallback placeholder SVG with item title text inside image container.
- **Empty Tags Array**: Render fallback tag pill labeled "General".
- **Modal Keyboard Accessibility**: Traps focus inside modal when open and returns focus to active card element upon closure.

## Provenance
- Stage: Design
- Input: `docs/01-spec.md`
- Produced: 2026-09-02
