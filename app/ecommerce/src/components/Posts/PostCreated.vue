<template>
  <div class="card" v-if="post">
    <div class="card__img">
      <img :src="post.image" />
    </div>
    <div class="card__items">
      <div class="card__labels"><label for="name">Titre</label></div>
      <div class="card__field">{{ post.title }}</div>
    </div>

    <div class="card__items">
      <div class="card__labels"><label for="name">Description</label></div>
      <div class="card__field">{{ post.description }}</div>
    </div>
    <div class="card__items">
      <div class="card__labels"><label for="name">Catégorie</label></div>
      <div class="card__field">{{ post.category }}</div>
    </div>
    <div class="card__items">
      <div class="card__labels"><label for="name">Prix</label></div>
      <div class="card__field">{{ post.price }}€</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostCreated",
  data() {
    return {
      post: null,
    };
  },
  props: ["currentPost"],
  watch: {
    currentPost(newValue) {
      this.post = newValue;
    },
    immediate: true,
  },
};
</script>

<style lang="scss" scoped>
.card {
  max-height: 713px;
  width: 320px;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-evenly;
  text-shadow: 0px 2px 2px #bbbbbb;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  border-radius: 20px;

  &__items {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &__labels {
    background: #4f95ff;
    color: #fff;
    font-size: 18px;
  }
  &__field {
    font-size: 15px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &__img {
    width: 200px;
    height: 200px;
    display: block;
    cursor: pointer;
    margin: 14px auto;
    background-size: cover;
    background-position: center center;
    overflow: none;
  }
}
</style>
