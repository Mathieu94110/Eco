<template>
  <component :is="isActive" @switch="switchComponent" v-bind="$attrs" />
</template>

<script setup>
import { reactive, computed } from "vue";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const state = reactive({
  mode: "login",
});

const isActive = computed(() => {
  return state.mode === "login" ? SignIn : SignUp;
});

const switchComponent = (value) => {
  state.mode = value;
};
</script>
<style></style>
