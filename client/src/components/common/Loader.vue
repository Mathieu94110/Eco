<template>
  <div class="loader">
    <img :src="loader" alt="preloader" />
  </div>
</template>

<script setup lang="ts">
import loader from "@/assets/images/loader.gif";
</script>

<style lang="scss" scoped>
@use "../../assets/scss/mixins" as m;

.loader {
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 60px;
  }
}

@include m.sm {
  .loader {
    img {
      max-width: 120px;
    }
  }
}
</style>
