<script setup lang="ts">
import { inject, computed, reactive, onMounted, type Component } from "vue";
import { getUserAddById, updateUserAdd } from "@/api";
import Card from "@/components/Card/CardComponent.vue";
import EditCard from "@/components/Card/EditCardComponent.vue";
import { useRouter, useRoute } from "vue-router";
import Loading from "vue-loading-overlay";
import { useStore } from "vuex";
import type { UserAddInterface } from "@/shared/interfaces";

const sideBarClosed = inject<boolean>("collapsed");
const router = useRouter();
const route = useRoute();
const store = useStore();
const toast = inject("toastMsg") as (x: string, y: string) => void;

const state = reactive<{
  component: string;
  isEditMode: boolean;
  userAdd?: UserAddInterface;
  loading: boolean;
  selection: number;
  isLoading: boolean;
  fullPage: boolean;
}>({
  component: "Card",
  isEditMode: false,
  userAdd: undefined,
  loading: false,
  selection: 1,
  isLoading: false,
  fullPage: true,
});

onMounted(async (): Promise<void> => {
  try {
    state.isLoading = true;
    const userAddId = route.params.id as string;
    const response = await getUserAddById(userAddId);
    state.userAdd = response;
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
const checkValues = (card: UserAddInterface): void => {
  const currentCardValue = state.userAdd;
  JSON.stringify(card) === JSON.stringify(currentCardValue) ? toast("Aucun changement détecté !", "warning") : updateUserCard(card);
};

const updateUserCard = async (card: UserAddInterface): Promise<void> => {
  try {
    await updateUserAdd(card);
    toast("L'annonce a été mise à jour !", "success");
    state.userAdd = card;
    switchActive();
  } catch (err) {
    toast("Érreur lors de la modification de l'annonce !", "warning");
  }
};

const isActive = computed<Component>(() => (state.isEditMode === true ? EditCard : Card));
const isMobile = computed<boolean>(() => store?.state.windowWidth < 575);
</script>

<template>
  <div
    class="user-add-details"
    :style="{
      marginLeft: isMobile ? 'auto' : sideBarClosed ? '75px' : '270px',
    }"
  >
    <loading :active="state.isLoading" :can-cancel="true" :is-full-page="state.fullPage" />
    <div class="user-add-details__header-buttons">
      <button class="btn btn-primary" type="button" @click="goBack()">Retour</button>

      <button type="button" class="btn btn-primary" @click="switchActive()">Modifier</button>
    </div>

    <component :is="isActive" :add="state.userAdd" @check-values="checkValues" />
  </div>
</template>

<style lang="scss">
.user-add-details {
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
