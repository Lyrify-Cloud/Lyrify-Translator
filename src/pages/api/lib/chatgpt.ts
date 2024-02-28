// code from sipc

import axios from "axios";
import { getErrorMessage } from "@/pages/api/lib/utils";

export class ChatGPT {
  public key: string;
  public apiUrl: string;
  public model: string;

  constructor(
    key: string,
    apiUrl = "https://api.openai.com/v1/chat/completions",
    model = "gpt-3.5-turbo",
  ) {
    this.key = key;
    this.apiUrl = apiUrl;
    this.model = model;
  }

  async translate(text: string, target: string, source: string = "auto") {
    if (target === "classical-chinese") {
      target = "文言文";
      if (source === "zh") {
        source = "白话文";
      }
    }
    if (source === "classical-chinese") {
      source = "文言文";
      if (target === "zh") {
        target = "白话文";
      }
    }
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.key}`,
      };
      const data = JSON.stringify({
        model: this.model,
        messages: [
          {
            role: "system",
            content: `You are a professional, authentic translation engine, only returns translations.`,
          },
          {
            role: "user",
            content: `Please translate the text from ${source} to ${target} language,Translation will be enclosed within <start></end> tags, and they should not be included in the output.`,
          },
          {
            role: "user",
            content: `<start>${text}</end>`,
          },
        ],
        temperature: 0.7,
      });
      const response = await axios.post(this.apiUrl, data, { headers });
      return response.data.choices[0].message.content;
    } catch (error) {
      throw new Error(`Error while translating: ${getErrorMessage(error)}`);
    }
  }
}

export const ChatGPTInstance = new ChatGPT(
  process.env.OpenAI_API_KEY!,
  process.env.OpenAI_API_ENDPOINT!,
  process.env.OpenAI_MODEL!,
);
