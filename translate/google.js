const translate = require('google-translate-api-x');

class Google {
    async translate(text, targetLanguage, sourceLanguage = 'auto') {
        try {
            const response = await translate(text, { from: sourceLanguage, forceFrom: true, to: targetLanguage, forceTo: true });
            if (response.text) {
                return response.text;
            } else {
                throw new Error('Invalid response from Google');
            }
        } catch (error) {
            throw new Error(`Error while translating: ${error}`);
        }
    }
}

module.exports = Google;
