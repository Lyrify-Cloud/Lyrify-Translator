// code from sipc

const md5 = require('md5');
import axios from "axios";
import { getErrorMessage } from "@/pages/api/lib/utils";

export class Sougou {
    public Cookie: string;
    constructor(Cookie:string) {
        this.Cookie = Cookie;
    }

    async translate(text: string, targetLanguage: string, sourceLanguage = "auto") {
        try {
            const Headers = {
                'Host': 'fanyi.sogou.com',
                'Origin': 'https://fanyi.sogou.com',
                'Referer': 'https://fanyi.sogou.com/text',
                'Content-Type': 'application/json;charset=UTF-8',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 Edg/123.0.0.0',
                'Cookie': this.Cookie
            }
            const { data } = await axios.post("https://fanyi.sogou.com/api/transpc/text/result",
                {
                    'from': sourceLanguage,
                    'to': targetLanguage,
                    'text': text,
                    's': md5(sourceLanguage+targetLanguage+text+'109984457'),
                }, { headers: Headers });
            return data.data.translate.dit;

        } catch (error) {
            throw new Error(`Error while translating: ${getErrorMessage(error)}`);
        }
    }
}

export const SougouInstance = new Sougou(
    process.env.SOUGOU_Cookie as string,
);

