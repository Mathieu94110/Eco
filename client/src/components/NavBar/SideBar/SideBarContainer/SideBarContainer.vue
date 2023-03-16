<script setup lang="ts"></script>
<template>
  <div class="sidebar-container">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-container {
  display: flex;
  flex-direction: column;
  background: var(--sidebar-item-active);
  text-align: center;
}
</style>
