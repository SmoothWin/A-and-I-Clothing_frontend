import i18next from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    fallbackLng: "en",
    detection: {
        order:['querystring', 'cookie', 'localStorage', 'htmlTag'],
        caches:['cookie']
    },
    backend:{
        loadPath:'/assets/locales/{{lng}}/translation.json'
    },
    react: {
        useSuspense: false,
        wait: true
      }
});

export {useTranslation, i18next}