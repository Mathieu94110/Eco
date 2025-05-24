<template>
  <div class="title">
    <h3 class="title__content">
      {{ title.primary }} <span>{{ title.secondary }}</span>
    </h3>
    <div class="title__line"></div>
  </div>
</template>

<script setup lang="ts">
const { title } = defineProps<{
  title: {
    primary: string;
    secondary: string;
  };
}>();
</script>

<style lang="scss" scoped>
@use '../../assets/scss/mixins' as m;

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

@include m.md {
  .title {
    font-size: 32px;
  }
}
</style>
