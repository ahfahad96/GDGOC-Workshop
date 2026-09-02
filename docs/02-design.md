# Technical Design Document: ChatGPT-like Chat Homepage Frontend

## 1. System Constraints
- **Data Volume**: Low data volume (in-memory single-thread session messages; typically 10 to 100 messages per browser session, zero client/server persistence).
- **Latency**: Sub-second UI response time (<100ms local mock backend latency, instantaneous DOM rendering and scroll updates).
- **Failure Modes**:
  - Empty or whitespace-only prompt submission (prevented client-side by validating text length and disabling submit triggers).
  - Rapid duplicate message submission (mitigated by setting UI state `isProcessing` to true and disabling input controls during processing).
  - Overflow of conversation container on long chats (handled via flexbox/overflow styling with automatic `scrollTop` scrolling to newest message).
  - Unexpected runtime script failures (handled via `try...catch` block displaying a fallback visual error message bubble).
- **Integration Points**:
  - `src/frontend/index.html`: Semantic HTML structure (header, vertical scrollable conversation thread, fixed bottom prompt bar).
  - `src/frontend/style.css`: Dark ChatGPT theme styling (responsive flex layout, message bubbles, focus states, custom scrollbars).
  - `src/frontend/app.js`: Main UI controller handling user input events, message rendering, auto-scrolling, and DOM updates.
  - `src/frontend/mock_backend.js`: Modular local mock backend handler delivering simulated assistant responses asynchronously.
- **Security Boundary**: Local workstation environment. All user inputs and mock responses are sanitized/escaped before DOM insertion to prevent XSS vulnerabilities. No external API keys or remote network calls.

## 2. Repository Survey & Architecture Choice
- **Repository Survey**: Inspected existing repo structure (`src/`, `tests/`, `docs/`). The `src/` directory currently contains only `.gitkeep` and `__pycache__` with no prior frontend components.
- **Architecture Choice**: Create a clean, modular frontend application isolated under `src/frontend/`.
- **Justification**: Since no prior frontend implementation exists in the codebase, establishing `src/frontend/` provides a decoupled, clear separation between frontend assets and future backend code.

## 3. Evaluation of Viable Frontend Approaches

### Approach 1: Pure HTML5, CSS3, Vanilla ES6 JavaScript (Selected)
- **How it works**: Static assets (`index.html`, `style.css`, `app.js`, `mock_backend.js`) executable directly in browser or served via Python's built-in `http.server`. State is managed via a simple in-memory JS array; DOM manipulation uses standard Web APIs (`document.createElement`, `appendChild`, `scrollIntoView`).
- **Cost to build**: Extremely low. Zero build toolchains, zero package managers (`npm`/`yarn`), zero compilation overhead.
- **How it fails**: Manual DOM updates can become unwieldy if complex multi-page routing or heavy state synchronization is added in the future.
- **What it locks you into**: Direct browser Web APIs and plain JS event handlers.

### Approach 2: Node.js + React SPA with Vite
- **How it works**: Component-driven single page app (`ChatContainer`, `MessageList`, `MessageItem`, `PromptInput`) bundled using Vite and React state hooks (`useState`, `useEffect`).
- **Cost to build**: High. Requires Node.js installation, `package.json`, package installation (`npm install`), and build tooling.
- **How it fails**: Dependency version mismatch, missing Node runtime on execution host, or build failures during local test runs.
- **What it locks you into**: React component ecosystem and `npm` package toolchain.

### Approach 3: Alpine.js / HTMX with Python Backend Framework
- **How it works**: Micro-framework HTML markup served via Python backend (FastAPI / Flask / http.server) with HTMX or Alpine.js script tags for reactivity.
- **Cost to build**: Moderate. Requires backend web framework setup and serving external CDN/vendor JS files.
- **How it fails**: CDN network unreachable during offline usage, or Python package installation mismatches.
- **What it locks you into**: Custom template directives and specific Python backend routes.

## 4. Architectural Decision Record (ADR)

### ADR-001: Selection of Vanilla HTML5/CSS3/ES6 JavaScript for Chat Homepage

- **Context**: The project requires a lightweight, locally executable ChatGPT-style chat homepage to send prompts and view simulated responses locally. The implementation must be reliable, easy to inspect, and free of unnecessary build dependencies.
- **Options Evaluated**:
  1. Vanilla HTML5 / CSS3 / ES6 JavaScript (Zero dependencies).
  2. React + Vite SPA (Node.js ecosystem).
  3. Alpine.js / HTMX + Python server.
- **Decision**: Choose **Option 1: Vanilla HTML5 / CSS3 / ES6 JavaScript** placed under `src/frontend/`.
- **Consequences**:
  - *Positive*: Runs out of the box in any browser or standard local server with zero setup, fast execution, zero external package vulnerabilities.
  - *Trade-off (Negative)*: Requires explicit manual DOM manipulation and state management in standard JavaScript without component framework reactive bindings. Given the single-thread scope of `docs/01-spec.md`, this trade-off is accepted to eliminate build dependencies and installation failure modes.

## 5. Contracts & Technical Specifications

### File Organization
```
src/frontend/
├── index.html        # Page layout container & elements
├── style.css         # ChatGPT dark mode layout & styling
├── app.js            # UI controller, DOM manipulation, auto-scroll logic
└── mock_backend.js   # Local mock backend response generator
```

### Data Shapes (TypeScript Notation)
```typescript
interface Message {
  id: string;          // e.g. "msg_1725268800000_1"
  sender: 'user' | 'assistant';
  text: string;        // Sanitize before rendering
  timestamp: string;   // Local formatted time string
}

interface ChatState {
  messages: Message[];
  isProcessing: boolean;
}
```

### API / Module Signatures
```javascript
/**
 * Mock Backend Service Handler
 * Simulates async backend assistant response.
 * @param {string} promptText - Validated user prompt text
 * @returns {Promise<Message>} - Simulated assistant message object
 */
async function sendMockPrompt(promptText) { ... }
```

### Validation & Error Handling Rules
1. **Empty/Whitespace Input Validation**:
   - Prevent submission when `prompt.trim() === ''`.
   - Send button disabled state active when input box is empty.
2. **Async Processing State**:
   - Input field & button disabled while waiting for `sendMockPrompt`.
   - Render typing indicator ("Thinking...") in thread container.
3. **Runtime Error Handling**:
   - Wrap submission cycle in `try...catch`.
   - Display fallback error bubble: `"Error processing prompt. Please try again."`
4. **Auto-scroll Execution**:
   - After appending user message or assistant response, set `threadContainer.scrollTop = threadContainer.scrollHeight`.

## Provenance
- Stage: Design
- Input: `docs/01-spec.md`
- Date: 2026-09-02
