<template>
    <div class="toolbar">
      <slot></slot>
    </div>
</template>

<style scoped>
.toolbar {
  width: 100%;
  height: 60px;
  background: rgb(216, 216, 216);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
