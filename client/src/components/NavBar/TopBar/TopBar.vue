<script setup lang="ts">
import Calc from "@/components/Calc/Calc.vue";
import { reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import NavLink from "../NavLink.vue";

const state = reactive<{
  open: boolean;
}>({
  open: false,
});

const store = useStore();
const router = useRouter();

const logOut = (): void => {
  store.commit("loginStatus", false);
  store.commit("logOut");
  router.push("/");
};
</script>

<template>
  <div class="px-20 d-flex flex-row align-center">
    <div class="topbar__action-container">
      <div class="topbar__menu-container">
        <Calc
          :open="state.open"
          @close="state.open = false"
          :transparent="true"
        />
        <span
          @click="state.open = !state.open"
          @keydown="state.open = !state.open"
          ><i class="fa-solid fa-bars"></i
        ></span>
        <Transition>
          <div
            class="topbar__menu"
            @click="state.open = false"
            @keydown="state.open = false"
            v-if="state.open"
          >
            <NavLink to="" icon="fas fa-user-circle"
              ><span @click="logOut()" @keydown="logOut()"
                >Déconnection</span
              ></NavLink
            >
            <NavLink to="/profile" icon="fas fa-user-circle"
              ><span>Mes informations</span></NavLink
            >
            <NavLink to="/adds" icon="fa-solid fa-handshake-angle"
              ><span>Annonces</span></NavLink
            >
            <NavLink to="/post-add" icon="fas fa-pencil-alt"
              ><span>Déposer une annonce</span></NavLink
            >
            <NavLink to="/user-adds" icon="fas fa-pencil-alt"
              ><span>Mes annonces</span></NavLink
            >
            <NavLink to="/favorites" icon="fas fa-star"
              ><span>Mes favoris</span></NavLink
            >
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
