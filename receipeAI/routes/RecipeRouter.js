const express = require("express");
const router = express.Router();
const ollamaService = require("../services/ollama");
const geminiService = require("../services/gemini");
const { buildHTML } = require("../utils/template");
const { generatePDF } = require("../utils/PdfGenerator");

router.post("/generate-recipe", async (req, res) => {
  try {
    const { ingredients } = req.body;
    if (!ingredients || !Array.isArray(ingredients)) {
      return res.status(400).json({ msg: "Provide valid ingredients array" });
    }

    const rawRecipe = await ollamaService.generateRecipe(ingredients);
    const refinedSteps = await geminiService.rewriteSteps(rawRecipe.steps);
    const nutrition = await geminiService.getNutritionEstimate(ingredients);

    const finalRecipe = {
      title: rawRecipe.title,
      ingredients: rawRecipe.ingredientsWithQuantities,
      steps: refinedSteps,
      nutrition,
    };

    const htmlContent = buildHTML(finalRecipe);
    const pdfPath = await generatePDF(htmlContent);

    res
      .status(200)
      .json({ msg: "Recipe generated", recipe: finalRecipe, pdf: pdfPath });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal error" });
  }
});

module.exports = router;
