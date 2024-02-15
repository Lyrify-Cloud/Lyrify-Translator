// code from sipc

const puppeterr = require('puppeteer')
import { getErrorMessage } from "@/pages/api/lib/utils";

export class Sougou {
    constructor() {}

    async translate(text: string, targetLanguage: string, sourceLanguage = "auto") {
        try {
            const browser = await puppeterr.launch();
            const page = await browser.newPage();
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
            await page.goto(`https://fanyi.sogou.com/text?keyword=${text}&transfrom=auto&transto=${targetLanguage}&model=general`);
            const translatedText = await page.$eval('#trans-result', (element: { textContent: any; }) => element.textContent);
            browser.close();
            return translatedText.trim();
        } catch (error) {
            throw new Error(`Error while translating: ${getErrorMessage(error)}`);
        }
    }
}

export const SougouInstance = new Sougou();

