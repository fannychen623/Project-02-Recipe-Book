const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "Write a recipe based on these ingredients:",
  temperature: 0.98,
  max_tokens: 120,
  top_p: 1.0,
  frequency_penalty: 0.0,
  presence_penalty: 0.0,
});


module.exports = { Configuration, OpenAIApi }