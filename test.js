const DeepLX_require = require('./translate/deeplx');
const Microsoft_require = require('./translate/microsoft');
const ChatGPT_require = require('./translate/chatgpt');
const Google_require = require('./translate/google');
const m2m100_require = require('./translate/m2m100');

const DeepLX = new DeepLX_require('https://api.sipc.ink/translate');
const Microsoft = new Microsoft_require();
const ChatGPT = new ChatGPT_require();
const Google = new Google_require();
const m2m100 = new m2m100_require();

const textToTranslate = "Intellij platform i18n plugin，Auto translate 131 languages for your application with one click，Support Android strings.xml and java .properties file";
const sourceLanguage = 'en'
const targetLanguage = 'zh';
console.log(`Original: ${textToTranslate}`);

DeepLX.translate(textToTranslate, targetLanguage, sourceLanguage)
    .then(translatedText => {
        console.log(`DeepLX: ${translatedText}`);
    })
    .catch(error => {
        console.error(`DeepLX error: ${error.message}`);
    });

Microsoft.translate(textToTranslate, targetLanguage, sourceLanguage)
    .then(translatedText => {
        console.log(`Microsoft: ${translatedText}`);
    })
    .catch(error => {
        console.error(`Microsoft error: ${error.message}`);
    });

ChatGPT.translate(textToTranslate, targetLanguage, sourceLanguage)
    .then(translatedText => {
        console.log(`ChatGPT: ${translatedText}`);
    })
    .catch(error => {
        console.error(`ChatGPT error: ${error.message}`);
    });

Google.translate(textToTranslate, targetLanguage, sourceLanguage)
    .then(translatedText => {
        console.log(`Google: ${translatedText}`);
    })
    .catch(error => {
        console.error(`Google error: ${error.message}`);
    });

m2m100.translate(textToTranslate, targetLanguage, sourceLanguage)
    .then(translatedText => {
        console.log(`m2m100: ${translatedText}`);
    })
    .catch(error => {
        console.error(`Google error: ${error.message}`);
    });
