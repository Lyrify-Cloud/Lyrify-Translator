const axios = require("axios");
import { getErrorMessage } from "@/pages/api/lib/utils";

export class Gemini {
  public key: string;
  public apiUrl: string;
  constructor(
    key: string,
    apiUrl = "https://generativelanguage.googleapis.com",
  ) {
    this.key = key;
    this.apiUrl = apiUrl;
  }

  async translate(
    text: string,
    target: string,
    source: string = "auto",
  ) {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const data = JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `请将以下文本从${source}翻译为${target}:“${text}”(要求：输出的结果只能出现翻译结果，需要准确且清晰，不得出现翻译结果以外的内容，输出结果不可以带任何特殊的文本样式,'',""不得出现)`,
              },
            ],
          },
        ],
      });
      const response = await axios.post(
        `${this.apiUrl}/v1beta/models/gemini-pro:generateContent?key=${this.key}`,
        data,
        { headers },
      );
      if (response.data.candidates && response.data.candidates[0].content) {
        return response.data.candidates[0].content.parts[0].text;
      } else if (
        response.data.promptFeedback &&
        response.data.promptFeedback.blockReason
      ) {
        if (response.data.promptFeedback.blockReason == "SAFETY") {
          return "Request intercepted.";
        }
      } else if (
        response.data.candidates &&
        response.data.candidates[0].finishReason
      ) {
        if (response.data.candidates[0].finishReason == "SAFETY") {
          return "Request intercepted.";
        }
      } else {
        throw new Error(
          "No translation result, no block reason, and no finish reason available",
        );
      }
    } catch (error) {
      console.log(JSON.stringify(error));
      throw new Error(`Error while translating: ${getErrorMessage(error)}`);
    }
  }
}

export const GeminiInstance = new Gemini(
  process.env.Gemini_API_KEY as string,
  process.env.Gemini_API_ENDPOINT as string,
);
