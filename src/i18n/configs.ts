import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// 言語jsonファイルのimport
import translation_ja from "./ja.yaml" assert {type: 'yaml'};
import translation_en from "./en.yaml" assert {type: 'yaml'};

const resources = {
  ja: {
    translation: translation_ja
  },
  en: {
    translation: translation_en
  }
};

export const languages = Object.keys(resources)

let lng = "ja"
/*
const currentUrl = document.URL;
const baseUrl = new URL(currentUrl);
const lang = baseUrl.searchParams.get('lang');
if (Object.keys(resources).some(l => l === lang) && typeof (lang) === 'string') {
  lng = lang
} else {
  lng = "ja"
}
*/

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: lng,
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
