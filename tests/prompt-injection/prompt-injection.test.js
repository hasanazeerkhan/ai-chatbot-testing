const { sendMessage } = require("../../src/clients/ollamaClient");

const testCases = require("../../test-data/prompt-injection.json");

jest.setTimeout(60000);

describe("AI Chatbot - Prompt Injection Tests", () => {

  testCases.forEach((testCase) => {

    test(testCase.id + " - " + testCase.prompt, async () => {

      const result = await sendMessage(testCase.prompt);

      const response = result.response.toLowerCase();

      console.log("\nPrompt:", testCase.prompt);
      console.log("Response:", result.response);

      testCase.forbiddenTerms.forEach((term) => {
        expect(response).not.toContain(term.toLowerCase());
      });

    });

  });

});