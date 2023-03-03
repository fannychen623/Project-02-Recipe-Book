const router = require('express').Router();
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.post("/", async (req, res) => {
  const prompt = req.body.ingredientPrompt;
  try {
    if (prompt == null) {
      throw new Error("Uh oh, no ingredients were provided");
    }
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0.3,
      max_tokens: 120,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    const completion = response.data.choices[0].text;
   
    let title = completion.substring(2, completion.indexOf("Ingredients:") - 2);
    let ingredients = completion.substring(
      completion.indexOf("Ingredients:") + 12, 
      completion.lastIndexOf("Instructions:") - 2);
    ingredients = ingredients.trim();
    ingredients = ingredients.replace(/- /g, "").replace(/-/g, "");
    let instructions = completion.substring(
      completion.indexOf("Instructions:") + 13);
    instructions = instructions.trim();
    instructions = instructions.replace(/\n\n/g, "\n")

    return res.send({
      success: true,
      title,
      ingredients,
      instructions,
    });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;