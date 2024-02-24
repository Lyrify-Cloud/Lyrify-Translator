// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ChatGPTInstance } from "./lib/chatgpt";
import { DeeplXInstance } from "./lib/deeplx";
import { MicrosoftInstance } from "./lib/microsoft";
import { GoogleInstance } from "./lib/google";
import { GeminiInstance } from "./lib/gemini";
import { TransmartInstance } from "./lib/transmart";
import { NiutransInstance } from "./lib/niutrans";
import { BaiduInstance } from "./lib/baidu";
import { autodetect } from "./lib/autodetect";

type TranslateResponse = {
  status: boolean;
  message?: string;
  source?: string;
  data?: any;
  model?: string;
};

function errResp(res: NextApiResponse<TranslateResponse>, message: string) {
  return res.status(200).json({
    status: false,
    message,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TranslateResponse>,
) {
  if (req.method !== "POST") return errResp(res, "invalid http method");

  let { model, text, targetLanguage, sourceLanguage } = req.body;

  if (text.length === 0 || targetLanguage.length === 0)
    return errResp(res, "text or target language is empty");

  try {
    if (sourceLanguage.length === 0 || sourceLanguage === "auto")
      sourceLanguage = await autodetect(text);

    const response = async (model: string) => {
      switch (model) {
        case "chatgpt":
          return await ChatGPTInstance.translate(
            text,
            targetLanguage,
            sourceLanguage,
          ).catch((e) => e.message);
        case "gemini":
          return await GeminiInstance.translate(
            text,
            targetLanguage,
            sourceLanguage,
          ).catch((e) => e.message);
        case "baidu":
          return await BaiduInstance.translate(
            text,
            targetLanguage,
            sourceLanguage,
          ).catch((e) => e.message);
        case "deeplx":
          return await DeeplXInstance.translate(
            text,
            targetLanguage,
            sourceLanguage,
          ).catch((e) => e.message);
        case "microsoft":
          return await MicrosoftInstance.translate(
            text,
            targetLanguage,
            sourceLanguage,
          ).catch((e) => e.message);
        case "google":
          return await GoogleInstance.translate(
            text,
            targetLanguage,
            sourceLanguage,
          ).catch((e) => e.message);
        case "transmart":
          return await TransmartInstance.translate(
            text,
            targetLanguage,
            sourceLanguage,
          ).catch((e) => e.message);
        case "niutrans":
          return await NiutransInstance.translate(
            text,
            targetLanguage,
            sourceLanguage,
          ).catch((e) => e.message);
        default:
          throw new Error("invalid model");
      }
    };
    res.status(200).json({
      status: true,
      model: model,
      source: sourceLanguage,
      data: await response(model),
    });
  } catch (e) {
    return errResp(res, (e as Error).message);
  }
}
