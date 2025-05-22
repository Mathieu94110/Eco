<script setup lang="ts">
import { defineProps } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faStar as fasStar,
  faStarHalfAlt as fasStarHalf,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";

library.add(fasStar, fasStarHalf, farStar);

const props = defineProps<{
  rating: number;
}>();

function val(index: number): number {
  return index + 0.5;
}
</script>

<template>
  <ul class="star-rating">
    <li v-for="(n, idx) in 5" :key="idx">
      <template v-if="props.rating >= idx + 1">
        <font-awesome-icon :icon="['fas', 'star']" />
      </template>
      <template v-else-if="props.rating >= val(idx)">
        <font-awesome-icon :icon="['fas', 'star-half-alt']" />
      </template>
      <template v-else>
        <font-awesome-icon :icon="['far', 'star']" />
      </template>
    </li>
  </ul>
</template>

<style scoped>
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
