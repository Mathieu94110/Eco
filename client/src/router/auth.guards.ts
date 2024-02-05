import { computed } from "vue";
import store from "../store";

const isAuthenticate = computed<boolean>(() => store.getters.isAuthenticated);

export function isAuthenticatedGuard(): string | boolean {
  if (isAuthenticate.value === null || isAuthenticate.value === false) {
    return "/";
  }
  return true;
}

export function isNotAuthenticatedGuard(): string | boolean {
  if (isAuthenticate.value === true) {
    return "/home";
  }
  return true;
}
