<script setup lang="ts">
import { reactive, onMounted, inject } from "vue";
import { useStore } from "vuex";
import UserProfileCard from "@/components/User/UserProfileCard.vue";
import { getProfile, updateUserInfos } from "@/api";
import type { ToastInterface, UserInterface } from "@/types";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const store = useStore();
const state = reactive<{
  user: UserInterface;
  isLoading: boolean;
  fullPage: boolean;
}>({
  user: store?.state.user,
  isLoading: true,
  fullPage: true,
});

const toast = inject<ToastInterface>("toastMsg")!;
const userId = store?.state.user._id;

const getUserProfile = async (): Promise<void> => {
  try {
    const response = await getProfile(userId);
    const jsonResponse = await response.json();
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
  } catch {
    toast("Erreur !", "error");
  }
};

onMounted(async (): Promise<void> => {
  await getUserProfile();
});
</script>

<template>
  <div class="user-profile">
    <loading v-model:active="state.isLoading" :can-cancel="true" :is-full-page="state.fullPage"
      class="user-profile__loader" />
    <div class="user-profile__card-wrapper">
      <UserProfileCard :user-infos="state.user" @update-user="UpdateInfos" class="user-profile__card" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-profile {
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__card-wrapper {
    width: 100%;
    max-width: 800px;
    padding: 1rem;
  }

  &__card {
    width: 100%;
  }
}
</style>
