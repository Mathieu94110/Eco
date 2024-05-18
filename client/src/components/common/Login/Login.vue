<script setup lang="ts">
import { reactive, computed, watch, type Component } from "vue";
import { useStore } from "vuex";
import SignIn from "./SignIn.vue";
import SignUp from "./SignUp.vue";

const state = reactive<{
  mode: string;
}>({
  mode: "login",
});
const store = useStore();
const switchComponent = (value: string) => {
  state.mode = value;
};

const authStatus = computed<string>(() => store.getters.authStatus);
const isActive = computed<Component>(() => (state.mode === "login" ? SignIn : SignUp));

 

watch(authStatus, (newVal) => {
  if (newVal.startsWith("error")) {
    const clearAuthStatus = function () {
      store.commit("setStatus", "");
    };
    setTimeout(clearAuthStatus, 2000);
  }
});
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
