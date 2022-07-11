<template>
  <Navbar />
  <div :style="{ 'margin-left': navbarWidth }">
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar";
import { navbarWidth } from "@/components/Navbar/state";

export default {
  name: "App",
  components: {
    Navbar,
  },
 setup() {
    return { navbarWidth }
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap");

* {
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  max-width: 100%;
  text-align: center;
}

body {
  background-image: linear-gradient(62deg, #6685ff 0%, #2946ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 32px;
}

img {
  max-width: 100%;
  border-radius: 8px;
}

.card {
  max-width: 100%;
  width: 540px;
  background: white;
  border-radius: 16px;
  padding: 32px;
}

.card__title {
  text-align: center;
  font-weight: 800;
}

.card__subtitle {
  text-align: center;
  color: #666;
  font-weight: 500;
}

.button {
  background: #2196f3;
  color: white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 100%;
  padding: 16px;
  transition: 0.4s background-color;
}

.card__action {
  color: #2196f3;
  text-decoration: underline;
}

.card__action:hover {
  cursor: pointer;
}

.button:hover {
  cursor: pointer;
  background: #1976d2;
}

.button--disabled {
  background: #cecece;
  color: #ececec;
}
.button--disabled:hover {
  cursor: not-allowed;
  background: #cecece;
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
