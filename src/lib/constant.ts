import axios from "axios";

axios.defaults.baseURL = "/api";

export type Language = {
  key: string;
  value: string;
};

export const languages: Language[] = [
  { key: "zh", value: "Chinese" },
  { key: "en", value: "English" },
  { key: "ja", value: "Japanese" },
  { key: "ru", value: "Russian" },
  { key: "fr", value: "French" },
  { key: "de", value: "Deutsch" },
  { key: "it", value: "Italian" },
  { key: "es", value: "Spanish" },
  { key: "pt", value: "Portuguese" },
];
