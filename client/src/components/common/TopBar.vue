<script setup lang="ts">
import { reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Calc from "@/components/common/Calc.vue";
import NavLink from "@/components/common/NavLink.vue";

const state = reactive<{
  open: boolean;
}>({
  open: false,
});

const store = useStore();
const router = useRouter();

const logout = async (): Promise<void> => {
  await store.dispatch("logout");
  router.push("/");
};
</script>

<template>
  <div class="px-20 d-flex flex-row align-center">
    <div class="topbar__action-container">
      <div class="topbar__menu-container">
        <Calc :open="state.open" @close="state.open = false" :transparent="true" />
        <span @click="state.open = !state.open" @keydown="state.open = !state.open"
          ><i class="fa-solid fa-bars"></i
        ></span>
        <Transition>
          <div class="topbar__menu" @click="state.open = false" @keydown="state.open = false" v-if="state.open">
            <NavLink to="" icon="fa fa-sign-out"
              ><span @click="logout()" @keydown="logout()">Déconnection</span></NavLink
            >
            <NavLink to="/home" icon="fa fa-home"><span>Accueil</span></NavLink>
            <NavLink to="/creators" icon="fas fa-user-circle"><span>Créateurs</span></NavLink>
            <NavLink to="/stores" icon="fa-solid fa-handshake-angle" data-cy="ads-link"><span>Stores</span></NavLink>
            <NavLink to="/search" icon="fas fa-pencil-alt" data-cy="create-ad-link"
              ><span>Rechercher un jeu</span></NavLink
            >
            <NavLink to="/games" icon="fas fa-pencil-alt"><span>Jeux</span></NavLink>
            <NavLink to="/favorites" icon="fas fa-star" data-cy="favorite-link"><span>Mes favoris</span></NavLink>
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
    }
  }
}
//Transition
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
