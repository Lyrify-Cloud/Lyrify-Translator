// code from sipc

import MD5 from "md5";
import axios from "axios";
import { getErrorMessage } from "@/pages/api/lib/utils";

const languageMap: Record<string, string> = {
  "ja": "jp",
  "fr": "fra",
  "es": "spa",
};

export class Baidu {
  public APPID: string;
  public APPKEY: string;

  constructor(APPID: string, APPKEY: string) {
    this.APPID = APPID;
    this.APPKEY = APPKEY;
  }
  async translate(text: string, target: string, source: string = "auto") {
    target = languageMap[target] || target
    source = languageMap[source] || source
    const salt = String(Math.random()).slice(2)
    const sign = MD5(this.APPID+text+salt+this.APPKEY)
    try {
      const apiUrl =`http://api.fanyi.baidu.com/api/trans/vip/translate?q=${text}&from=${source}&to=${target}&appid=${this.APPID}&salt=${salt}&sign=${sign}`;
      const response = await axios.get(apiUrl);
      if (response.data) {
        return response.data.trans_result[0].dst;
      } else {
        throw new Error("Invalid response from Baidu");
      }
    } catch (error) {
      throw new Error(`Error while translating: ${getErrorMessage(error)}`);
    }
  }
}

export const BaiduInstance = new Baidu(
  process.env.BAIDU_APP_ID!,
  process.env.BAIDU_KEY!,
);
