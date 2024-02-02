const axios = require('axios');

class ChatGPT {
    constructor() {
        this.apiUrl = 'https://api.sipc.ink/chat';
    }

    async translate(text, targetLanguage, sourceLanguage = 'auto') {
        try {
            const apiUrl = this.apiUrl + `?message=将"${text}"从${sourceLanguage}翻译为${targetLanguage}(直接返回翻译内容)&model=gpt-3.5-turbo`
            const response = await axios.get(apiUrl);
            if (response.data && response.data.response) {
                return response.data.response;
            } else {
                throw new Error('Invalid response from ChatGPT');
            }
        } catch (error) {
            throw new Error(`Error while translating: ${error.message}`);
        }
    }
}

module.exports = ChatGPT;
