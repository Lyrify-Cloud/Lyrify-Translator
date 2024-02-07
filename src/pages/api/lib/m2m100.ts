// code from sipc

import { getErrorMessage } from "@/pages/api/lib/utils";

import axios from "axios";

export class M2m100 {
  public apiUrl: string;

  constructor() {
    this.apiUrl = "https://translated.api.sipc.ink";
  }

  async translate(text: string, target: string, source: string = "auto") {
    try {
      const apiUrl =
        this.apiUrl +
        `?text=${text}&source_lang=${source}&target_lang=${target}`;
      const response = await axios.get(apiUrl);
      if (response.data && response.data.response) {
        return response.data.response.translated_text;
      } else {
        throw new Error("Invalid response from m2m100");
      }
    } catch (error) {
      throw new Error(`Error while translating: ${getErrorMessage(error)}`);
    }
  }
}

export const M2m100Instance = new M2m100();
