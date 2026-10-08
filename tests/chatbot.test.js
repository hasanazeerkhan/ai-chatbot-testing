const { sendMessage } = require("../src/chatbot");
const { evaluateResponse } = require("../src/evaluator");

const testCases = require("../test-data/chatbot-tests.json");

jest.setTimeout(60000);

describe("AI Chatbot - Functional Tests", () => {

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