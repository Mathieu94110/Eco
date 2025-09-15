import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLoading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons'

import toastMsg from '@/mixins/toast'
import { collapsed, toggleSidebar } from '@/mixins/sidebar-collapsed'
import ClickOutsideDirective from './directives/ClickOutsideDirective'

// FontAwesome setup
library.add(farStar, fasStar)

const app = createApp(App)

// Global components
app.component('font-awesome-icon', FontAwesomeIcon)

// Global properties 
app.config.globalProperties.$toastMsg = toastMsg
app.config.globalProperties.$collapsed = collapsed
app.config.globalProperties.$toggleSidebar = toggleSidebar

// Directives
app.directive('click-outside', ClickOutsideDirective)

// Global properties
app.config.globalProperties.$toggleSidebar = toggleSidebar;
app.config.globalProperties.$collapsed = collapsed;

// Plugins
app.use(router)
app.use(store)
app.use(VueLoading)

app.mount('#app')


