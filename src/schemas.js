const { z } = require("zod");

const evaluationSchema = z.object({
  pass: z.boolean(),
  score: z.number().min(0).max(10),
  reason: z.string()
});

module.exports = { evaluationSchema };