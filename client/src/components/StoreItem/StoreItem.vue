<template>
  <div class="store-item"></div>
</template>

<script setup lang="ts">
defineProps<{ storeItem: any }>();
</script>

<style scoped lang="scss">
.store-item {
  grid-template-columns: repeat(2, 1fr);
  min-height: 120px;
  margin: 16px 0;
}
</style>
