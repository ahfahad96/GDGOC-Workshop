# Implementation Plan: ChatGPT-like Chat Homepage Frontend

## Provenance
- Stage: Plan
- Input: `docs/02-design.md`
- Date: 2026-09-02

## Accepted Trade-offs
- **Trade-off**: Relying on vanilla HTML5/CSS3/ES6 JS with direct DOM manipulation rather than a reactive frontend framework (React/Vue/Alpine).
- **Impact**: Requires explicit DOM construction and manual state management in `app.js`, but eliminates Node.js dependencies, npm toolchains, and build pipeline failures.

## Decomposed Task List

### Task 1: Create Mock Backend Service Module
- **Target File**: `src/frontend/mock_backend.js`
- **Dependencies**: None
- **Description**: Implement asynchronous mock backend service function `sendMockPrompt(promptText)` simulating an assistant response with artificial network delay (100–300ms).
- **Done When**:
  - `sendMockPrompt` function is defined and callable.
  - Takes prompt string and returns a Promise resolving to a `Message` object (`id`, `sender: 'assistant'`, `text`, `timestamp`).
  - Returns simulated text response deterministically.
- **Risk / Boundary**: Low risk. Isolated mock data generator.

### Task 2: Implement HTML Page Layout & DOM Containers
- **Target File**: `src/frontend/index.html`
- **Dependencies**: Task 1
- **Description**: Construct semantic HTML structure containing header title, scrollable chat thread area (`#chat-thread`), hidden typing indicator element (`#typing-indicator`), and fixed bottom prompt input form (`#prompt-form`) containing textarea (`#prompt-input`) and submission button (`#send-btn`).
- **Done When**:
  - Page loads cleanly in a standard browser without syntax or markup errors.
  - All DOM IDs referenced by design contract (`#chat-thread`, `#prompt-input`, `#send-btn`, `#typing-indicator`, `#prompt-form`) are present.
  - Scripts `mock_backend.js` and `app.js` and stylesheet `style.css` are linked correctly.
- **Risk / Boundary**: Low risk.

### Task 3: Develop ChatGPT Dark Theme Styling
- **Target File**: `src/frontend/style.css`
- **Dependencies**: Task 2
- **Description**: Style `index.html` with responsive dark mode aesthetics modeling ChatGPT interface. Include full-height layout (`height: 100vh`), centered chat column, distinct user/assistant message bubbles, fixed bottom prompt container, focus state highlights, disabled state styles, and auto-overflow scroll behavior.
- **Done When**:
  - Dark mode color scheme (`#343541`, `#444654`, `#202123`) applied correctly.
  - Flexbox/grid structure keeps input container fixed at bottom while thread area scrolls vertically.
  - User and assistant message bubbles are visually distinct.
  - Visual disabled state for input/button is applied when `isProcessing` is true.
- **Risk / Boundary**: Low risk.

### Task 4: Implement UI Controller, Sanitization & Event Flow
- **Target File**: `src/frontend/app.js`
- **Dependencies**: Task 1, Task 2, Task 3
- **Description**: Implement UI state management (`ChatState`), submission handling (Enter key without Shift, Send button click), input validation (reject empty/whitespace string), DOM sanitization (prevent XSS), message rendering, auto-scrolling, typing indicator toggle, and error handling (`try...catch`).
- **Done When**:
  - Submitting whitespace or empty input is ignored/prevented.
  - Valid user prompt creates user message bubble in DOM and clears input box.
  - Input and Send button are disabled during mock request processing, with `#typing-indicator` visible.
  - Assistant message bubble is rendered upon resolution of `sendMockPrompt`.
  - `#chat-thread` automatically scrolls to bottom (`scrollTop = scrollHeight`) upon message addition.
  - Input field automatically regains focus after response completes.
  - Text is safely sanitized via DOM textNode creation before insertion into the DOM.
- **Security Boundary**: **Security Boundary: XSS Prevention**. User inputs and assistant text must be sanitized (e.g. using `textContent` or `document.createTextNode`) before rendering to prevent malicious HTML/JS injection.

### Task 5: End-to-End Verification & Local Test Server Runbook
- **Target File**: `tests/test_frontend.py`
- **Dependencies**: Task 4
- **Description**: Create local integration verification test suite or python-based HTTP server execution script to launch `src/frontend/` on `http://localhost:8000` and verify client loading and interactive chat submission flow.
- **Done When**:
  - Local HTTP server successfully serves static frontend assets.
  - Test runner verifies basic page loading and asset resolution.
  - Interactive chat flow operates end-to-end without console errors or uncaught exceptions.
- **Risk / Boundary**: Low risk.
