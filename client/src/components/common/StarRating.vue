<template>
  <ul class="star-rating">
    <li v-for="(n, idx) in 5" :key="idx">
      <tempate v-if="rating >= idx + 1">
        <i class="fa-solid fa-star"></i>
      </tempate>
      <tempate v-else-if="rating >= val(idx)"><i class="fa-solid fa-star-half"></i> </tempate>
      <tempate v-else><i class="fa-regular fa-star"></i></tempate>
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps<{
  rating: {
    type: Number;
  };
}>();

function val(index: number): number {
  return index + 0.5;
}
</script>

<style>
.star-rating {
  display: flex;
  align-items: flex-start;
  color: var(--primary-1);
  position: absolute;
  right: 18px;
  bottom: 10px;
  z-index: 1;
}
</style>
