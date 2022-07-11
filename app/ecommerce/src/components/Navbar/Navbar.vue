<template>
  <div
    class="sidebar"
    v-on:mouseover="toggleSidebar"
    v-on:mouseleave="toggleSidebar"
    :style="{ width: navbarWidth }"
  >
    <div class="sidebar__items">
      <h1>
        <span v-if="collapsed">
          <div>E-co</div>
        </span>
        <span v-else>E-commerce</span>
      </h1>

      <NavbarLink to="/" icon="fas fa-sign-out">Se déconnecter</NavbarLink>
      <NavbarLink to="/user-informations" icon="fas fa-user-circle"
        >Mes informations</NavbarLink
      >
      <NavbarLink to="/dashboard" icon="fas fa-columns">Dashboard</NavbarLink>
      <NavbarLink to="/post-add" icon="fas fa-columns"
        >Déposer une annonce</NavbarLink
      >
      <NavbarLink to="/favorites" icon="fas fa-columns">Mes favoris</NavbarLink>
    </div>
  </div>
</template>

<script>
import NavbarLink from "./NavbarLink";
import { collapsed, toggleSidebar, navebarWidth } from './state'

export default {
  components: { NavbarLink },

  props: {},
    setup() {
    return { collapsed, toggleSidebar, navebarWidth }
  }
};
</script>

<style>
:root {
  --sidebar-bg-color: #9ec9ef;
  --sidebar-item-hover: #3a33ff;
  --sidebar-item-active: #0b08c7;
}
</style>

<style lang="scss" scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);
  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;
  transition: 1.3s ease;
  display: flex;
  flex-direction: column;

  &__items {
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
.sidebar h1 {
  height: 2.5em;
}
.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;
  color: rgba(255, 255, 255, 0.7);
  transition: 0.2s linear;
}
.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>
