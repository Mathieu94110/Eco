<template>
  <div class="creator-list">
    <div class="creator-list__grid container">
      <CreatorItem v-for="item in creators" :key="item.id" :creatorItem="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import CreatorItem from "@/components/creator/CreatorItem.vue";

import type { CreatorItemType } from "@/types";

defineProps<{
  creators: CreatorItemType[];
}>();
</script>

<style scoped lang="scss">
.creator-list {
  margin-top: 140px;
  width: 100%;

  &__grid {
    display: grid;
    gap: 40px;
    grid-template-columns: 1fr;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1200px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
