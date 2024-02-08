// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ChatGPT, ChatGPTInstance } from "./lib/chatgpt";
import { DeepLX, DeeplXInstance } from "@/pages/api/lib/deeplx";
import { Microsoft, MicrosoftInstance } from "@/pages/api/lib/microsoft";
import { Google, GoogleInstance } from "@/pages/api/lib/google";
import { Niutrans, NiutransInstance } from "@/pages/api/lib/niutrans";
import { autodetect } from "@/pages/api/lib/autodetect";
import { GeminiInstance } from "./lib/gemini";

type TranslateResult = {
  chatgpt: string;
  deeplx: string;
  microsoft: string;
  google: string;
  gemini: string;
  niutrans: string;
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
      sourceLanguage = autodetect(text);

    // code from sipc
    const [chatgpt, gemini, deeplx, microsoft, google, niutrans] =
      await Promise.all([
        ChatGPTInstance.translate(text, targetLanguage, sourceLanguage).catch(
          (e) => e.message,
        ),
        GeminiInstance.translate(text, targetLanguage, sourceLanguage).catch(
          (e) => e.message,
        ),
        DeeplXInstance.translate(text, targetLanguage, sourceLanguage).catch(
          (e) => e.message,
        ),
        MicrosoftInstance.translate(text, targetLanguage, sourceLanguage).catch(
          (e) => e.message,
        ),
        GoogleInstance.translate(text, targetLanguage, sourceLanguage).catch(
          (e) => e.message,
        ),
        NiutransInstance.translate(text, targetLanguage, sourceLanguage).catch(
          (e) => e.message,
        ),
      ]);

    res.status(200).json({
      status: true,
      source: sourceLanguage,
      data: {
        chatgpt,
        gemini,
        deeplx,
        microsoft,
        google,
        niutrans
      },
    });
  } catch (e) {
    return errResp(res, (e as Error).message);
  }
}
