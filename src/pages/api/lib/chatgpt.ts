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
    if (target === 'classical-chinese') {
      target = '文言文'
      if (source === 'zh') {
        source = '白话文'
      }
    } if (source === 'classical-chinese') {
      source = '文言文'
      if (target === 'zh') {
        target = '白话文'
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
            role: "user",
            content: `请将以下文本从${source}翻译为${target}:“${text}”(要求：输出的结果只能出现翻译结果，需要准确且清晰，不得出现翻译结果以外的内容，输出结果不可以带任何特殊的文本样式,'',""不得出现)`,
          },
        ],
        temperature: 0.4,
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
