import axios from "axios";
import { getErrorMessage } from "@/pages/api/lib/utils";

export class Transmart {
  API_TRANSLATE = "https://yi.qq.com/api/imt";

  constructor() {}

  async translate(
    text: string,
    targetLanguage: string,
    sourceLanguage: string = "en",
  ) {
    try {
      const source_lang = sourceLanguage;
      const target_lang = targetLanguage;

      const post_data = this.initData(source_lang, target_lang, text);
      const post_str = JSON.stringify(post_data);

      const response = await axios.post(this.API_TRANSLATE, post_str, {
        headers: {
          "Content-Type": "application/json",
          "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
          referer: "https://yi.qq.com/zh-CN/index",
        },
      });

      if (
        response.data &&
        response.data.auto_translation &&
        response.data.auto_translation.length
      ) {
        return response.data.auto_translation[0];
      } else {
        const errMsg = response.data
          ? JSON.stringify(response.data)
          : "Unknown error";
        throw new Error(`Translation API Error: ${errMsg}`);
      }
    } catch (error) {
      throw new Error(`Error during translation: ${getErrorMessage(error)}`);
    }
  }
  initData(source_lang: string, target_lang: string, translate_text: string) {
    return {
      header: {
        fn: "auto_translation",
        client_key:
          "browser-chrome-110.0.0-Mac OS-df4bd4c5-a65d-44b2-a40f-42f34f3535f2-1677486696487",
      },
      type: "plain",
      model_category: "normal",
      source: {
        lang: source_lang,
        text_list: [translate_text],
      },
      target: {
        lang: target_lang,
      },
    };
  }
}

export const TransmartInstance = new Transmart();
