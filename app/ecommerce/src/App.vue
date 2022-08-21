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
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap");

* {
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app {
  &__container {
    z-index: 1;
    width: 100%;
    margin: auto;

    &__auth {
      padding-left: 85px;
    }
  }
}

img {
  max-width: 100%;
  border-radius: 8px;
}
.sidebar {
  flex-flow: 1;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
