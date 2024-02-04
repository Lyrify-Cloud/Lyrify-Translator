const axios = require('axios');

class ChatGPT {
    constructor(key, apiUrl = 'https://api.openai.com/v1/chat/completions') {
        this.key = key
        this.apiUrl = apiUrl
    }

    async translate(text, targetLanguage, sourceLanguage = 'auto') {
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.key}`
            };
            const data = JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [{ "role": "user", "content": `将"${text}"从${sourceLanguage}翻译为${targetLanguage}(!!!直接返回翻译内容不要打引号)` }],
                "temperature": 0.7
            });
            const response = await axios.post(this.apiUrl, data, { headers });
            return response.data.choices[0].message.content
        } catch (error) {
            throw new Error(`Error while translating: ${error.message}`);
        }
    }
}

module.exports = ChatGPT;
