import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import VueLoading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import toastMsg from "@/mixins/toast";
import { collapsed, toggleSidebar } from "@/mixins/sidebar-collapsed";
import router from "./router";
import store from "./store";
import ClickOutsideDirective from './directives/ClickOutsideDirective';
library.add(farStar, fasStar);
const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.config.globalProperties.$toastMsg = toastMsg;
app.config.globalProperties.$collapsed = collapsed;
app.config.globalProperties.$toggleSidebar = toggleSidebar;

app.provide("toastMsg", toastMsg);
app.provide("collapsed", collapsed);
app.provide("toggleSidebar", toggleSidebar);
app.directive('click-outside', ClickOutsideDirective);
app
  .use(router)
  .use(store)
  .use(VueLoading as any)
  .mount("#app");
