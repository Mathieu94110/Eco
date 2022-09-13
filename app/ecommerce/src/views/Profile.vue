<template>
  <div class="profile">
    <Toolbar>Mon profil</Toolbar>
    <div
      :style="{ marginLeft: sideBarClosed ? '115px' : '300px' }"
      class="profile__card"
    >
      <UserProfile :userInfos="state.user"></UserProfile>
    </div>
  </div>
</template>

<script setup>
import UserProfile from "@/components/User/UserProfile";
import Toolbar from "@/components/Toolbar/Toolbar";
import userApi from "@/api/user";
import { reactive, onMounted, inject } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const sideBarClosed = inject("collapsed");

const state = reactive({
  user: null,
});

const store = useStore();
const router = useRouter();

onMounted(async () => {
  if (store.state.user.userId == -1) {
    router.push("/");
    return;
  }
  const response = await userApi.getProfile(store.state.user.userId);
  state.user = response.data.result;
});
</script>

<style lang="scss" scoped>
.profile {
  width: 100%;
  height: 100vh;
  &__card {
    height: calc(100vh - 60px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
