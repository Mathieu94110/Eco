<template>
  <div class="navbar-container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "navbar-container",
};
</script>

<style lang="scss" scoped>
.navbar-container {
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #e7e9f5, #dfe4f2);
  padding: 20px;
}
</style>
