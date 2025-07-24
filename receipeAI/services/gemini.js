const axios = require("axios");

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

exports.generateRecipe = async (ingredients) => {
  const prompt = `
Generate a complete recipe using these ingredients: ${ingredients.join(", ")}.

Include:
1. A creative recipe title
2. Realistic quantity measurements for each ingredient
3. Minimum 5 cooking steps
4. Optional nutrition info (calories, protein, fat, carbs)

Format all sections clearly in plain text.
`;

  const response = await axios.post(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    contents: [{ parts: [{ text: prompt }] }],
  });

  const result = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!result) throw new Error("Gemini did not return recipe content");

  return { content: result };
};
