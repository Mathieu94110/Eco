import { createApp } from "vue";
import VueLoading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
4;
import toastMsg from "@/mixins/toast";
import { collapsed, toggleSidebar } from "@/mixins/sidebar-collapsed";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@fortawesome/fontawesome-free/js/all";
const app = createApp({
  extends: App,
});

app.config.globalProperties.$toastMsg = toastMsg;
// Used to detect the space that must be left when sidebar is open or closed
app.config.globalProperties.$collapsed = collapsed;
//
// Used to check sideBar size on mouse enter and on mouse leave
app.config.globalProperties.$toggleSidebar = toggleSidebar;
//

app.provide("toastMsg", toastMsg);
app.provide("collapsed", collapsed);
app.provide("toggleSidebar", toggleSidebar);

app
  .use(router)
  .use(store)
  .use(VueLoading as any)
  .mount("#app");
