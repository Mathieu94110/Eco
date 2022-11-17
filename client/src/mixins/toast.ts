import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';

const toastMsg = (message, type) => createToast(message, {
  type,
  position: 'top-right',
  hideProgressBar: false,
  showIcon: false,
  transition: 'slide',
  timeout: 2000,
});

export default toastMsg;
