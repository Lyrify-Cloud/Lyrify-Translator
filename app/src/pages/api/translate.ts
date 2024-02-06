// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ChatGPT, ChatGPTInstance } from "./lib/chatgpt";
import { DeepLX, DeeplXInstance } from "@/pages/api/lib/deeplx";
import { Microsoft, MicrosoftInstance } from "@/pages/api/lib/microsoft";
import { Google, GoogleInstance } from "@/pages/api/lib/google";
import { M2m100, M2m100Instance } from "@/pages/api/lib/m2m100";
import { Niutrans, NiutransInstance } from "@/pages/api/lib/niutrans";

type TranslateResult = {
  chatgpt: string;
  deeplx: string;
  microsoft: string;
  google: string;
  m2m100: string;
  niutrans: string;
};

type TranslateResponse = {
  status: boolean;
  message?: string;
  source?: string;
  data?: TranslateResult;
};

function errResp(
  res: NextApiResponse<TranslateResponse>,
  code: number,
  message: string,
) {
  return res.status(code).json({
    status: false,
    message,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TranslateResponse>,
) {
  if (req.method !== "POST") return errResp(res, 400, "invalid http method");

  const [chatgpt, deeplx, microsoft, google, m2m100, niutrans] =
    await Promise.all([
      ChatGPTInstance.translate(
        req.body.text,
        req.body.targetLanguage,
        req.body.sourceLanguage,
      ).catch((e) => e.message),
      DeeplXInstance.translate(
        req.body.text,
        req.body.targetLanguage,
        req.body.sourceLanguage,
      ).catch((e) => e.message),
      MicrosoftInstance.translate(
        req.body.text,
        req.body.targetLanguage,
        req.body.sourceLanguage,
      ).catch((e) => e.message),
      GoogleInstance.translate(
        req.body.text,
        req.body.targetLanguage,
        req.body.sourceLanguage,
      ).catch((e) => e.message),
      M2m100Instance.translate(
        req.body.text,
        req.body.targetLanguage,
        req.body.sourceLanguage,
      ).catch((e) => e.message),
      NiutransInstance.translate(
        req.body.text,
        req.body.targetLanguage,
        req.body.sourceLanguage,
      ).catch((e) => e.message),
    ]);

  res.status(200).json({
    status: true,
    data: {
      chatgpt,
      deeplx,
      microsoft,
      google,
      m2m100,
      niutrans,
    },
  });
}
