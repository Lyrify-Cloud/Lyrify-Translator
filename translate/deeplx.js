const axios = require('axios');

class DeepLX {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async translate(text, targetLanguage, sourceLanguage = 'auto') {
    try {
      const response = await axios.post(this.apiUrl, {
        text,
        target_lang: targetLanguage,
        source_lang: sourceLanguage,
      });

      if (response.data && response.data.data) {
        return response.data.data;
      } else {
        throw new Error('Invalid response from DeepLX');
      }
    } catch (error) {
      throw new Error(`Error while translating: ${error.message}`);
    }
  }
}

module.exports = DeepLX;
