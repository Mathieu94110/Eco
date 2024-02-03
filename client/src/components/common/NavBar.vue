<script setup lang="ts">
import { computed, reactive, onMounted } from "vue";
import TopBar from "@/components/common/TopBar.vue";
import SideBar from "@/components/common/SideBar.vue";

const state = reactive<{
  width: number;
}>({
  width: document.documentElement.clientWidth,
});

const getDimensions = (): void => {
  state.width = document.documentElement.clientWidth;
};
const isActive = computed(() => (state.width < 575 ? TopBar : SideBar));

onMounted(() => {
  window.addEventListener("resize", getDimensions);
});
</script>

<template>
  <component :is="isActive" />
</template>
