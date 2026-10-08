const { Ollama } = require("ollama");
const { evaluationSchema } = require("./schemas");

const ollama = new Ollama();

async function evaluateResponse(prompt, response, expectedAnswer) {

  const evaluationPrompt = `
You are an AI response evaluator.

Evaluate whether the chatbot response correctly answers the user's question.

User Question:
${prompt}

Expected Answer:
${expectedAnswer}

Chatbot Response:
${response}

Return ONLY valid JSON:

{
  "pass": true,
  "score": 10,
  "reason": "The response correctly answers the question."
}

Rules:
- score must be between 0 and 10
- pass must be true when score >= 8
- pass must be false when score < 8
- reason must briefly explain the decision
`;

  const result = await ollama.chat({
    model: "llama3.2",
    messages: [
      {
        role: "user",
        content: evaluationPrompt
      }
    ]
  });

  const rawResponse = result.message.content;

  try {
    const parsedResponse = JSON.parse(rawResponse);

    return evaluationSchema.parse(parsedResponse);

  } catch (error) {

    throw new Error(
      `Invalid evaluator response:\n${rawResponse}\n\n${error.message}`
    );
  }
}

module.exports = { evaluateResponse };