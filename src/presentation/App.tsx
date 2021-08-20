import React from "react";
import { registerRootComponent } from "expo";
import Routes from "./routes";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <>
      <StatusBar hidden />
      <Routes />
    </>
  );
}

registerRootComponent(App);
