import Toast from "react-native-toast-message";

export const toasts = {
  showError(text1: string, text2: string) {
    Toast.show({
      type: "error",
      text1,
      text2,
    });
  },
  showSuccess(text1: string, text2: string) {
    Toast.show({
      type: "success",
      text1,
      text2,
    });
  },
};
