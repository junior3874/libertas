import React from "react";
import { BaseToast } from "react-native-toast-message";

const toastConfig = {
  error: ({ text1, text2, ...rest }) => (
    <BaseToast
      {...rest}
      style={{ borderLeftColor: "red" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 18,
        fontWeight: "500",
        paddingTop: 7,
      }}
      text2Style={{
        fontSize: 15,
        color: "#666",
        paddingBottom: 7,
      }}
      text1={text1}
      text2={text2}
    />
  ),
  success: ({ text1, text2, ...rest }) => (
    <BaseToast
      {...rest}
      style={{ borderLeftColor: "green" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 18,
        fontWeight: "500",
        paddingTop: 7,
      }}
      text2Style={{
        fontSize: 15,
        color: "#666",
        paddingBottom: 7,
      }}
      text1={text1}
      text2={text2}
    />
  ),
};

export default toastConfig;
