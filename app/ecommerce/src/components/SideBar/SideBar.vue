<template>
  <SideBarContainer
    :class="{ 'topbar--active': isHover }"
    class="topbar"
    @mouseenter="formatSideBar(true)"
    @mouseleave="formatSideBar(false)"
  >
    <router-link to="/">
      <img alt="user_logo" class="topbar__img" src="@/assets/images/logo.png" />
    </router-link>
    <div class="topbar__items">
      <button
        v-if="isHover"
        class="topbar__link--error"
        @click="logout()"
        icon="fa-solid fa-right-from-bracket"
      >
        Se déconnecter
      </button>
      <div v-else @click="logout()">
        <SideBarLink
          class="topbar__link"
          to="/profile"
          icon="fa-solid fa-right-from-bracket"
        ></SideBarLink>
      </div>

      <SideBarLink class="topbar__link" to="/profile" icon="fas fa-user-circle"
        ><span>Mes informations</span></SideBarLink
      >
      <SideBarLink
        class="topbar__link"
        to="/dashboard"
        icon="fa-solid fa-handshake-angle"
        ><span>Annonces</span></SideBarLink
      >
      <SideBarLink class="topbar__link" to="/post-add" icon="fas fa-pencil-alt"
        ><span>Déposer une annonce</span></SideBarLink
      >
      <SideBarLink class="topbar__link" to="/user-adds" icon="fas fa-pencil-alt"
        ><span>Mes annonces</span></SideBarLink
      >
      <SideBarLink class="topbar__link" to="/favorites" icon="fas fa-star"
        ><span>Mes favoris</span></SideBarLink
      >
    </div>
  </SideBarContainer>
</template>

<script>
import SideBarContainer from "./SideBarContainer/SideBarContainer";
import SideBarLink from "./SideBarLink";
import mitt from "mitt";
const emitter = mitt();

export default {
  name: "SideBar",
  components: {
    SideBarContainer,
    SideBarLink,
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
    formatSideBar(value) {
      this.isHover = value;
      this.$toggleSidebar();
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
  flex-shrink: 0;
  &__items {
    height: 260px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  &__link {
    color: #fff;
    padding-left: 30px;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    &--error {
      color: rgb(255, 30, 30);
    }
    span {
      margin-left: 20px;
      &:hover {
        color: #4f95ff;
      }
    }
    overflow-wrap: normal;
  }

  &--active {
    max-width: 270px;
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
