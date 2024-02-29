// code from sipc

import axios from "axios";
import jwt from "jsonwebtoken";
import { getErrorMessage } from "@/pages/api/lib/utils";

function generate_token(apikey: string) {
  const [apiKeyId, secret] = apikey.split(".");
  const headers = { alg: "HS256", sign_type: "SIGN" };
  const payload = {
    api_key: apiKeyId,
    exp: Date.now() + 30 * 1000,
    timestamp: Date.now(),
  };
  return jwt.sign(payload, secret, { header:headers });
}

export class GLM {
  public key: string;
  public apiUrl: string;
  public model: string;

  constructor(
    key: string,
    apiUrl = "https://open.bigmodel.cn/api/paas/v4/chat/completions",
    model = "glm-3-turbo",
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
      const token = generate_token(this.key);
      const headers = {
        "Content-Type": "application/json",
        Authorization: token,
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

export const GLMInstance = new GLM(
  process.env.GLM_API_KEY!,
  process.env.GLM_API_ENDPOINT!,
  process.env.GLM_MODEL!,
);
