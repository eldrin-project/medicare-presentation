import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en.json";
import roTranslation from "./locales/ro.json";
import arTranslation from "./locales/ar.json";

const resources = {
  en: {
    translation: enTranslation,
  },
  ro: {
    translation: roTranslation,
  },
  ar: {
    translation: arTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
