<script lang="ts">
import NavBar from "@/components/NavBar/NavBar.vue";
import Toolbar from "./components/Toolbar/Toolbar.vue";
import { computed, inject } from "vue";
import { mapGetters } from "vuex";
import { useRoute } from "vue-router";
import store from "./store";
import TheFooter from "@/components/TheFooter/TheFooter.vue";

export default {
  name: "App",
  components: {
    NavBar,
    Toolbar,
    TheFooter,
  },
  data() {
    return {
      sideBarClosed: false,
    };
  },
  // Used to detect globally screen width changes due to a variable saved in store
  mounted() {
    this.updateScreenWidth();
    this.onScreenResize();
    this.sideBarClosed = inject<boolean>("collapsed")!;
  },
  methods: {
    onScreenResize() {
      window.addEventListener("resize", () => {
        this.updateScreenWidth();
      });
    },
    updateScreenWidth() {
      store.commit("setWindowWidth");
    },
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
    isMobile() {
      return store?.state.windowWidth < 575;
    },
    routeName() {
      return useRoute().name;
    },
  },
  watch: {
    isAuthenticated: {
      handler(isAuthenticated) {
        if (isAuthenticated) {
          store.dispatch("fetchUserFavorites");
        }
      },
    },
  },
};
</script>

<template>
  <div id="app">
    <div
      :class="{ 'app__container--auth': isAuthenticated }"
      class="app__container"
      :style="{
        paddingLeft:
          sideBarClosed && isAuthenticated && !isMobile ? '85px' : !sideBarClosed && isAuthenticated ? '270px' : 'auto',
        transition: !sideBarClosed && isAuthenticated && '0.3s',
      }"
    >
      <NavBar v-if="isAuthenticated" />
      <Toolbar v-if="isAuthenticated && isMobile">{{ routeName }}</Toolbar>
      <div v-if="!isMobile">
        <router-view></router-view>
      </div>

      <div
        v-else
        :style="{
          paddingLeft: 'auto',
        }"
      >
        <router-view></router-view>
      </div>
      <TheFooter />
    </div>
  </div>
</template>

<style lang="scss">
@import "./assets/scss/main.scss";
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap");

.app {
  background: #6d6d6d;
  &__container {
    z-index: 1;
    width: 100%;
    margin: auto;
    height: 100vh;
    &__auth {
      padding-left: 85px;
    }
  }
}
</style>
