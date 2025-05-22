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
        <Transition name="fade-slide">
          <div v-if="state.open" class="topbar__menu" tabindex="0" @click="state.open = false"
            @keydown="state.open = false">
            <NavLink to="" class="menu__item" icon="">
              <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
              <span @click.stop="handleLogout" @keydown.enter.stop="handleLogout" role="button"
                tabindex="0">Déconnexion</span>
            </NavLink>
            <NavLink to="/home" class="menu__item">
              <font-awesome-icon :icon="['fas', 'house']" />
              <span>Accueil</span>
            </NavLink>
            <NavLink to="/creators" class="menu__item">
              <font-awesome-icon :icon="['far', 'user-circle']" />
              <span>Créateurs</span>
            </NavLink>
            <NavLink to="/stores" class="menu__item">
              <font-awesome-icon :icon="['fas', 'handshake-angle']" />
              <span>Stores</span>
            </NavLink>
            <NavLink to="/search" class="menu__item">
              <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
              <span>Rechercher</span>
            </NavLink>
            <NavLink to="/games" class="menu__item">
              <font-awesome-icon :icon="['fas', 'gamepad']" />
              <span>Jeux</span>
            </NavLink>
            <NavLink to="/favorites" class="menu__item">
              <font-awesome-icon :icon="['far', 'star']" />
              <span>Favoris</span>
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
    z-index: 10;
    position: absolute;
    top: 40px;
    right: 0;
    background-color: var(--background-color, #000);
    border: 1px solid var(--border-color, #ddd);
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    padding: 16px 12px;
    width: 260px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    .menu__item {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 16px;
      padding: 8px 12px;
      border-radius: 8px;
      color: #fff;
      background-color: transparent;
      transition: background 0.2s ease;

      &:hover {    background-color: var(--success-1);
        cursor: pointer;
      }

      svg {
        font-size: 18px;
        color: var(--primary-color);

        &:hover {
          background-color: var(--hover-color, #000);
          cursor: pointer;
        }
      }

      span {
        flex: 1;
      }
    }
  }
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

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
