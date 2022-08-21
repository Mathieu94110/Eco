<template>
  <div class="sidebar-container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "sidebar-container",
};
</script>

<style lang="scss" scoped>
.sidebar-container {
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #e7e9f5, #dfe4f2);
  padding: 20px 0px;
}
</style>
