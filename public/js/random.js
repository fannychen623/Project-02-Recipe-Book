// controller.js

const axios = require("axios");

const endpoint = "https://api.openai.com/v1/engines/davinci-codex/completions";
const headers = {
  "Authorization": "Bearer YOUR_API_KEY",
  "Content-Type": "application/json"
};

function handleFormSubmit(req, res) {
  const inputText = req.body.inputText;

  const payload = {
    prompt: inputText,
    max_tokens: 50,
    n: 1,
    stop: "\n"
  };

  axios.post(endpoint, payload, { headers: headers })
    .then(response => {
      const completionText = response.data.choices[0].text;
      res.render("result", { completionText: completionText });
    })
    .catch(error => {
      const error_message = `Error ${error.response.status}: ${error.response.statusText}`;
      res.render("error", { error_message: error_message });
    });
}

module.exports = {
  handleFormSubmit: handleFormSubmit
};
