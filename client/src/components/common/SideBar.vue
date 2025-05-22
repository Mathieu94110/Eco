<script setup lang="ts">
import { reactive, inject, nextTick } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import NavLink from "@/components/common/NavLink.vue";
import SideBarContainer from "@/components/common/SideBarContainer.vue";
import { ecoGame } from "@/assets/images";

const state = reactive<{
  isHover: boolean;
}>({
  isHover: false,
});

const store = useStore();
const router = useRouter();

const toggleSidebar = inject("toggleSidebar") as () => void;


const handleLogout = async () => {
  try {
    await store.dispatch("logout");
    await nextTick();
    await router.push("/");
  } catch (err) {
    console.error("Erreur lors de la redirection :", err);
  }
};

const formatSideBar = (value: boolean): void => {
  state.isHover = value;
  toggleSidebar();
};
</script>

<template>
  <SideBarContainer v-if="store.state.isUserLogged" :class="{ 'side-bar--active': state.isHover }" class="side-bar"
    @mouseenter="formatSideBar(true)" @mouseleave="formatSideBar(false)" @focus="formatSideBar(true)"
    @blur="formatSideBar(false)">
    <router-link to="/">
      <img alt="user_logo" class="side-bar__logo" :src="ecoGame" />
    </router-link>
    <div class="side-bar__items">
      <button v-if="state.isHover" class="side-bar__link-logout" @click="handleLogout()" @keydown="handleLogout()"
        icon="fa-solid fa-right-from-bracket">
        Se déconnecter
      </button>
      <div v-else @click="handleLogout()" @keydown="handleLogout()">
        <NavLink class="side-bar__link" to="/profile" icon="fa-solid fa-right-from-bracket"></NavLink>
      </div>
      <NavLink class="side-bar__link" to="/home" icon="fa fa-home" data-cy="home-link"><span
          v-show="state.isHover">Accueil</span></NavLink>
      <NavLink class="side-bar__link" to="/creators" icon="fa-solid fa-person" data-cy="creators-link"><span
          v-show="state.isHover">Créateurs</span></NavLink>
      <NavLink class="side-bar__link" to="/stores" icon="fa-solid fa-store" data-cy="stores-link"><span
          v-show="state.isHover">Stores</span></NavLink>
      <NavLink class="side-bar__link" to="/search" icon="fa-solid fa-magnifying-glass"><span
          v-show="state.isHover">Rechercher un jeu</span></NavLink>
      <NavLink class="side-bar__link" to="/games" icon="fa-solid fa-gamepad"><span v-show="state.isHover">Jeux</span>
      </NavLink>
      <NavLink class="side-bar__link" to="/favorites" icon="fas fa-star" data-cy="favorite-link"><span
          v-show="state.isHover">Mes favoris</span></NavLink>
    </div>
  </SideBarContainer>
</template>

<style lang="scss" scoped>
.side-bar {
  width: 85px;
  transition: all 0.3s ease;
  height: 100vh;
  background-color: var(--dark-1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  box-shadow: 0 3px 6px #00000029;

  &--active {
    width: 270px;
  }

  &__logo {
    height: 40px;
    margin: 20px auto;
    display: block;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  &__items {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    padding: 0 10px;
  }

  &__link {
    display: flex;
    align-items: center;
    gap: 14px;
    color: #fff;
    padding: 18px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 500;
    background-color: transparent;
    transition: background-color 0.2s, color 0.2s;
    white-space: nowrap;

    &:hover {
      background-color: var(--primary-1);
      color: #fff;
    }

    span {
      transition: opacity 0.2s ease;
    }
  }

  &__link-logout {
    margin-top: auto;
    background-color: var(--pink-1);
    color: #fff;
    border: none;
    padding: 10px 18px;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: var(--danger);
      color: #fff;
    }
  }
}
</style>
