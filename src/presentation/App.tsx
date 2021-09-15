import React from "react";
import { registerRootComponent } from "expo";
import Routes from "./routes";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { HabitProvider } from "./context/habit";
import toastConfig from "./lib/toastConfig";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { LanguageProvider } from "./context/language";

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) return null;
  return (
    <>
      <StatusBar hidden />

      <LanguageProvider>
        <HabitProvider>
          <Routes />
        </HabitProvider>
      </LanguageProvider>

      <Toast config={toastConfig} ref={(ref: any) => Toast.setRef(ref)} />
    </>
  );
}

registerRootComponent(App);
