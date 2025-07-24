const puppeteer = require("puppeteer");
const path = require("path");

exports.generatePDF = async (html) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  const fileName = `recipe_${Date.now()}.pdf`;
  const pdfPath = path.join(__dirname, "..", fileName);

  await page.pdf({ path: pdfPath, format: "A4" });
  await browser.close();

  return pdfPath;
};
