import React, { createContext, useState } from "react";
import * as Localization from "expo-localization";
import { i18n } from "../languages";
import { ILanguage } from "../languages/interfaces";

type LanguageContextProps = {
  language: ILanguage;
};

export const LanguageContext = createContext({} as LanguageContextProps);

export const LanguageProvider: React.FC = ({ children }) => {
  const [language, setLanguage] = useState<ILanguage>(
    i18n.getLanguageByLocale(Localization.locale)
  );

  return (
    <LanguageContext.Provider
      value={{
        language,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
