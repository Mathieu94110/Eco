import { createApp } from 'vue';
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { defineRule } from 'vee-validate';
import toastMsg from '@/mixins/toast';
import { collapsed, toggleSidebar } from '@/mixins/sidebar-collapsed';
import App from './App.vue';
import router from './router';
import store from './store';
import '@fortawesome/fontawesome-free/js/all';

// rules for login form
defineRule('required', (value) => {
  if (!value || !value.length) {
    return 'Ce champs est requis';
  }
  return true;
});

defineRule('minLength', (value, [limit]) => {
  // The field is empty so it should pass
  if (!value || !value.length) {
    return true;
  }
  if (value.length < limit) {
    return `Il faut renseigner au moins ${limit} caractères`;
  }
  return true;
});

defineRule('title', (value) => {
  if (!value || !value.length) {
    return 'Vous devez indiquer un titre';
  }

  return true;
});

defineRule('description', (value) => {
  if (!value || !value.length) {
    return 'Vous devez indiquer une description';
  }

  return true;
});

defineRule('minMax', (value, [min, max]) => {
  if (!value || !value.length) {
    return true;
  }
  const numericValue = Number(value);
  if (numericValue < min) {
    return `Le prix doit etre au moins de ${min}`;
  }
  if (numericValue > max) {
    return `Le prix maximum autorisé est de ${max}`;
  }
  return true;
});
//
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

app.provide('toastMsg', toastMsg);
app.provide('collapsed', collapsed);
app.provide('toggleSidebar', toggleSidebar);

app.use(router).use(store).use(VueLoading).mount('#app');
