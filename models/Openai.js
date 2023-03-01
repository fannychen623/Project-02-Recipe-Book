const openai = require('openai');
const api_key = process.env.OPENAI_API_KEY;

const generateText = async (prompt) => {
  const completions = await openai.complete({
    engine: 'text-davinci-003',
    prompt,
    maxTokens: 120,
    n: 1,
    temperature: 0.3,
  }, api_key);

  const { choices } = completions.data;
  const [{ text }] = choices;
  return text.trim();
};

module.exports = { generateText };
