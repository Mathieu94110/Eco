<template>
  <div class="stores-list">
    <template v-for="item in stores" :key="item.id">
      <StoreItem :storeItem="item" />
    </template>
  </div>
</template>

<script setup lang="ts">
import StoreItem from "@/components/StoreItem/StoreItem.vue";

defineProps<{
  stores: any[];
}>();
</script>

<style scoped lang="scss">
.store-list {
  display: grid;
  @media screen and (min-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 32px;
  }
}
</style>
