<script setup lang="ts">
import { reactive, inject } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import NavLink from "../NavLink.vue";
import SideBarContainer from "./SideBarContainer/SideBarContainer.vue";
import { ecoGame } from "@/assets/images";

const state = reactive<{
  isHover: boolean;
}>({
  isHover: false,
});

const store = useStore();
const router = useRouter();

const toggleSidebar = inject("toggleSidebar") as () => void;

const logout = async (): Promise<void> => {
  await store.dispatch("logout");
  router.push("/");
};

const formatSideBar = (value: boolean): void => {
  state.isHover = value;
  toggleSidebar();
};
</script>

<template>
  <SideBarContainer
    :class="{ 'side-bar--active': state.isHover }"
    class="side-bar"
    @mouseenter="formatSideBar(true)"
    @mouseleave="formatSideBar(false)"
    @focus="formatSideBar(true)"
    @blur="formatSideBar(false)"
  >
    <router-link to="/">
      <img alt="user_logo" class="side-bar__logo" :src="ecoGame" />
    </router-link>
    <div class="side-bar__items">
      <button
        v-if="state.isHover"
        class="side-bar__link-logout"
        @click="logout()"
        @keydown="logout()"
        icon="fa-solid fa-right-from-bracket"
      >
        Se déconnecter
      </button>
      <div v-else @click="logout()" @keydown="logout()">
        <NavLink class="side-bar__link" to="/profile" icon="fa-solid fa-right-from-bracket"></NavLink>
      </div>
      <NavLink class="side-bar__link" to="/creators" icon="fa-solid fa-handshake-angle" data-cy="ads-link"
        ><span v-show="state.isHover">Créateurs</span></NavLink
      >
      <NavLink class="side-bar__link" to="/stores" icon="fas fa-pencil-alt" data-cy="create-ad-link"
        ><span v-show="state.isHover">Stores</span></NavLink
      >
      <NavLink class="side-bar__link" to="/search" icon="fas fa-user-circle"
        ><span v-show="state.isHover">Rechercher un jeu</span></NavLink
      >
      <NavLink class="side-bar__link" to="/games" icon="fas fa-pencil-alt"
        ><span v-show="state.isHover">Jeux</span></NavLink
      >
      <NavLink class="side-bar__link" to="/favorites" icon="fas fa-star" data-cy="favorite-link"
        ><span v-show="state.isHover">Mes favoris</span></NavLink
      >
    </div>
  </SideBarContainer>
</template>

<style lang="scss" scoped>
.side-bar {
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  max-width: 85px;
  box-shadow: 0 3px 6px #00000029;
  transition: 0.3s;
  z-index: 2;
  width: 100%;
  flex-shrink: 0;
  &__items {
    height: 260px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &__link {
    color: var(--primary-color);
    padding-left: 30px;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    border-radius: 0;
    &:hover {
      background: var(--secondary-2);
      color: #fff;
    }
    &-logout {
      color: #fff;
      background-color: var(--secondary-2);
      padding: 4px 0;
      &:hover {
        cursor: pointer;
        color: var(--primary-color);
        background-color: var(--danger-2);
      }
    }
    span {
      margin-left: 20px;
      &:hover {
        color: var(--primary-color);
      }
    }
    overflow-wrap: normal;
  }

  &--active {
    max-width: 270px;
  }

  &__logo {
    overflow: hidden;
  }
  &__logo {
    height: 40px;
    margin: 20px 0;
  }
}
</style>
