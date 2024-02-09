<template>
  <div class="search-input container">
    <div
      class="search-input__input-container"
      :class="{ 'search-input__input-container--border-searching': isFocused }"
    >
      <div
        class="search-input__input-container__search-icon"
        :class="{ 'search-input__input-container__search-icon--rotate': isFocused }"
      >
        <i class="fa fa-search search-input__input-container__search-icon"></i>
      </div>
      <form action="" class="search-input__input-container__form" @submit.prevent>
        <input
          type="text"
          placeholder="Rechercher"
          v-model="model"
          class="search-input__input-container__form-search"
          autocomplete="off"
          @focus="handleFocus"
          @blur="handleBlur"
          @keyup="keyUpInput"
        />
      </form>
      <svg
        class="search-input__input-container__search-border"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
        x="0px"
        y="0px"
        viewBox="0 0 671 111"
        style="enable-background: new 0 0 671 111"
        xml:space="preserve"
      >
        <path class="border" d="M335.5,108.5h-280c-29.3,0-53-23.7-53-53v0c0-29.3,23.7-53,53-53h280" />
        <path class="border" d="M335.5,108.5h280c29.3,0,53-23.7,53-53v0c0-29.3-23.7-53-53-53h-280" />
      </svg>
      <div
        class="search-input__input-container__go-icon"
        :class="{ 'search-input__input-container__go-icon--go-in': isSearchIcon }"
        @click="emit('search-game')"
      >
        <i class="fa fa-arrow-right"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, reactive, ref } from "vue";
import type { Ref } from "vue";

const emit = defineEmits<{
  (e: "search-game"): void;
}>();

const model = defineModel();
const searchInputFocused: Ref<boolean | null> = ref(null);
const displaySearchIcon: Ref<boolean | null> = ref(null);

const isFocused = computed({
  get() {
    return searchInputFocused.value;
  },
  set(newValue) {
    searchInputFocused.value = newValue;
  },
});

const isSearchIcon = computed({
  get() {
    return displaySearchIcon.value;
  },
  set(newValue) {
    displaySearchIcon.value = newValue;
  },
});

function handleFocus() {
  isFocused.value = true;
}
function handleBlur() {
  isFocused.value = false;
}

const keyUpInput = (e: Event) => {
  if ((e.target as HTMLInputElement).value.length > 0) {
    displaySearchIcon.value = true;
  } else {
    displaySearchIcon.value = false;
  }
};
</script>

<style scoped lang="scss">
.search-input {
  margin-bottom: 30px;
  &__input-container {
    position: relative;
    width: 100%;
    max-width: 360px;
    height: 60px;
    border-radius: 120px;
    margin: 0 auto;
    &__search-icon,
    &__go-icon {
      position: absolute;
      top: 0;
      height: 60px;
      width: 86px;
      line-height: 61px;
      text-align: center;
    }
    &__search-icon {
      color: #fff;
      left: 10px;
      pointer-events: none;
      width: 20px;
      will-change: transform;
      transform: rotate(0deg);
      transform-origin: center center;
      -webkit-transform-origin: center center;
      -moz-transform-origin: center center;
      -o-transform-origin: center center;
      transition: transform 400ms 220ms cubic-bezier(0.19, 1, 0.22, 1);
      &--rotate {
        transform: rotate(90deg);
        width: 20px;
        top: -10px;
        left: 10px;
      }
    }
    &--border-searching {
      .border {
        stroke-dasharray: 740;
        stroke-dashoffset: 459;
        transition: stroke-dashoffset 650ms cubic-bezier(0.755, 0.15, 0.205, 1);
        -webkit-transition: stroke-dashoffset 650ms cubic-bezier(0.755, 0.15, 0.205, 1);
        -moz-transition: stroke-dashoffset 650ms cubic-bezier(0.755, 0.15, 0.205, 1);
        -o-transition: stroke-dashoffset 650ms cubic-bezier(0.755, 0.15, 0.205, 1);
      }
    }
    &__form {
      &-search {
        font-family: "Montserrat Alternates", sans-serif;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 120px;
        border: none;
        background: rgba(255, 255, 255, 0);
        padding: 0 68px 0 50px;
        color: #ffffff;
        font-size: 1em;
        font-weight: 400;
        letter-spacing: -0.015em;
        outline: none;
        &::-webkit-input-placeholder {
          color: #ffffff;
        }
        &::-moz-placeholder {
          color: #ffffff;
        }
        &:-ms-input-placeholder {
          color: #ffffff;
        }
        &:-moz-placeholder {
          color: #ffffff;
        }
        &::-moz-selection {
          color: #ffffff;
          background: rgba(0, 0, 0, 0.25);
        }
        &::selection {
          color: #ffffff;
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
        stroke: #ffffff;
        stroke-width: 5;
        stroke-miterlimit: 10;
        stroke-dasharray: 740;
        stroke-dashoffset: 0;
        transition: stroke-dashoffset 400ms cubic-bezier(0.6, 0.04, 0.735, 0.99);
        -webkit-transition: stroke-dashoffset 400ms cubic-bezier(0.6, 0.04, 0.735, 0.99);
        -moz-transition: stroke-dashoffset 400ms cubic-bezier(0.6, 0.04, 0.735, 0.99);
        -o-transition: stroke-dashoffset 400ms cubic-bezier(0.6, 0.04, 0.735, 0.99);
      }
    }
    &__go-icon {
      color: #fff;
      right: 0;
      pointer-events: none;
      font-size: 1.38em;
      will-change: opacity;
      cursor: default;
      opacity: 0;
      transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
      -moz-transform: rotate(45deg);
      -o-transform: rotate(45deg);
      transition: opacity 190ms ease-out, transform 260ms cubic-bezier(0.19, 1, 0.22, 1);
      -webkit-transition: opacity 190ms ease-out, transform 260ms cubic-bezier(0.19, 1, 0.22, 1);
      -moz-transition: opacity 190ms ease-out, transform 260ms cubic-bezier(0.19, 1, 0.22, 1);
      -o-transition: opacity 190ms ease-out, transform 260ms cubic-bezier(0.19, 1, 0.22, 1);
      &--go-in {
        opacity: 1;
        pointer-events: all;
        cursor: pointer;
        transform: rotate(0);
        -webkit-transform: rotate(0);
        -moz-transform: rotate(0);
        -o-transform: rotate(0);
        transition: opacity 190ms ease-out, transform 260ms 20ms cubic-bezier(0.19, 1, 0.22, 1);
        -webkit-transition: opacity 190ms ease-out, transform 260ms 20ms cubic-bezier(0.19, 1, 0.22, 1);
        -moz-transition: opacity 190ms ease-out, transform 260ms 20ms cubic-bezier(0.19, 1, 0.22, 1);
        -o-transition: opacity 190ms ease-out, transform 260ms 20ms cubic-bezier(0.19, 1, 0.22, 1);
      }
    }
  }
}

@media screen and (min-width: 600px) {
  .search-input {
    &__input-container {
      &__search-icon {
        left: 10px;
        width: 30px;
      }
      &__form {
        &-search {
          padding: 0 68px 0 68px;
          font-size: 1.32em;
        }
      }
    }
  }
}
</style>
