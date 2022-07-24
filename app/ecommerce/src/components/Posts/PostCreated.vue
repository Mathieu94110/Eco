<template>
  <div class="card" v-if="post">
    <div class="card__img">
      <img :src="post.image" />
    </div>
    <div
      style="
        height: 40px;
        margin: 20px 0px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      "
    >
      <label for="name">Titre</label>
      <div class="form-field">{{ post.title }}</div>
    </div>

    <div
      style="
        height: 60px;
        margin: 20px 0px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      "
    >
      <label for="name">Description</label>
      <div class="form-field">{{ post.description }}</div>
    </div>

    <div
      style="
        height: 60px;
        margin: 20px 0px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      "
    >
      <label for="name">Prix</label>
      <div class="form-field">{{ post.price }}</div>
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
  height: 100%;
  width: 320px;
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 20px;
  font-size: 20px;
  text-align: center;
  text-shadow: 0px 2px 2px #bbbbbb;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  border-radius: 20px;
  &__img {
    width: 200px;
    height: 200px;
    display: block;
    cursor: pointer;
    margin: 0 auto 14px;
    background-size: cover;
    background-position: center center;
    overflow: hidden;
  }
}
</style>
