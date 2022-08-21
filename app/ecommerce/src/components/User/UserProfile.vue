<template>
  <div class="user-card" v-if="userInfos">
    <h1 class="user-card__items">Informations du profil</h1>
    <h2 class="user-card__item">{{ userInfos.firstName }}</h2>
    <h2 class="user-card__item">{{ userInfos.lastName }}</h2>
    <h2 class="user-card__item">{{ userInfos.email }}</h2>
  </div>
</template>

<script>
export default {
  name: "user-profile",
  props: ["userInfos"],
};
</script>

<style scoped lang="scss">
.user-card {
  width: 500px;
  height: 300px;
  color:black &__items {
    justify-content: space-evenly;
  }
}
</style>
