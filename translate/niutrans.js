const axios = require('axios');

class niutrans {
    constructor(key, apiUrl = 'https://api.niutrans.com/NiuTransServer/translation') {
        this.key = key
        this.apiUrl = apiUrl
    }

    async translate(text, targetLanguage, sourceLanguage = 'auto') {
        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            const params = JSON.stringify({
                'apikey': this.key,
                "src_text": text,
                "from": sourceLanguage,
                "to": targetLanguage
            });
            const response = await axios.post(this.apiUrl, params,{headers});
            return response.data.tgt_text
        } catch (error) {
            throw new Error(`Error while translating: ${error.message}`);
        }
    }
}

module.exports = niutrans;
