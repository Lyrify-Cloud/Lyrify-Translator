import axios from "axios";

export type TranslateResult = {
  chatgpt: string;
  deeplx: string;
  microsoft: string;
  google: string;
  m2m100: string;
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
  deeplx: "",
  microsoft: "",
  google: "",
  m2m100: "",
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
