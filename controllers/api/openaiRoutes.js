const router = require('express').Router();
require('dotenv').config();
// import OpenAI package
const { Configuration, OpenAIApi } = require("openai");

// pass in API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// launch new configuration
const openai = new OpenAIApi(configuration);

// call api
router.post("/", async (req, res) => {
  // define the prompt to send to api request body
  const prompt = req.body.ingredientPrompt;
  try {
    if (prompt == null) {
      throw new Error("Uh oh, no ingredients were provided");
    }
    // call for api response, set call settings based on api documentation
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0.3,
      max_tokens: 120,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    // select the first response as the result
    const completion = response.data.choices[0].text;
   
    // format results to desired format
    // separate title from result string
    let title = completion.substring(2, completion.indexOf("Ingredients:") - 2);
    // separate ingredients from result string
    let ingredients = completion.substring(
      completion.indexOf("Ingredients:") + 12, 
      completion.lastIndexOf("Instructions:") - 2);
    ingredients = ingredients.trim();
    ingredients = ingredients.replace(/- /g, "").replace(/-/g, "");
    // separate instructions from result string
    let instructions = completion.substring(
      completion.indexOf("Instructions:") + 13);
    instructions = instructions.trim();
    instructions = instructions.replace(/\n\n/g, "\n")

    // send request results back to function to pass into page
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