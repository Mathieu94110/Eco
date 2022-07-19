<template>
  <div class="toolbar">
    <slot></slot>
  </div>
</template>

<style scoped>
.toolbar {
  width: 100%;
  font: 26px bold;
  height: 60px;
  background: #4f95ff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
