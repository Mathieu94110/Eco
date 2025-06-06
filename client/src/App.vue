<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, inject, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

import NavBar from "@/components/common/NavBar.vue";
import Toolbar from "@/components/common/Toolbar.vue";
import TheFooter from "@/components/common/TheFooter.vue";

const store = useStore();
const route = useRoute();

const storeReady = ref(false);
const isSideBarClosed = inject<boolean>("collapsed", false);

const isMobile = computed(() => store.state.windowWidth < 575);
const isAuthenticated = computed(() => store.getters.isAuthenticated);
const routeName = computed(() => route.name);

const updateScreenWidth = () => {
  store.commit("setWindowWidth");
};

onMounted(async () => {
  updateScreenWidth();
  window.addEventListener("resize", updateScreenWidth);

  if (!store.state.user && store.getters.isAuthenticated) {
    try {
      await store.dispatch("fetchCurrentUser");
    } catch (e) {
      console.error("Erreur lors du chargement de l'utilisateur", e);
    }
  }

  storeReady.value = true;
});

onUnmounted(() => {
  window.removeEventListener("resize", updateScreenWidth);
});
</script>

<template>
  <div id="app">
    <div v-if="storeReady" :class="[
      'app__container',
      {
        'app__container--auth': isAuthenticated,
        'app__container--sidebar-closed': isAuthenticated && isSideBarClosed && !isMobile,
        'app__container--sidebar-open': isAuthenticated && !isSideBarClosed && !isMobile
      }
    ]" class="app__container">
      <NavBar v-if="isAuthenticated" />
      <Toolbar v-if="isAuthenticated && isMobile">{{ routeName }}</Toolbar>

      <router-view :key="$route.fullPath" />

      <TheFooter v-if="isAuthenticated" />
    </div>
  </div>
</template>

<style lang="scss">
@import "./assets/scss/main.scss";
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap");

.app {
  background-color: #6d6d6d;

  &__container {
    z-index: 1;
    width: 100%;
    margin: 0 auto;
    height: 100vh;
    transition: padding-left 0.3s ease;

    &--auth {
      padding-left: 0;
    }

    &--sidebar-closed {
      padding-left: 85px;
    }

    &--sidebar-open {
      padding-left: 270px;
    }
  }
}
</style>
