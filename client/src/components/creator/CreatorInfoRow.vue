<template>
  <li>
    <span class="label">{{ label }}</span>
    <span>{{ value }}</span>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  value: string | number;
}>();
</script>

<style scoped lang="scss">
.label {
  font-weight: 600;
  color: var(--pink-1);
  ;
}
</style>
