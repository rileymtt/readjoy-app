import {
  hideMessage,
  MessageType,
  showMessage,
} from "react-native-flash-message";

function show(type: MessageType, message: string, options = {}) {
  showMessage({
    type,
    ...options,
    message,
  });
}

const showSuccess = (message: string) => {
  show("success", message);
};

const showWarning = (message: string) => {
  show("warning", message);
};

const showError = (message: string) => {
  show("danger", message);
};

const showInfo = (message: string) => {
  show("info", message, { autoHide: false });
};

const showToast = (message: string) => {
  showMessage({
    position: "bottom",
    style: {
      alignSelf: "center",
    },
    message,
    floating: true,
  });
};

export default {
  showSuccess,
  showWarning,
  showError,
  showInfo,
  showToast,
  hideMessage,
};
