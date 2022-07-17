<template>
  <div class="user-card" v-if="user">
    <h1 class="user-card__items">Informations du profil</h1>
    <h2 class="user-card__item">{{ firstName }}</h2>
    <h2 class="user-card__item">{{ lastName }}</h2>
  </div>
</template>

<script>
export default {
  name: "user-profile",
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
    };
  },
};
</script>

<style scoped lang="scss">
.user-card {
  width: 500px;
  height: 300px;
  background: yellow;
  &__items {
    justify-content: space-evenly;
  }
}
</style>
