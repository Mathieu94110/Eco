<template>
  <div v-if="props.currentPost">
    <CardLayout class="post-created">
      <template #image class="post-created__img-wrapper">
        <img
          :src="props.currentPost.image"
          class="post-created__img-content"
          alt="product-image"
        />
      </template>
      <template #title>
        <span>{{ props.currentPost.title }}</span>
      </template>
      <template #description>
        <span>{{ props.currentPost.description }}</span>
      </template>
      <template #price>
        <span>{{ props.currentPost.price }} €</span>
      </template>
      <template class="favorite-card__category" #category>
        <span>{{ props.currentPost.category }}</span>
      </template>
    </CardLayout>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import CardLayout from '../Layout/CardLayout.vue';

const props = defineProps(['currentPost']);
</script>

<style lang="scss" scoped>
@use "../../assets/scss/mixins" as m;

.post-created {
  width: 80%;
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
  .post-created {
    margin: auto;
  }
}
@include m.sm {
  .post-created {
    height: 630px;
    width: 320px;
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
