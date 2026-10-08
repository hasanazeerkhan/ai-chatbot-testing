const { Ollama } = require("ollama");

const ollama = new Ollama();

async function sendMessage(prompt, conversation = []) {

  const messages = [
    ...conversation,
    {
      role: "user",
      content: prompt
    }
  ];

  const response = await ollama.chat({
    model: "llama3.2",
    messages
  });

  return {
    response: response.message.content,
    conversation: [
      ...messages,
      {
        role: "assistant",
        content: response.message.content
      }
    ]
  };
}

module.exports = { sendMessage };