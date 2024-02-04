var express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()
var langdetect = require('langdetect');
const DeepLX_require = require('./lib/translate/deeplx');
const Microsoft_require = require('./lib/translate/microsoft');
const ChatGPT_require = require('./lib/translate/chatgpt');
const Google_require = require('./lib/translate/google');
const m2m100_require = require('./lib/translate/m2m100');
const niutrans_require = require('./lib/translate/niutrans');


var app = express();

const DeepLX = new DeepLX_require('https://api.sipc.ink/translate');
const Microsoft = new Microsoft_require();
const ChatGPT = new ChatGPT_require(process.env.GPT_Key, process.env.GPT_API, 'azure-gpt-3.5-turbo');
const Google = new Google_require();
const m2m100 = new m2m100_require();
const niutrans = new niutrans_require(process.env.niutrans_Key);


app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/translate', async function (req, res) {
    try {
        const [ChatGPT_translate, DeepLX_translate, Microsoft_translate, Google_translate, m2m100_translate, niutrans_translate] = await Promise.all([
            ChatGPT.translate(req.body.text, req.body.targetLanguage, req.body.sourceLanguage)
                .catch(error => ({ error: `ChatGPT translation error: ${error.message}` })),
            DeepLX.translate(req.body.text, req.body.targetLanguage, req.body.sourceLanguage)
                .catch(error => ({ error: `DeepLX translation error: ${error.message}` })),
            Microsoft.translate(req.body.text, req.body.targetLanguage, req.body.sourceLanguage)
                .catch(error => ({ error: `Microsoft translation error: ${error.message}` })),
            Google.translate(req.body.text, req.body.targetLanguage, req.body.sourceLanguage)
                .catch(error => ({ error: `Google translation error: ${error.message}` })),
            m2m100.translate(req.body.text, req.body.targetLanguage, req.body.sourceLanguage)
                .catch(error => ({ error: `m2m100 translation error: ${error.message}` })),
            niutrans.translate(req.body.text, req.body.targetLanguage, req.body.sourceLanguage)
                .catch(error => ({ error: `niutrans translation error: ${error.message}` }))
        ]);

        res.json({
            ChatGPT_translate: (ChatGPT_translate.error) ? undefined : ChatGPT_translate,
            DeepLX_translate: (DeepLX_translate.error) ? undefined : DeepLX_translate,
            Microsoft_translate: (Microsoft_translate.error) ? undefined : Microsoft_translate,
            Google_translate: (Google_translate.error) ? undefined : Google_translate,
            m2m100_translate: (m2m100_translate.error) ? undefined : m2m100_translate,
            niutrans_translate: (niutrans_translate.error) ? undefined : niutrans_translate
        });
    } catch (error) {
        console.error('Translation error:', error);
        res.status(500).json({ error: 'Translation failed' });
    }
});

app.post('/language', async function (req, res) {
    var detectionMap = {
        "zh-cn": "zh",
        "zh-tw": "zh",
    };
    try {
        var detectedLang = langdetect.detectOne(req.body.text);
        var updatedLang = detectionMap[detectedLang] || detectedLang;
        res.json({ original: req.body.text, lang: updatedLang });
    } catch (error) {
        console.error('Error detecting language:', error);
        res.json({ original: req.body.text });
    }
});


app.listen(3000, function () {
    console.log('Lyrify listening on port 3000!');
});
