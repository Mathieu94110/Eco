<template>
  <div class="title">
    <h3 class="title__content">
      {{ props.title.primary }} <span>{{ props.title.secondary }}</span>
    </h3>
    <div class="title__line"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: {
    primary: { type: String; required: true };
    secondary: { type: String; required: true };
  };
}>();
</script>

<style lang="scss" scoped>
.title {
  padding: 12px 0;
  text-align: center;
  font-weight: 800;
  font-size: 20px;
  letter-spacing: 0.1em;
  color: #fff;
  margin-bottom: 40px;
  font-family: inherit;
  &__content {
    text-transform: uppercase;
    position: relative;
    span {
      color: var(--pink-1);
    }
  }
  &__line {
    margin-top: 16px;
    height: 6px;
    width: 160px;
    margin-right: auto;
    margin-left: auto;
    background-color: var(--primary-1);
    position: relative;
    &::after {
      content: "";
      position: absolute;
      left: -5px;
      border-right: 6px solid var(--primary-1);
      border-bottom: 3.5px solid transparent;
      border-top: 3.5px solid transparent;
    }
    &::before {
      content: "";
      position: absolute;
      right: -6px;
      border-left: 6px solid var(--primary-1);
      border-bottom: 3.5px solid transparent;
      border-top: 3.5px solid transparent;
    }
  }
}
@media (min-width: 800px) {
  .title {
    font-size: 32px;
  }
}
</style>
