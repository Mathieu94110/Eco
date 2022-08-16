import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

export const toastMsg = (message, type ) => {
  return createToast(message, {
    type: type,
    position: "top-right",
    hideProgressBar: false,
    showIcon: false,
    transition: "slide",
    timeout: 3000
  });
};