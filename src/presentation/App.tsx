import React from "react";
import { registerRootComponent } from "expo";
import Routes from "./routes";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { HabitProvider } from "./context/habit";

export default function App() {
  return (
    <>
      <StatusBar hidden />
      <HabitProvider>
        <Routes />
      </HabitProvider>
      <Toast ref={(ref: any) => Toast.setRef(ref)} />
    </>
  );
}

registerRootComponent(App);
