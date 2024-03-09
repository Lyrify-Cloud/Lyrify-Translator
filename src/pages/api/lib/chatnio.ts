// code from sipc

import axios from "axios";
import { getErrorMessage } from "@/pages/api/lib/utils";

export class ChatNio {
  public key: string;

  constructor(key: string) {
    this.key = key;
  }

  async translate(
    model: string,
    text: string,
    target: string,
    source: string = "auto",
  ) {
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
        model,
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
      const response = await axios.post(
        "https://api.chatnio.net/v1/chat/completions",
        data,
        { headers },
      );
      return response.data.choices[0].message.content;
    } catch (error) {
      throw new Error(`Error while translating: ${getErrorMessage(error)}`);
    }
  }
}

export const ChatNioInstance = new ChatNio(process.env.ChatNio_API_KEY!);
