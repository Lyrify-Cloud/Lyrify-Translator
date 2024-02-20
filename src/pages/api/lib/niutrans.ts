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
    target: string,
    source = "auto",
  ) {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const params = JSON.stringify({
        apikey: this.key,
        src_text: text,
        from: source,
        to: target,
      });
      const response = await axios.post(this.apiUrl, params, { headers });
      const result = response.data.tgt_text;
      if (!result) throw new Error("no response");
      return result!;
    } catch (error) {
      throw new Error(`Error while translating: ${getErrorMessage(error)}`);
    }
  }
}

export const NiutransInstance = new Niutrans(process.env.NIUTRANS_KEY!);
