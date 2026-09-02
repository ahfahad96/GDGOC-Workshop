/**
 * Mock Backend Service Handler
 * Simulates async backend assistant response.
 * @param {string} promptText - Validated user prompt text
 * @returns {Promise<Object>} - Simulated assistant message object
 */
async function sendMockPrompt(promptText) {
  // Artificial network delay between 100ms and 300ms
  const delay = Math.floor(Math.random() * 200) + 100;
  await new Promise((resolve) => setTimeout(resolve, delay));

  const trimmed = promptText.trim();
  const timestamp = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const responses = [
    `This is a simulated assistant response to: "${trimmed}"`,
    `I received your prompt: "${trimmed}". How else can I help you today?`,
    `Thanks for your message! Here is a mock response regarding "${trimmed}".`
  ];

  const responseText = responses[Math.floor(Math.random() * responses.length)];

  return {
    id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    sender: 'assistant',
    text: responseText,
    timestamp: timestamp
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { sendMockPrompt };
} else {
  window.sendMockPrompt = sendMockPrompt;
}
