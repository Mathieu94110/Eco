<script setup lang="ts">
import { nextTick, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faRightFromBracket,
  faHouse,
  faHandshakeAngle,
  faMagnifyingGlass,
  faGamepad,
} from "@fortawesome/free-solid-svg-icons";
import { faUserCircle, faStar } from "@fortawesome/free-regular-svg-icons";

library.add(
  faBars,
  faRightFromBracket,
  faHouse,
  faUserCircle,
  faHandshakeAngle,
  faMagnifyingGlass,
  faGamepad,
  faStar
);

const state = reactive<{ open: boolean }>({
  open: false,
});

const store = useStore();
const router = useRouter();

const handleLogout = async () => {
  try {
    await store.dispatch("logout");
    await nextTick();
    await router.push("/");
  } catch (err) {
    console.error("Erreur lors de la redirection :", err);
  }
};
</script>

<template>
  <div class="px-20 d-flex flex-row align-center">
    <div class="topbar__action-container">
      <div class="topbar__menu-container">
        <Calc :open="state.open" @close="state.open = false" :transparent="true" />
        <span @click="state.open = !state.open" @keydown="state.open = !state.open" tabindex="0" role="button"
          aria-label="Toggle menu">
          <font-awesome-icon :icon="['fas', 'bars']" />
        </span>
        <Transition>
          <div class="topbar__menu" @click="state.open = false" @keydown="state.open = false" v-if="state.open"
            tabindex="0">
            <NavLink to="" icon="">
              <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
              <span @click="handleLogout" @keydown.enter="handleLogout" tabindex="0" role="button">Déconnection</span>
            </NavLink>
            <NavLink to="/home" icon="">
              <font-awesome-icon :icon="['fas', 'house']" />
              <span>Accueil</span>
            </NavLink>
            <NavLink to="/creators" icon="">
              <font-awesome-icon :icon="['far', 'user-circle']" />
              <span>Créateurs</span>
            </NavLink>
            <NavLink to="/stores" icon="" data-cy="ads-link">
              <font-awesome-icon :icon="['fas', 'handshake-angle']" />
              <span>Stores</span>
            </NavLink>
            <NavLink to="/search" icon="" data-cy="create-ad-link">
              <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
              <span>Rechercher un jeu</span>
            </NavLink>
            <NavLink to="/games" icon="">
              <font-awesome-icon :icon="['fas', 'gamepad']" />
              <span>Jeux</span>
            </NavLink>
            <NavLink to="/favorites" icon="" data-cy="favorite-link">
              <font-awesome-icon :icon="['far', 'star']" />
              <span>Mes favoris</span>
            </NavLink>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/mixins";

.topbar {
  &__action-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1 1 auto;
    position: absolute;
    top: 20px;
    right: 20px;

    @include mixins.xs {
      justify-content: end;
    }
  }

  &__menu-container {
    position: relative;

    i {
      @include mixins.sm {
        display: none;
      }

      justify-self: end;
      color: var(--primary-color);
      font-size: 20px;
      cursor: pointer;
    }
  }

  &__menu {
    z-index: 2;
    position: absolute;
    top: 20px;
    right: 0px;
    background-color: var(--primary-color);
    border: var(--border);
    border-radius: var(--border-radius);
    padding: 10px;
    height: 200px;
    width: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    li {
      padding: 10px;
    }

    a {
      color: var(--text-color);
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
}

// Transition
.v-leave-to,
.v-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}

.v-leave-active,
.v-enter-active {
  transition: all 0.4s;
}
</style>
