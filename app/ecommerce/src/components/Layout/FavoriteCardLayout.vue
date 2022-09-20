<template>
  <div class="favorite-card__card">
    <div class="favorite-card__image">
      <slot name="image"></slot>
    </div>
    <div class="favorite-card__content">
      <div class="favorite-card__items">
        <span>Titre :</span>
        <div class="favorite-card__items-title">
          <slot name="title"></slot>
        </div>
      </div>
      <div class="favorite-card__items">
        <span>Description :</span>
        <div class="favorite-card__items-description">
          <slot name="description"></slot>
        </div>
      </div>
      <div class="favorite-card__items">
        <span>Prix :</span>
        <span><slot name="price"></slot></span>
      </div>
      <div class="favorite-card__items">
        <span>Catégorie :</span> <span><slot name="category"></slot></span>
      </div>
      <div class="favorite-card__footer">
        <div>
          <slot name="favorite"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watchEffect } from "vue";
import { useRoute } from "vue-router";

const state = reactive({
  isFavoritePage: false,
});

const route = useRoute();
watchEffect(route.name, (newValue) => {
  newValue === "Favorites"
    ? state.isFavoritePage === true
    : state.isFavoritePage === false;
});
</script>

<style scoped lang="scss">
@use "../../assets/scss/mixins";
.icon {
  display: flex;
}

.favorite-card {
  &__card {
    width: 320px;
    background-color: #15263f;
    color: #8bacd9;
    border-radius: 16px;
    padding: 16px 10px;
    margin: 20px;
    font-size: 1.2rem;
    box-shadow: 0 25px 50px 0 rgba(0, 0, 0, 0.1);
    @include mixins.xs {
      font-size: 1rem;
      margin: 10px 10px 0 10px;
      padding: 16px 10px 0px 10px;
      width: 90%;
    }
  }
  &__image {
    cursor: pointer;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    text-align: center;
  }
  &__content {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 12px 0 16px 0;
  }
  &__items {
    display: flex;
    flex-direction: column;
    > span {
      &:nth-child(odd) {
        color: #00fff8;
      }
      &:nth-child(even) {
        color: #fff;
      }
    }

    &-description {
      padding: 10px 0px;
      height: 100px;
      overflow: auto;
      @include mixins.xs {
        height: 60px;
      }
    }
    &-title {
      height: 60px;
      overflow: auto;
      @include mixins.xs {
        height: 30px;
      }
    }
  }

  &__footer {
    border-top: 1px solid #2e405a;
    padding-top: 16px;
  }
}
</style>
