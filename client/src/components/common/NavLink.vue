<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHouse,
  faStar,
  faGamepad,
  faHeart,
  faEye,
  faTrash,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

library.add(faHouse, faStar, faGamepad, faHeart, faEye, faTrash, faArrowRight, faArrowLeft);

const props = defineProps<{
  to: string;
  icon: string;
}>();

const route = useRoute();
const isActive = computed(() => route.path === props.to);
</script>

<template>
  <router-link :to="to" class="nav-link" :class="{ 'nav-link--active': isActive }">
    <font-awesome-icon class="nav-link__icon" :icon="['fas', icon]" />
    <slot />
  </router-link>
</template>

<style lang="scss" scoped>
.nav-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  font-weight: 400;
  user-select: none;
  margin: 0.1em 0;
  padding: 0.4em;
  border-radius: 0.25em;
  height: 1.5em;
  color: var(--primary-color);
  text-decoration: none;
  flex-shrink: 0;

  &:hover {
    color: var(--primary-1);
  }

  &--active {
    background-color: var(--primary-1);
    width: 100%;
  }

  &__icon {
    flex-shrink: 0;
    width: 25px;
    margin-right: 10px;
  }
}
</style>
