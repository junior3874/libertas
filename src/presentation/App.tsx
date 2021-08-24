import React from "react";
import { registerRootComponent } from "expo";
import Routes from "./routes";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { HabitProvider } from "./context/habit";
import toastConfig from "./lib/toastConfig";

export default function App() {
  return (
    <>
      <StatusBar hidden />
      <HabitProvider>
        <Routes />
      </HabitProvider>
      <Toast config={toastConfig} ref={(ref: any) => Toast.setRef(ref)} />
    </>
  );
}

registerRootComponent(App);
