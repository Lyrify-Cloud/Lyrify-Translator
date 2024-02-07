// code from sipc

import axios from "axios";
import { getErrorMessage } from "@/pages/api/lib/utils";

export class Niutrans {
  public key: string;
  public apiUrl: string;

  constructor(
    key: string,
    apiUrl = "https://api.niutrans.com/NiuTransServer/translation",
  ) {
    this.key = key;
    this.apiUrl = apiUrl;
  }

  async translate(
    text: string,
    targetLanguage: string,
    sourceLanguage = "auto",
  ) {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const params = JSON.stringify({
        apikey: this.key,
        src_text: text,
        from: sourceLanguage,
        to: targetLanguage,
      });
      const response = await axios.post(this.apiUrl, params, { headers });
      const result = response.data.tgt_text;
      if (!result) throw new Error("no response");
      return result as string;
    } catch (error) {
      throw new Error(`Error while translating: ${getErrorMessage(error)}`);
    }
  }
}

export const NiutransInstance = new Niutrans(
  process.env.NIUTRANS_KEY as string,
);
