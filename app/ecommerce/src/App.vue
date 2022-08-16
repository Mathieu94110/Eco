<template>
  <div id="app">
    <div :class="{ 'app__container--auth': isLoggedIn }" class="app__container">
      <NavBar v-if="isLoggedIn" />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar/NavBar";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    NavBar,
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

#app {
  width: 100%;
  height: 100vh;
  margin: auto;
}
.app {
  &__container {
    z-index: 1;
    width: 100%;
    height: 100vh;
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
.navbar {
  flex-flow: 1;
}
.wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 3;
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
