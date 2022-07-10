<template>
  <div class="card">
    <h1 class="card__title">Espace Perso</h1>
    <p class="card__subtitle">Bonjour {{ user.prenom }}</p>
    <div class="form-row">
      <button @click="logout()" class="button">
        Déconnexion
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Profile",
  mounted: function() {
   let token = this.$store.state.user?.token;
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      return;
    }
   this.$store.dispatch("getUserInfos", {token:token});
  },
  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },
  methods: {
    logout: function() {
      this.$store.commit("logout");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped></style>>
