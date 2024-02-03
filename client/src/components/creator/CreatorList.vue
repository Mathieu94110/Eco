<template>
  <div class="creator-list">
    <div className="creator-list__content container">
      <div v-for="item in creators" :key="item.id">
        <CreatorItem :creatorItem="item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { CreatorItem } from "@/components/creator";

defineProps<{
  creators: any;
}>();
</script>

<style scoped lang="scss">
.creator-list {
  margin-top: 140px;
  height: 100%;
  width: 100%;
  &__content {
    display: grid;
    gap: 40px;
  }
}

@media screen and (min-width: 768px) {
  .creator-list {
    &__content {
      grid-template-columns: repeat(2, 1fr);
      align-items: stretch;
    }
  }
}

@media screen and (min-width: 1200px) {
  .creator-list {
    &__content {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
