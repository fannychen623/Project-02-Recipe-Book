const express = require('express');
const router = express.Router();
const { generateText } = require('../models/Openai');

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/generate-text', async (req, res) => {
  const { prompt } = req.body;
  const generatedText = await generateText(prompt);
  res.render('index', { generatedText });
});

module.exports = router;
