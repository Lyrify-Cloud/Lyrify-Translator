import axios from "axios";

export type TranslateResult = {
  chatgpt: string;
  gemini: string;
  deeplx: string;
  microsoft: string;
  google: string;
  transmart: string;
  niutrans: string;
};

export type TranslateResponse = {
  status: boolean;
  message: string;
  source: string;
  data: TranslateResult;
};

export const initializeTranslateState: TranslateResult = {
  chatgpt: "",
  gemini: "",
  deeplx: "",
  microsoft: "",
  google: "",
  transmart: "",
  niutrans: "",
};

export async function translateContent(
  content: string,
  from: string,
  to: string,
): Promise<TranslateResponse> {
  try {
    return (
      await axios.post("/translate", {
        text: content,
        sourceLanguage: from,
        targetLanguage: to,
      })
    ).data;
  } catch (e) {
    return {
      status: false,
      message: (e as Error).message || "unknown error",
      source: "",
      data: { ...initializeTranslateState },
    };
  }
}
