<template>
  <NavBarContainer
    :class="{ 'topbar--active': isHover || isTopbarLocked }"
    class="topbar is-unshrink"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <router-link class="mb-5 topbar__logo is-unshrink" to="/">
      <img alt="user_logo" class="topbar__img" src="@/assets/logo.png" />
    </router-link>
    <div @click="logout()" icon="fas fa-sign-out">Se déconnecter</div>
    <NavBarLink to="/user-informations" icon="fas fa-user-circle"
      >Mes informations</NavBarLink
    >
    <NavBarLink to="/dashboard" icon="fas fa-columns">Dashboard</NavBarLink>
    <NavBarLink to="/post-add" icon="fas fa-columns"
      >Déposer une annonce</NavBarLink
    >
    <NavBarLink to="/favorites" icon="fas fa-columns">Mes favoris</NavBarLink>
  </NavBarContainer>
</template>

<script>
import NavBarContainer from "./NavBarContainer/NavBarContainer";
import NavBarLink from "./NavBarLink";

import mitt from "mitt";
const emitter = mitt();
import { mapState } from "vuex";

export default {
  name: "NavBar",
  components: {
    NavBarContainer,
    NavBarLink,
  },
  data() {
    return {
      isHover: false,
      windowWidth: 0,
    };
  },
  methods: {
    logout: function () {
      this.$store.commit("loginStatus", false);
      this.$store.commit("logout");
      this.$router.push("/");
    },
    setWindowWidth() {
      this.windowWidth = window.innerWidth;
    },
  },
  computed: {
    ...mapState({
      profile: (state) => state.user.profile,
    }),
    isMarvinRecruiter() {
      return this.$store.getters["user/isMarvinRecruiter"];
    },
    isSuperUser() {
      return this.$store.getters["user/isSuperUser"];
    },
    isShappers() {
      return this.$store.getters["user/isShappers"];
    },
    isTopbarLocked() {
      return this.windowWidth >= 1600;
    },
  },
  created() {
    this.setWindowWidth();

    window.addEventListener("resize", this.setWindowWidth);
    emitter.on("hook:destroyed", () => {
      window.removeEventListener("resize", this.setWindowWidth);
    });
  },
};
</script>

<style lang="scss" scoped>
.topbar {
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  max-width: 85px;
  box-shadow: 0 3px 6px #00000029;
  transition: 0.3s;
  z-index: 5;
  width: 100%;
  overflow: auto;

  @media (min-width: 1600px) {
    max-width: 230px;
  }

  &--active {
    max-width: 230px;
  }

  &__logo {
    overflow: hidden;
  }

  &__img {
    height: 35px;
  }

  &__help {
    margin-top: auto;
    bottom: 85px;
    right: 8px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 2.3em;
    font-weight: bold;
    z-index: 100;
    transition: 0.15s;

    &:focus,
    &:visited {
      color: blue;
    }

    &:hover {
      background: blue;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
