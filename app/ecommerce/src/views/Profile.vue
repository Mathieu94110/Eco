<template>
  <div class="profile">
    <Toolbar>Mon profil</Toolbar>
    <div
      :style="{
        marginLeft:
          isMobileScreen < 575 ? '0px' : sideBarClosed ? '115px' : '300px',
      }"
      class="profile__card"
    >
      <UserProfileCard
        :userInfos="state.user"
        @update-user="UpdateInfos"
      ></UserProfileCard>
    </div>
  </div>
</template>

<script setup>
import UserProfileCard from "@/components/User/UserProfileCard";
import Toolbar from "@/components/Toolbar/Toolbar";
import userApi from "@/api/user";
import { reactive, onMounted, inject, computed } from "vue";
import { useStore } from "vuex";
import updateUserInfos from "@/api/user";

const sideBarClosed = inject("collapsed");

const state = reactive({
  user: null,
  windowWidth: window.innerHeight,
});
const toast = inject("toastMsg");
const store = useStore();
const userId = store.state.user.userId;

onMounted(async () => {
  const response = await userApi.getProfile(userId);
  state.user = response.data.result;
});

const isMobileScreen = computed(() => {
  return state.windowWidth < 575;
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
  height: 100%;
  &__card {
    height: calc(100% - 60px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
