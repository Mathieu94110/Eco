<script setup lang="ts">
import { reactive, inject } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import NavLink from "../NavLink.vue";
import SideBarContainer from "./SideBarContainer/SideBarContainer.vue";

const state = reactive<{
  isHover: boolean;
}>({
  isHover: false,
});

const store = useStore();
const router = useRouter();

const toggleSidebar = inject("toggleSidebar") as Function;

const logOut = (): void => {
  store.commit("loginStatus", false);
  store.commit("logOut");
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
      <img
        alt="user_logo"
        class="side-bar__img"
        src="@/assets/images/logo.png"
      />
    </router-link>
    <div class="side-bar__items">
      <button
        v-if="state.isHover"
        class="side-bar__link--error"
        @click="logOut()"
        @keydown="logOut()"
        icon="fa-solid fa-right-from-bracket"
      >
        Se déconnecter
      </button>
      <div v-else @click="logOut()" @keydown="logOut()">
        <NavLink
          class="side-bar__link"
          to="/profile"
          icon="fa-solid fa-right-from-bracket"
        ></NavLink>
      </div>

      <NavLink class="side-bar__link" to="/profile" icon="fas fa-user-circle"
        ><span>Mes informations</span></NavLink
      >
      <NavLink
        class="side-bar__link"
        to="/adds"
        icon="fa-solid fa-handshake-angle"
        ><span>Annonces</span></NavLink
      >
      <NavLink class="side-bar__link" to="/post-add" icon="fas fa-pencil-alt"
        ><span>Déposer une annonce</span></NavLink
      >
      <NavLink class="side-bar__link" to="/user-adds" icon="fas fa-pencil-alt"
        ><span>Mes annonces</span></NavLink
      >
      <NavLink class="side-bar__link" to="/favorites" icon="fas fa-star"
        ><span>Mes favoris</span></NavLink
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
  overflow: auto;
  flex-shrink: 0;
  &__items {
    height: 260px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  &__link {
    color: var(--primary-color);
    padding-left: 30px;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    &--error {
      color: var(--danger-1);
    }
    span {
      margin-left: 20px;
      &:hover {
        color: var(--primary-1);
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

  &__img {
    height: 35px;
  }
}
</style>
