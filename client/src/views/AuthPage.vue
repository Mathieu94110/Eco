<script setup lang="ts">
import Login from "@/components/Login/Login.vue";
</script>

<template>
  <div class="auth">
    <Login></Login>
  </div>
</template>

<style lang="scss" scoped>
.auth {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
@media screen and (max-width: 768px) {
  .auth {
    height: 100vh;
  }
}
</style>
