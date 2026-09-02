# Implementation Plan: Pinterest-style Image Gallery Home Page

## Overview
This document outlines the step-by-step implementation plan for the Pinterest-style Image Gallery Home Page based on `docs/02-design.md`. The plan breaks implementation into 4 discrete, ordered, and verifiable tasks.

---

## Tasks

### Task 1: Semantic HTML Markup & Modal Skeleton
- **Target Files**: `src/index.html`
- **Dependencies**: None
- **Description**: Construct the semantic HTML layout for the static image gallery home page. Include header/title area, gallery grid container (`#gallery-grid`), modal overlay structure (`#image-modal`, `.modal-backdrop`, `.modal-content`, `.modal-close`), accessibility attributes (`role="dialog"`, `aria-modal="true"`, `aria-label`, hidden state `aria-hidden="true"`), and script/stylesheet link tags referencing `styles.css` and `app.js`.
- **Done When**: `src/index.html` exists with valid semantic structure, `#gallery-grid` container, modal markup shell with accessibility attributes, and references to `styles.css` and `app.js`.
- **Verification Command**: `python3 -c "from bs4 import BeautifulSoup; soup=BeautifulSoup(open('src/index.html'), 'html.parser'); assert soup.find(id='gallery-grid'); assert soup.find(id='image-modal'); print('Task 1 Passed')"`

---

### Task 2: Responsive CSS Masonry & Modal Styles
- **Target Files**: `src/styles.css`
- **Dependencies**: Task 1
- **Description**: Implement responsive CSS styling using CSS Multi-column layout (`column-count: 3` at `>= 768px`, `column-count: 1` at `< 768px`), `break-inside: avoid` on `.gallery-card` elements to prevent card splitting across columns, dynamic aspect ratio preservation, card hover state animations, tag pill styles, modal backdrop overlay positioning, and scroll-locking helper class (`body.modal-open`).
- **Done When**: `src/styles.css` defines responsive multi-column gallery rules, card item layouts, modal overlay display/animation styles, and media queries for mobile/desktop breakpoints without external CSS framework imports.
- **Verification Command**: `python3 -c "css=open('src/styles.css').read(); assert 'column-count' in css; assert 'break-inside' in css or 'break-inside: avoid' in css; assert '@media' in css; print('Task 2 Passed')"`

---

### Task 3: Mock Dataset & Vanilla JS Modal / Render Engine
- **Target Files**: `src/app.js`
- **Dependencies**: Task 1, Task 2
- **Security Boundary**: Client-side XSS prevention — all user-visible strings (titles, tags) must be inserted via `textContent` or DOM text nodes, avoiding unescaped `innerHTML`.
- **Description**: Implement `src/app.js` containing `GALLERY_DATA` (array of 10 mock `ImageItem` objects with data URI SVG visuals), DOM rendering logic (`renderGallery`, `createCardElement`), fallback handling for missing tags/images, modal open/close controls (`openModal`, `closeModal`), body scroll locking, background overlay click dismissal, and keyboard accessibility (`Escape` key modal closure and focus trapping).
- **Done When**: `src/app.js` contains 10 offline mock image items, DOM instantiation logic securely injecting text node metadata, modal toggle handlers, and escape key listener.
- **Verification Command**: `node -e "const fs = require('fs'); const code = fs.readFileSync('src/app.js', 'utf8'); if (!code.includes('GALLERY_DATA') || !code.includes('openModal') || !code.includes('closeModal')) process.exit(1); console.log('Task 3 Passed');"`

---

### Task 4: Automated Verification Test Suite
- **Target Files**: `tests/test_gallery.py`
- **Dependencies**: Task 1, Task 2, Task 3
- **Description**: Build comprehensive Python `unittest` suite validating offline compliance (no external HTTP/CDN references), HTML document structure, CSS column & media query rules, dataset length (10 items), DOM accessibility attributes (`aria-hidden`, `role="dialog"`), and JS event listener bindings.
- **Done When**: `tests/test_gallery.py` exists and `python3 -m unittest discover tests` executes cleanly with 0 failures or errors.
- **Verification Command**: `python3 -m unittest tests/test_gallery.py`

---

## Task Dependencies & Execution Order
1. **Task 1** (HTML Skeleton) -> Blocked by: None
2. **Task 2** (CSS Layout) -> Blocked by: Task 1
3. **Task 3** (JS Renderer & Modal) -> Blocked by: Task 1, Task 2
4. **Task 4** (Verification Tests) -> Blocked by: Task 1, Task 2, Task 3

---

## Security & Risk Audit
- **Security Boundary (XSS Prevention)**: Task 3 handles raw metadata strings (titles, tags). String insertion must exclusively use `document.createTextNode()` or `element.textContent` to eliminate XSS vectors.
- **Irreversible / Breaking Operations**: None. All code operates client-side offline with zero remote state mutation or database writes.

## Provenance
- Stage: Plan
- Input: `docs/02-design.md`
- Produced: 2026-09-02
