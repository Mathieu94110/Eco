<template>
  <div class="sidebar-container">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-container {
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #15263f, #dfe4f2);
  padding: 20px 0px;
}
</style>
