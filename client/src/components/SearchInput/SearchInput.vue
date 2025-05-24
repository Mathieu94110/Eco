<template>
  <div class="search-input container">
    <div class="search-input__input-container"
      :class="{ 'search-input__input-container--border-searching': isFocused }">
      <div class="search-input__search-icon" :class="{ 'search-input__search-icon--rotate': isFocused }">
        <font-awesome-icon :icon="['fa', 'fa-search']" aria-hidden="true" :size="22" />
      </div>
      <form class="search-input__form" @submit.prevent>
        <input type="text" placeholder="Rechercher" v-model="model" autocomplete="off" class="search-input__form-input"
          @focus="handleFocus" @blur="handleBlur" @keyup="keyUpInput" />
      </form>
      <svg class="search-input__search-border" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 671 111"
        xml:space="preserve">
        <path class="search-input__border" d="M335.5,108.5h-280c-29.3,0-53-23.7-53-53v0c0-29.3,23.7-53,53-53h280" />
        <path class="search-input__border" d="M335.5,108.5h280c29.3,0,53-23.7,53-53v0c0-29.3-23.7-53-53-53h-280" />
      </svg>
      <div class="search-input__go-icon" :class="{ 'search-input__go-icon--visible': isSearchIcon }"
        @click="emit('search-game')">
        <font-awesome-icon :icon="['fa', 'fa-arrow-right']" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const emit = defineEmits<{
  (e: "search-game"): void;
}>();

const model = defineModel();

const searchInputFocused = ref(false);
const displaySearchIcon = ref(false);

const isFocused = computed({
  get: () => searchInputFocused.value,
  set: (val) => (searchInputFocused.value = val),
});

const isSearchIcon = computed({
  get: () => displaySearchIcon.value,
  set: (val) => (displaySearchIcon.value = val),
});

function handleFocus() {
  isFocused.value = true;
}
function handleBlur() {
  isFocused.value = false;
}

const keyUpInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  displaySearchIcon.value = value.length > 0;
};
</script>

<style scoped lang="scss">
@use '../../assets/scss/mixins' as m;

.search-input {
  margin-bottom: 30px;

  &__input-container {
    position: relative;
    width: 100%;
    max-width: 360px;
    height: 60px;
    border-radius: 120px;
    margin: 0 auto;

    &--border-searching {
      .search-input__border {
        stroke-dasharray: 740;
        stroke-dashoffset: 459;
        transition: stroke-dashoffset 650ms cubic-bezier(0.755, 0.15, 0.205, 1);
      }
    }
  }

  &__search-icon {
    position: absolute;
    top: 0;
    left: 10px;
    width: 20px;
    height: 60px;
    line-height: 61px;
    text-align: center;
    color: #fff;
    pointer-events: none;
    will-change: transform;
    transform-origin: center center;
    transform: rotate(0deg);
    transition: transform 400ms 220ms cubic-bezier(0.19, 1, 0.22, 1);

    &--rotate {
      transform: rotate(90deg);
      top: -10px;
      left: 10px;
      width: 20px;
    }
  }

  &__form {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 120px;

    &-input {
      font-family: "Montserrat Alternates", sans-serif;
      width: 100%;
      height: 100%;
      border: none;
      background: transparent;
      padding: 0 68px 0 50px;
      color: #fff;
      font-size: 1em;
      font-weight: 400;
      letter-spacing: -0.015em;
      outline: none;

      &::placeholder {
        color: #fff;
      }

      &::selection {
        color: #fff;
        background: rgba(0, 0, 0, 0.25);
      }
    }
  }

  &__search-border {
    display: block;
    width: 100%;
    max-width: 360px;
    height: 60px;

    & path {
      fill: none;
      stroke: #fff;
      stroke-width: 5;
      stroke-miterlimit: 10;
      stroke-dasharray: 740;
      stroke-dashoffset: 0;
      transition: stroke-dashoffset 400ms cubic-bezier(0.6, 0.04, 0.735, 0.99);
    }
  }

  &__go-icon {
    position: absolute;
    top: 0;
    right: 0;
    height: 60px;
    width: 86px;
    line-height: 61px;
    text-align: center;
    color: #fff;
    font-size: 1.38em;
    cursor: default;
    pointer-events: none;
    opacity: 0;
    transform: rotate(45deg);
    transition: opacity 190ms ease-out, transform 260ms cubic-bezier(0.19, 1, 0.22, 1);

    &--visible {
      opacity: 1;
      pointer-events: auto;
      cursor: pointer;
      transform: rotate(0);
      transition-delay: 20ms;
    }
  }
}

@include m.sm {
  .search-input {
    &__search-icon {
      width: 30px;
      left: 10px;
    }

    &__form-input {
      padding: 0 68px;
      font-size: 1.32em;
    }
  }
}
</style>
