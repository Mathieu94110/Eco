<template>
  <component :is="isActive" />
</template>

<script setup>
import { computed, reactive, onMounted } from 'vue';
import TopBar from './TopBar/TopBar.vue';
import SideBar from './SideBar/SideBar.vue';

const state = reactive({
  width: document.documentElement.clientWidth,
});

onMounted(() => {
  window.addEventListener('resize', getDimensions);
});

const getDimensions = () => {
  state.width = document.documentElement.clientWidth;
};
const isActive = computed(() => (state.width < 575 ? TopBar : SideBar));
</script>

<style lang="" scss scoped></style>
