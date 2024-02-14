import axios from "axios";

axios.defaults.baseURL = "/api";

export type Language = {
  key: string;
  value: string;
};

export const languages: Language[] = [
  { key: "zh", value: "Chinese" },
  { key: "en", value: "English" },
  { key: "bg", value: "Bulgarian" },
  { key: "cs", value: "Czech" },
  { key: "da", value: "Danish" },
  { key: "nl", value: "Dutch" },
  { key: "et", value: "Estonian" },
  { key: "fi", value: "Finnish" },
  { key: "fr", value: "French" },
  { key: "de", value: "Deutsch" },
  { key: "el", value: "Greek" },
  { key: "hu", value: "Hungarian" },
  { key: "id", value: "Indonesian" },
  { key: "it", value: "Italian" },
  { key: "ja", value: "Japanese" },
  { key: "ko", value: "Korean" },
  { key: "lv", value: "Latvian" },
  { key: "lt", value: "Lithuanian" },
  { key: "no", value: "Norwegian" },
  { key: "pl", value: "Polish" },
  { key: "pt", value: "Portuguese" },
  { key: "ro", value: "Romanian" },
  { key: "ru", value: "Russian" },
  { key: "sk", value: "Slovak" },
  { key: "sl", value: "Slovenian" },
  { key: "es", value: "Spanish" },
  { key: "sv", value: "Swedish" },
  { key: "tr", value: "Turkish" },
  { key: "uk", value: "Ukrainian" },
];
