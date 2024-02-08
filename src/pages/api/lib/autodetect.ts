// code from sipc

const { detectOne } = require("langdetect");

const detectionMap: Record<string, string> = {
  "zh-cn": "zh",
  "zh-tw": "zh",
};

export function autodetect(content: string): string {
  try {
    const lang = detectOne(content);
    return detectionMap[lang] || lang;
  } catch {
    return "auto";
  }
}
