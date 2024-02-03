<template>
  <div class="loader">
    <img :src="loader" alt="preloader" />
  </div>
</template>

<script setup lang="ts">
import loader from "@/assets/images/loader.gif";
</script>

<style lang="scss" scoped>
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 60px;
  }
}
@media screen and (min-width: 600px) {
  .loader {
    img {
      max-width: 120px;
    }
  }
}
</style>
