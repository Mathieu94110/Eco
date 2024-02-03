<template>
  <div class="stores-list container">
    <template v-for="item in stores" :key="item.id">
      <StoreItem :storeItem="item" />
    </template>
  </div>
</template>

<script setup lang="ts">
import {StoreItem} from "@/components/store";

defineProps<{
  stores: any[];
}>();
</script>

<style scoped lang="scss">
.stores-list {
  display: grid;
    grid-template-columns: repeat(1, 1fr);
  @media screen and (min-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 32px;
  }
}
</style>
