<template>
  <div class="toolbar">
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
  background: var(--primary-1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @include mixins.xs {
    font-size: 20px;
  }
}
</style>
