<template>
  <div class="profile">
    <Toolbar>Mon profil</Toolbar>
    <div
      :style="{ marginLeft: sideBarClosed ? '115px' : '300px' }"
      class="profile__card"
    >
      <UserProfile
        :userInfos="state.user"
        @update-user="UpdateInfos"
      ></UserProfile>
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
import updateUserInfos from "@/api/user";

const sideBarClosed = inject("collapsed");

const state = reactive({
  user: null,
});
const toast = inject("toastMsg");
const store = useStore();
const userId = store.state.user.userId;
const router = useRouter();

onMounted(async () => {
  if (userId == -1) {
    router.push("/");
    return;
  }
  const response = await userApi.getProfile(userId);
  state.user = response.data.result;
});

async function UpdateInfos(data) {
  try {
    await updateUserInfos(userId, data);
    toast("Vos informations ont bien été mises à jour !", "success");
  } catch (err) {
    console.log(err);
  }
}
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
