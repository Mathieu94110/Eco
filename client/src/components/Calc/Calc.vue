<script setup lang="ts">
import { defineProps } from "vue";

defineProps(["open", "transparent"]);

const emit = defineEmits<{
  (e: "close"): void;
}>();
</script>

<template>
  <Teleport v-if="open" to="body">
    <div
      @click="emit('close')"
      @keydown="emit('close')"
      class="calc"
      :class="{ transparent }"
    ></div>
  </Teleport>
</template>

<style lang="scss" scoped>
.calc {
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100%;
  background-color: #0000005e;
  z-index: 2;
}
.transparent {
  background-color: transparent;
}
</style>
