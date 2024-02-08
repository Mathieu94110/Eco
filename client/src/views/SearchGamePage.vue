<template>
  <!-- <main> -->
  <div class="container">
    <Title :title="{ primary: 'Rechercher', secondary: 'un jeu' }" />
    <h2>Tapper dans la barre de recherche !</h2>
    <h3 style="color: white">isFocused: {{ isFocused }}</h3>
    <h3 style="color: white">isSearchIcon: {{ isSearchIcon }}</h3>
    <div>
      <div class="search-box" :class="{ 'border-searching': isFocused }">
        <div class="search-icon"><i class="fa fa-search search-icon" :class="{ 'si-rotate': isFocused }"></i></div>
        <form action="" class="search-form">
          <input
            type="text"
            placeholder="Rechercher"
            id="search"
            autocomplete="off"
            ref="searchInput"
            @focus="handleFocus"
            @blur="handleBlur"
            @keyup="keyUpInput"
          />
        </form>
        <svg
          class="search-border"
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
        <div class="go-icon" :class="{ 'go-in': isSearchIcon }"><i class="fa fa-arrow-right"></i></div>
      </div>
    </div>
  </div>
  <!-- </main> -->
</template>

<script setup lang="ts">
import Title from "@/components/common/Title.vue";
import { onMounted, reactive, ref } from "vue";
import type { Ref } from "vue";
import { nextTick, computed, watch } from "vue";

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

const keyUpInput = (e) => {
  if (e.target.value.length > 0) {
    console.log("de la valeur");
    displaySearchIcon.value = true;
  } else {
    console.log("pas de valeur");
    displaySearchIcon.value = false;
  }
};
</script>

<style scoped>
*,
*:before,
*:after {
  -webkit-tap-highlight-color: transparent;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  user-select: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  padding: 0;
  margin: 0;
}
a,
a:visited,
a:hover {
  color: inherit;
  text-decoration: none;
}

h1 {
  display: block;
  margin: 0 auto 25px auto;
  text-align: center;
  font-size: 1.92em;
  font-weight: 600;
  letter-spacing: -0.055em;
}
h2 {
  display: block;
  margin: 0 auto 60px auto;
  text-align: center;
  font-weight: 400;
  font-size: 1.25em;
  letter-spacing: -0.015em;
}

.search-box {
  position: relative;
  width: 100%;
  max-width: 360px;
  height: 60px;
  border-radius: 120px;
  margin: 0 auto;
}
.search-icon,
.go-icon {
  position: absolute;
  top: 0;
  height: 60px;
  width: 86px;
  line-height: 61px;
  text-align: center;
}
.search-icon {
  left: 0;
  pointer-events: none;
  font-size: 1.22em;
  will-change: transform;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform-origin: center center;
  -webkit-transform-origin: center center;
  -moz-transform-origin: center center;
  -o-transform-origin: center center;
  transition: transform 400ms 220ms cubic-bezier(0.19, 1, 0.22, 1);
  -webkit-transition: transform 400ms 220ms cubic-bezier(0.19, 1, 0.22, 1);
  -moz-transition: transform 400ms 220ms cubic-bezier(0.19, 1, 0.22, 1);
  -o-transition: transform 400ms 220ms cubic-bezier(0.19, 1, 0.22, 1);
}
.si-rotate {
  transform: rotate(0deg);
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
}
.go-icon {
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
}
.go-in {
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
.search-border {
  display: block;
  width: 100%;
  max-width: 360px;
  height: 60px;
}
.border {
  fill: none;
  stroke: #ffffff;
  stroke-width: 5;
  stroke-miterlimit: 10;
}
.border {
  stroke-dasharray: 740;
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 400ms cubic-bezier(0.6, 0.04, 0.735, 0.99);
  -webkit-transition: stroke-dashoffset 400ms cubic-bezier(0.6, 0.04, 0.735, 0.99);
  -moz-transition: stroke-dashoffset 400ms cubic-bezier(0.6, 0.04, 0.735, 0.99);
  -o-transition: stroke-dashoffset 400ms cubic-bezier(0.6, 0.04, 0.735, 0.99);
}
.border-searching .border {
  stroke-dasharray: 740;
  stroke-dashoffset: 459;
  transition: stroke-dashoffset 650ms cubic-bezier(0.755, 0.15, 0.205, 1);
  -webkit-transition: stroke-dashoffset 650ms cubic-bezier(0.755, 0.15, 0.205, 1);
  -moz-transition: stroke-dashoffset 650ms cubic-bezier(0.755, 0.15, 0.205, 1);
  -o-transition: stroke-dashoffset 650ms cubic-bezier(0.755, 0.15, 0.205, 1);
}
#search {
  font-family: "Montserrat Alternates", sans-serif;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 120px;
  border: none;
  background: rgba(255, 255, 255, 0);
  padding: 0 68px 0 68px;
  color: #ffffff;
  font-size: 1.32em;
  font-weight: 400;
  letter-spacing: -0.015em;
  outline: none;
}
#search::-webkit-input-placeholder {
  color: #ffffff;
}
#search::-moz-placeholder {
  color: #ffffff;
}
#search:-ms-input-placeholder {
  color: #ffffff;
}
#search:-moz-placeholder {
  color: #ffffff;
}
#search::-moz-selection {
  color: #ffffff;
  background: rgba(0, 0, 0, 0.25);
}
#search::selection {
  color: #ffffff;
  background: rgba(0, 0, 0, 0.25);
}
</style>
