require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { generateRecipe } = require("./services/gemini");
const { buildHTML } = require("./utils/template");
const { generatePDF } = require("./utils/PdfGenerator");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/generate-recipe", async (req, res) => {
  try {
    const { ingredients } = req.body;
    if (!ingredients || !Array.isArray(ingredients)) {
      return res.status(400).json({ msg: "Invalid ingredients input" });
    }

    const recipeContent = await generateRecipe(ingredients);
    const html = buildHTML(recipeContent);
    const pdfPath = await generatePDF(html);

    res.status(200).json({
      msg: "Recipe generated successfully",
      recipe: recipeContent,
      pdf: pdfPath,
    });
  } catch (error) {
    console.error("Recipe generation failed:", error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
