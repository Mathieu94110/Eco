<script setup lang="ts">
import Login from "@/components/common/Login/Login.vue";
</script>

<template>
  <div class="auth-page">
    <Login class="auth-page__form" />
  </div>
</template>

<style scoped lang="scss">
@use "../assets/scss/mixins" as m;

.auth-page {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &__form {
    width: 100%;
  }

  @include m.xs-md {
    height: 100vh;
  }
}
</style>
