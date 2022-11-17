<template>
  <component :is="isActive" @switch="switchComponent" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import SignIn from './SignIn.vue';
import SignUp from './SignUp.vue';

const state = reactive({
  mode: 'login',
});

const isActive = computed(() => (state.mode === 'login' ? SignIn : SignUp));

const switchComponent = (value) => {
  state.mode = value;
};
</script>
<style></style>
