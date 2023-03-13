<script setup lang="ts">
import { watch, ref, defineProps } from "vue";
import { useRoute } from "vue-router";
import type { FakeAdInterface } from "@/shared/interfaces";

const props = defineProps<{
  ad: FakeAdInterface;
  favorites: FakeAdInterface[];
}>();

const emit = defineEmits<{
  (e: "send-ad", ad: FakeAdInterface): void;
  (e: "add-item", ad: FakeAdInterface): void;
}>();
const route = useRoute();
const isFavorited = ref<boolean>(false);

watch(
  () => props.favorites,
  () => {
    isFavorited.value = props.favorites.some((favorite) => favorite.id === props.ad.id);
  },
  { immediate: true },
);
</script>

<template>
  <div class="ad-card">
    <div class="ad-card__thumbnail" @click="$emit('send-ad', props.ad)">
      <img v-if="props.ad.images" :src="props.ad.images[0]" alt="{{props.ad.title}}" />
    </div>
    <div class="d-flex space-between align-center mr-20">
      <div>
        <span class="ad-card__title">{{ props.ad.title }}</span>
        <span class="ad-card__price">{{ props.ad.price }} €</span>
      </div>
      <span @click="emit('add-item', props.ad)" class="ad-card__heart" :class="{ active: isFavorited }">
        <i class="fas fa-heart"></i>
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../../assets/scss/mixins" as mixin;

.ad-card {
  padding: 5px;
  width: 366px;
  height: 420px;
  @include mixin.xs-xl {
    padding: 5px;
    width: 260px;
  }
  cursor: pointer;
  &__thumbnail {
    width: auto;
    height: 250px;
    background-color: rgba(0, 0, 0, 0.05);
    margin-bottom: 10px;
    padding: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    @include mixin.md {
      height: 350px;
    }
    img {
      transition: all ease 0.3s;
      display: block;
      width: auto;
      height: 200px;
      &:hover {
        transform: scale(1.2);
      }
    }
  }

  &__title {
    font-size: 14px;
    display: block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    @include mixin.md {
      font-size: 16px;
      margin-bottom: 10px;
    }
  }

  &__price {
    font-size: 18px;
    @include mixin.md {
      font-size: 24px;
    }
  }

  &__heart {
    padding: 10px;
    &:hover {
      cursor: pointer;
    }
    &.active {
      color: var(--danger-1);
    }
  }
}
</style>
