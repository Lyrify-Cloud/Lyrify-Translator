var express = require('express');
const bodyParser = require('body-parser');
const DeepLX_require = require('./translate/deeplx');
const Microsoft_require = require('./translate/microsoft');
const ChatGPT_require = require('./translate/chatgpt');

var app = express();

const DeepLX = new DeepLX_require('https://api.sipc.ink/translate');
const Microsoft = new Microsoft_require();
const ChatGPT = new ChatGPT_require();

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/translate', function (req, res) {
  ChatGPT.translate(req.body.sentence, 'zh', 'en')
    .then(translatedText => {
      res.json({translatedText : translatedText});
    })
    .catch(error => {
      res.json({ message: error.message });
    })
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
