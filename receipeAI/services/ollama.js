const axios = require("axios");

exports.generateRecipe = async (ingredients) => {
  const prompt = `Create a unique recipe using these ingredients: ${ingredients.join(
    ", "
  )}.
Include:
1. A creative title.
2. Quantities for each ingredient.
3. Minimum 5 preparation steps.`;

  const response = await axios.post("http://localhost:11434/api/generate", {
    model: "phi",
    prompt,
    stream: false,
  });

  const result = response.data.response;

  const titleMatch = result.match(/Recipe Title:\s*(.*)/);
  const title = titleMatch ? titleMatch[1] : "AI-Generated Recipe";

  const ingredientsBlock = result
    .split("Ingredients:")[1]
    .split("Steps:")[0]
    .trim();
  const stepsBlock = result.split("Steps:")[1].trim();

  return {
    title,
    ingredientsWithQuantities: ingredientsBlock,
    steps: stepsBlock,
  };
};
