import { ENUSLanguage } from "./ENUSLanguage";
import { ILanguage } from "./interfaces";
import { PTBRLanguage } from "./PTBRLanguage";

const languages = {
  pt: new PTBRLanguage(),
  "pt-BR": new PTBRLanguage(),
  en: new ENUSLanguage(),
  "en-US": new ENUSLanguage(),
} as { [key: string]: ILanguage };

export const i18n = {
  getLanguageByLocale(locale: string): ILanguage {
    if (locale in languages) {
      return languages[locale];
    }

    return languages["pt-BR"];
  },
};
