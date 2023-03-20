<script setup lang="ts">
import { inject, computed, reactive, onMounted, type Component } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import Card from "@/components/Card/Card.vue";
import EditCard from "@/components/Card/EditCard.vue";
import { getAdById, updateAd } from "@/api";
import type { UserAdInterface, ToastInterface } from "@/shared/interfaces";
import Loading from "vue-loading-overlay";

const router = useRouter();
const route = useRoute();
const store = useStore();
const toast = inject<ToastInterface>("toastMsg")!;

const state = reactive<{
  component: string;
  isEditMode: boolean;
  userAd?: Partial<UserAdInterface>;
  loading: boolean;
  selection: number;
  isLoading: boolean;
  fullPage: boolean;
}>({
  component: "Card",
  isEditMode: false,
  userAd: undefined,
  loading: true,
  selection: 1,
  isLoading: false,
  fullPage: true,
});

onMounted(async (): Promise<void> => {
  try {
    const userAdId = route.params.id as string;
    const response = await getAdById(userAdId);
    state.userAd = response;
    state.isLoading = false;
  } catch (error) {
    toast(`Échec de la récupération de l'annonce !`, "error");
  }
});

const goBack = (): void => {
  router.back();
};

const switchActive = (): void => {
  state.isEditMode = !state.isEditMode;
};

const updateUserCard = async (card: UserAdInterface): Promise<void> => {
  try {
    await updateAd(card);
    toast("L'annonce a été mise à jour !", "success");
    state.userAd = card;
    switchActive();
  } catch (err) {
    toast("Erreur lors de la modification de l'annonce !", "warning");
  }
};

const isActive = computed<Component>(() => (state.isEditMode === true ? EditCard : Card));
</script>

<template>
  <div class="user-ad-details">
    <loading :active="state.isLoading" :can-cancel="true" :is-full-page="state.fullPage" />
    <div class="user-ad-details__header-buttons">
      <button class="btn btn-primary" type="button" @click="goBack()">Retour</button>

      <button type="button" class="btn btn-primary" @click="switchActive()">Modifier</button>
    </div>

    <component :is="isActive" :ad="state.userAd" @update-card="updateUserCard" />
  </div>
</template>

<style lang="scss">
.user-ad-details {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__header-buttons {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    left: 0;
    top: 0;
    padding: 0 20px;
  }
}
</style>
