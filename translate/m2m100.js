const axios = require('axios');

class m2m100 {
    constructor() {
        this.apiUrl = 'https://translated.api.sipc.ink';
    }

    async translate(text, targetLanguage, sourceLanguage = 'auto') {
        try {
            const apiUrl = this.apiUrl + `?text=${text}&source_lang=${sourceLanguage}&target_lang=${targetLanguage}`
            const response = await axios.get(apiUrl);
            if (response.data && response.data.response) {
                return response.data.response.translated_text;
            } else {
                throw new Error('Invalid response from m2m100');
            }
        } catch (error) {
            throw new Error(`Error while translating: ${error.message}`);
        }
    }
}

module.exports = m2m100;
