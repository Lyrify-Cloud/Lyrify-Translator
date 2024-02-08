const axios = require("axios");

class Gemini {
  constructor(key, apiUrl = "https://generativelanguage.googleapis.com") {
    this.key = key;
    this.apiUrl = apiUrl;
  }

  async translate(text, targetLanguage, sourceLanguage = "auto") {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const data = JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `将"${text}"从${sourceLanguage}翻译为${targetLanguage}(!!!直接返回翻译内容不要打引号)`,
              },
            ],
          },
        ],
      });
      const response = await axios.post(`${this.apiUrl}/v1beta/models/gemini-pro:generateContent?key=${this.key}`,data,{ headers },);
      return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.log(JSON.stringify(error));
      throw new Error(`Error while translating: ${error.message}`);
    }
  }
}

module.exports = Gemini;
