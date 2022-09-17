<template>
  <div id="app">
    <div :class="{ 'app__container--auth': isLoggedIn }" class="app__container">
      <SideBar v-if="isLoggedIn" />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar/SideBar";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    SideBar,
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
};
</script>

<style lang="scss">
@import "./assets/scss/base.scss";
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap");

.app {
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
