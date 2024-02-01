import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import type { ToastType } from "mosha-vue-toastify";

const toastMsg = (message: string, type: ToastType) =>
  createToast(message, {
    type,
    position: "top-right",
    hideProgressBar: false,
    toastBackgroundColor: "#27ae60",
    showIcon: false,
    transition: "slide",
    timeout: 2000,
  });

export default toastMsg;
