document.addEventListener('DOMContentLoaded', () => {
  const chatThread = document.getElementById('chat-thread');
  const promptForm = document.getElementById('prompt-form');
  const promptInput = document.getElementById('prompt-input');
  const sendBtn = document.getElementById('send-btn');
  const typingIndicator = document.getElementById('typing-indicator');

  const state = {
    messages: [],
    isProcessing: false
  };

  /**
   * Sanitizes text string and creates a text node or text element safely.
   * Security Boundary: XSS Prevention
   */
  function createSanitizedTextElement(tagName, className, textContent) {
    const el = document.createElement(tagName);
    if (className) el.className = className;
    el.textContent = textContent;
    return el;
  }

  function updateSendButtonState() {
    const hasValue = promptInput.value.trim().length > 0;
    sendBtn.disabled = !hasValue || state.isProcessing;
  }

  function autoResizeInput() {
    promptInput.style.height = 'auto';
    promptInput.style.height = `${Math.min(promptInput.scrollHeight, 200)}px`;
  }

  function scrollToBottom() {
    if (chatThread) {
      chatThread.scrollTop = chatThread.scrollHeight;
    }
  }

  function setProcessing(isProcessing) {
    state.isProcessing = isProcessing;
    promptInput.disabled = isProcessing;
    updateSendButtonState();

    if (typingIndicator) {
      if (isProcessing) {
        typingIndicator.classList.remove('hidden');
      } else {
        typingIndicator.classList.add('hidden');
      }
    }
  }

  function renderMessage(sender, text, timestamp, isError = false) {
    // Remove welcome message on first prompt
    const welcomeMsg = chatThread.querySelector('.welcome-message');
    if (welcomeMsg) {
      welcomeMsg.remove();
    }

    const row = document.createElement('div');
    row.className = `message-row ${sender}`;

    const bubble = createSanitizedTextElement('div', `message-bubble ${isError ? 'error-bubble' : ''}`, text);
    row.appendChild(bubble);

    if (timestamp) {
      const timeEl = createSanitizedTextElement('div', 'message-timestamp', timestamp);
      row.appendChild(timeEl);
    }

    chatThread.appendChild(row);
    scrollToBottom();
  }

  async function handleSubmit(event) {
    if (event) event.preventDefault();

    const promptText = promptInput.value.trim();
    if (!promptText || state.isProcessing) return;

    const userTimestamp = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    // Add user message to state and DOM
    state.messages.push({ sender: 'user', text: promptText, timestamp: userTimestamp });
    renderMessage('user', promptText, userTimestamp);

    // Reset input field
    promptInput.value = '';
    promptInput.style.height = 'auto';
    setProcessing(true);

    try {
      if (typeof sendMockPrompt !== 'function') {
        throw new Error('sendMockPrompt handler is not defined');
      }

      const response = await sendMockPrompt(promptText);
      state.messages.push(response);
      renderMessage('assistant', response.text, response.timestamp);
    } catch (err) {
      console.error('Error during prompt submission:', err);
      renderMessage('assistant', 'Error processing prompt. Please try again.', null, true);
    } finally {
      setProcessing(false);
      promptInput.focus();
    }
  }

  // Event Listeners
  promptInput.addEventListener('input', () => {
    autoResizeInput();
    updateSendButtonState();
  });

  promptInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!sendBtn.disabled) {
        handleSubmit();
      }
    }
  });

  promptForm.addEventListener('submit', handleSubmit);

  // Initial setup
  promptInput.focus();
});
