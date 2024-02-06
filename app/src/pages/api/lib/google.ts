import { translate } from "google-translate-api-x";
import { getErrorMessage } from "@/pages/api/lib/utils";

export class Google {
  async translate(text: string, target: string, source: string = "auto") {
    try {
      const response = await translate(text, {
        from: source,
        forceFrom: true,
        to: target,
        forceTo: true,
      });
      if (response.text) {
        return response.text;
      } else {
        throw new Error("Invalid response from Google");
      }
    } catch (error) {
      throw new Error(`Error while translating: ${getErrorMessage(error)}`);
    }
  }
}

export const GoogleInstance = new Google();
