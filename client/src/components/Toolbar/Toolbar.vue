<script setup lang="ts"></script>
<template>
  <div class="toolbar" data-cy="toolbar">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@use "../../assets/scss/mixins";

.toolbar {
  width: 100%;
  font-size: 26px;
  font-weight: 600;
  height: 60px;
  background: var(--sidebar-item-active);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @include mixins.xs {
    font-size: 16px;
  }
  color: #fff;
}
</style>
