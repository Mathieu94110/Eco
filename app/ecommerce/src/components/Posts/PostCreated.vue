<template>
  <div class="card" v-if="currentPost">
    <div class="card__img-wrapper">
      <div class="card__img-content">
        <img :src="currentPost.image" />
      </div>
    </div>
    <div class="card__items-title">
      <div class="card__labels"><label for="name">Titre</label></div>
      <div class="card__field">{{ currentPost.title }}</div>
    </div>

    <div class="card__items-description">
      <div class="card__labels"><label for="name">Description</label></div>
      <div class="card__field">{{ currentPost.description }}</div>
    </div>
    <div class="card__items-category">
      <div class="card__labels"><label for="name">Catégorie</label></div>
      <div class="card__field">{{ currentPost.category }}</div>
    </div>
    <div class="card__items-price">
      <div class="card__labels"><label for="name">Prix</label></div>
      <div class="card__field">{{ currentPost.price }}€</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["currentPost"],
};
</script>

<style lang="scss" scoped>
@use "../../assets/scss/mixins" as m;

.card {
  width: 80%;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-evenly;
  text-shadow: 0px 2px 2px #bbbbbb;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  border-radius: 20px;
  margin: 0;

  &__items {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    &-title {
      height: 46px;
    }
    &-description {
      height: 64px;
    }
    &-category {
      height: 47px;
    }
    &-price {
      height: 47px;
    }
  }
  &__labels {
    background: #4f95ff;
    color: #fff;
    font-size: 18px;
  }
  &__field {
    font-size: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &__img-wrapper {
    height: 114px;
    margin-bottom: 20px;
  }
  &__img-content {
    width: 100px;
    height: 100px;
    overflow: hidden;
    display: block;
    cursor: pointer;
    margin: 14px auto;
    background-size: cover;
    background-position: center center;
    overflow: none;
  }
}
@media (max-width: 768px) {
  .card {
    margin: auto;
  }
}
@include m.sm {
  .card {
    height: 630px;
    width: 320px;

    &__field {
      height: 100%;
    }
    &__img-wrapper {
      height: auto;
      margin-bottom: 0px;
    }
    &__img-content {
      width: 160px;
      height: 160px;
    }
  }
}
</style>
