const { sendMessage } = require("../../src/clients/ollamaClient");
const { evaluateResponse } = require("../../src/evaluation/evaluator");

const testCases = require("../../test-data/hallucination.json");

jest.setTimeout(60000);

describe("AI Chatbot - Hallucination Tests", () => {

  testCases.forEach((testCase) => {

    test(testCase.id + " - " + testCase.prompt, async () => {

      const result = await sendMessage(testCase.prompt);

      const response = result.response;

      console.log("\nPrompt:", testCase.prompt);
      console.log("Response:", response);

      const evaluation = await evaluateResponse(
        testCase.prompt,
        response,
        testCase.expectedAnswer
      );

      console.log("Evaluation:", evaluation);

      expect(evaluation.pass).toBe(true);
      expect(evaluation.score).toBeGreaterThanOrEqual(8);

    });

  });

});