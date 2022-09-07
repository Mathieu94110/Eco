<template>
  <div class="not-found">
    <div class="not-found__content">
      <h1>Page non trouvée !</h1>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss">
.not-found {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &__content {
    width: 320px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
