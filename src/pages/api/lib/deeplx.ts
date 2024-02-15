// code from sipc

import axios from "axios";
import { getErrorMessage } from "@/pages/api/lib/utils";

export class DeepLX {
  public apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async translate(text: string, target: string, source: string = "auto") {
    try {
      const response = await axios.post(this.apiUrl, {
        text,
        target_lang: target,
        source_lang: source,
      });

      if (response.data && response.data.data) {
        return response.data.data;
      } else {
        throw new Error("Invalid response from DeepLX");
      }
    } catch (error) {
      throw new Error(`Error while translating: ${getErrorMessage(error)}`);
    }
  }
}

export const DeeplXInstance = new DeepLX(
  process.env.DEEPL_X_API_URL!,
);
