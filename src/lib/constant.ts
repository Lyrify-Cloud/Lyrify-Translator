import axios from "axios";

axios.defaults.baseURL = "/api";

export type Language = {
  key: string;
  value: string;
};

export const languages: Language[] = [
  { key: "zh", value: "Chinese" },
  { key: "en", value: "English" },
  { key: "nl", value: "Dutch" },
  { key: "fr", value: "French" },
  { key: "de", value: "Deutsch" },
  { key: "it", value: "Italian" },
  { key: "ja", value: "Japanese" },
  { key: "pl", value: "Polish" },
  { key: "pt", value: "Portuguese" },
  { key: "ru", value: "Russian" },
  { key: "es", value: "Spanish" },
];
