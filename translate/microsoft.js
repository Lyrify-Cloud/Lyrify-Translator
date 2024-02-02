const axios = require('axios');
const jwt = require('jsonwebtoken');

class Microsoft {
    constructor() {
        this.API_AUTH = 'https://edge.microsoft.com/translate/auth';
        this.API_TRANSLATE = 'https://api.cognitive.microsofttranslator.com/translate';
        this.authToken = ''
    }

    async translate(text, targetLanguage, sourceLanguage = 'en') {
        try {
            // 检测 JWT 是否存在/过期
            if (!this.authToken || jwt.decode(this.authToken).exp <= Date.now() / 1000) {
                const authResponse = await axios.get(this.API_AUTH);
                this.authToken = authResponse.data;
            }

            //请求 Microsoft translator API
            const apiUrl = `${this.API_TRANSLATE}?from=${sourceLanguage}&to=${targetLanguage}&api-version=3.0&includeSentenceLength=true`;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.authToken}`
            };
            const textObject = [{ text: text }];
            const response = await axios.post(apiUrl, textObject, { headers });
            if (response.status === 200 && response.data) {
                return response.data[0].translations[0].text;
            } else {
                throw new Error(`Invalid response from Microsoft: ${response.status}`);
            }
        } catch (error) {
            throw new Error(`Error while translating: ${error.message}`);
        }
    }
}

module.exports = Microsoft;
