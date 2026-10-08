const { sendMessage } = require("../../src/clients/ollamaClient");

jest.setTimeout(60000);

test("should retain information across multiple conversation turns", async () => {

  let conversation = [];

  let result = await sendMessage(
    "My name is Hasan.",
    conversation
  );

  conversation = result.conversation;

  result = await sendMessage(
    "I work as an Automation Engineer.",
    conversation
  );

  conversation = result.conversation;

  result = await sendMessage(
    "What is my name and what do I do?",
    conversation
  );

  console.log("\nFinal Response:", result.response);

  expect(result.response.toLowerCase()).toContain("hasan");
  expect(result.response.toLowerCase()).toContain("automation");

});