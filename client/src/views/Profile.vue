<script setup lang="ts">
import UserProfileCard from "@/components/User/UserProfileCard.vue";
import Toolbar from "@/components/Toolbar/Toolbar.vue";
import { reactive, onMounted, inject, computed } from "vue";
import { useStore } from "vuex";
import { getProfile, updateUserInfos } from "@/api";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import type { UserInterface } from "@/shared/interfaces";

const sideBarClosed = inject("collapsed");

const state = reactive<{
  user: UserInterface | null;
  isLoading: boolean;
  fullPage: boolean;
}>({
  user: null,
  isLoading: true,
  fullPage: true,
});

const toast: any = inject("toastMsg");
const store = useStore();
const userId = store?.state.user.userId;

const isMobile = computed<boolean>(() => store?.state.windowWidth < 575);

const getUserProfile = async (): Promise<void> => {
  try {
    const response = await getProfile(userId);
    const jsonResponse = await response.json()
    state.user = jsonResponse.result;
    state.isLoading = false;
  } catch (e) {
    console.error(e);
  }
};

const UpdateInfos = async (data: UserInterface): Promise<void> => {
  try {
    await updateUserInfos(data);
    toast("Vos informations ont bien été mises à jour !", "success");
  } catch (e: any) {
    console.error(e);
    toast(`${e.message} !`, "error");
  }
};

onMounted(async (): Promise<void> => {
  await getUserProfile();
});
</script>

<template>
  <div class="profile">
    <Toolbar>Mon profil</Toolbar>
    <loading v-model:active="state.isLoading" :can-cancel="true" :is-full-page="state.fullPage" />
    <div :style="{
      marginLeft: isMobile ? '0px' : sideBarClosed ? '115px' : '300px',
    }" class="profile__card">
      <UserProfileCard :userInfos="state.user" @update-user="UpdateInfos"></UserProfileCard>
    </div>
  </div>
</template>

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
