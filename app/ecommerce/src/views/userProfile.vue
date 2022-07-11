<template>
  <div class="card">
    <h1 class="card__title">Espace Perso</h1>
    <p class="card__subtitle">Bonjour </p>
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
  name: 'Profile',
  mounted: function () {
    console.log('this.$route.params=',this.$route.params);
    console.log(this.$store.state.user);
    if (this.$store.state.user.userId == -1) {
      this.$router.push('/');
      return ;
    }
     this.$store.dispatch('getUserInfos', {id: this.userId});
  },
  computed: {
    ...mapState({
      user: 'userInfos',
    }),
    userId() {
      return this.$route.params.id
    }  
  },
  methods: {
    logout: function () {
      this.$store.commit('logout');
      this.$router.push('/');
    }
  }
}
</script>

<style scoped></style>>