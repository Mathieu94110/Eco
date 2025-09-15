<template>
  <div id="app" :class="classes">
    <NavBar />
    <Toolbar v-if="isAuthenticated && isMobile">{{ routeName }}</Toolbar>
    <router-view :key="$route.fullPath" />
    <TheFooter v-if="isAuthenticated" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, inject, type Ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

import NavBar from "@/components/common/NavBar.vue";
import Toolbar from "@/components/common/Toolbar.vue";
import TheFooter from "@/components/common/TheFooter.vue";

const store = useStore();
const route = useRoute();

const isSideBarClosed = inject<Ref<boolean>>("collapsed", ref(true));
const isMobile = computed(() => store.state.windowWidth < 575);
const isAuthenticated = computed(() => store.getters.isAuthenticated);
const routeName = computed(() => route.name);
const updateScreenWidth = () => {
  store.commit("setWindowWidth");
};

onMounted(() => {
  updateScreenWidth();
  window.addEventListener("resize", updateScreenWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateScreenWidth);
});

const classes = computed(() => {
  if (!isAuthenticated.value) {
    return ['app__container'];
  }

  const sidebarClass = isMobile.value
    ? ''
    : isSideBarClosed.value
      ? 'app__container--sidebar-closed'
      : 'app__container--sidebar-open';

  return [
    'app__container',
    'app__container--auth',
    sidebarClass
  ].filter(Boolean);
});
</script>

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
