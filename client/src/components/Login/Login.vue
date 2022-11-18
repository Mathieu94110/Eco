<template>
  <component :is="isActive" @switch="switchComponent" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { reactive, computed, type Component } from "vue";
import SignIn from "./SignIn.vue";
import SignUp from "./SignUp.vue";

const state = reactive<{
  mode: string;
}>({
  mode: "login",
});

const isActive = computed<Component>(() =>
  state.mode === "login" ? SignIn : SignUp
);

const switchComponent = (value: string) => {
  state.mode = value;
};
</script>
<style></style>
