import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import store from "../store";

export async function isAuthenticatedGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> {
  const isAuthenticated = store.getters.isAuthenticated;

  if (!isAuthenticated) {
    return next({ path: "/" });
  }

  next();
}
export async function isNotAuthenticatedGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> {
  const isAuthenticated = store.getters.isAuthenticated;

  if (isAuthenticated) {
    return next({ path: "/home" });
  }

  next();
}

