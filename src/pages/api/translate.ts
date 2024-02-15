// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ChatGPTInstance } from "./lib/chatgpt";
import { DeeplXInstance } from "./lib/deeplx";
import { MicrosoftInstance } from "./lib/microsoft";
import { GoogleInstance } from "./lib/google";
import { GeminiInstance } from "./lib/gemini";
import { TransmartInstance } from "./lib/transmart";
import { autodetect } from "./lib/autodetect";


type TranslateResult = {
  chatgpt: string;
  deeplx: string;
  microsoft: string;
  google: string;
  gemini: string;
  transmart: string;
};

type TranslateResponse = {
  status: boolean;
  message?: string;
  source?: string;
  data?: TranslateResult;
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

  let { text, targetLanguage, sourceLanguage } = req.body;

  if (text.length === 0 || targetLanguage.length === 0)
    return errResp(res, "text or target language is empty");

  try {
    if (sourceLanguage.length === 0 || sourceLanguage === "auto")
      sourceLanguage = await autodetect(text);

    // code from sipc
    if (text.length < 5000) {
      const [chatgpt, gemini, deeplx, microsoft, google, transmart] =
        await Promise.all([
          ChatGPTInstance.translate(text, targetLanguage, sourceLanguage).catch((e) => e.message,),
          GeminiInstance.translate(text, targetLanguage, sourceLanguage).catch((e) => e.message,),
          DeeplXInstance.translate(text, targetLanguage, sourceLanguage).catch((e) => e.message,),
          MicrosoftInstance.translate(text, targetLanguage, sourceLanguage).catch((e) => e.message,),
          GoogleInstance.translate(text, targetLanguage, sourceLanguage).catch((e) => e.message,),
          TransmartInstance.translate(text, targetLanguage, sourceLanguage).catch((e) => e.message,),
        ]);
      res.status(200).json({
        status: true,
        source: sourceLanguage,
        data: { chatgpt, gemini, deeplx, microsoft, google, transmart},
      });
    } else {
      const [chatgpt, gemini, microsoft] =
      await Promise.all([
        ChatGPTInstance.translate(text, targetLanguage, sourceLanguage).catch((e) => e.message,),
        GeminiInstance.translate(text, targetLanguage, sourceLanguage).catch((e) => e.message,),
        MicrosoftInstance.translate(text, targetLanguage, sourceLanguage).catch((e) => e.message,),
      ]);
    res.status(200).json({
      status: true,
      source: sourceLanguage,
      data: { chatgpt, gemini, deeplx:'Extra-long', microsoft, google:'Extra-long', transmart:'Extra-long'},
    });
    }
  } catch (e) {
    return errResp(res, (e as Error).message);
  }
}
