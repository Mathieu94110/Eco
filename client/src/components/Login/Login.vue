<script setup lang="ts">
import { reactive, computed, type Component } from "vue";
import { useStore } from "vuex";
import SignIn from "./SignIn.vue";
import SignUp from "./SignUp.vue";

const state = reactive<{
  mode: string;
}>({
  mode: "login",
});
const store = useStore();
const authStatus = computed<string>(() => store.getters.authStatus);
const isActive = computed<Component>(() => (state.mode === "login" ? SignIn : SignUp));

const switchComponent = (value: string) => {
  state.mode = value;
};
</script>

<template>
  <div class="login-container">
    <component :is="isActive" @switch="switchComponent" :status="authStatus" />
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("@/assets/images/login-background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
