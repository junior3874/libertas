import Toast from "react-native-toast-message";

export const toasts = {
  showError(text2: string) {
    Toast.show({
      type: "error",
      text1: "Erro",
      text2,
    });
  },
  showSuccess(text2: string) {
    Toast.show({
      type: "success",
      text1: "Successo",
      text2,
    });
  },
};
