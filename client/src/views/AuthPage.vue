<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import Login from "@/components/Login/Login.vue";

const store = useStore();
const status = computed<string>(() => store?.state.status);
</script>

<template>
  <div class="auth">
    <Login :status="status"></Login>
  </div>
</template>

<style lang="scss" scoped>
.auth {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
@media screen and (max-width: 768px) {
  .auth {
    height: 100vh;
  }
}
</style>
