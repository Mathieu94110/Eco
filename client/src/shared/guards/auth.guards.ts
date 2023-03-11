import { computed } from "vue";
import store from "../../store";

const isAuthenticate = computed(() => store.getters.isAuthenticated);

export function isAuthenticatedGuard() {
  if (isAuthenticate.value === null || isAuthenticate.value === false) {
    return "/";
  }
  return true;
}

export function isNotAuthenticatedGuard() {
  if (isAuthenticate.value === true) {
    return "/profile";
  }
}
