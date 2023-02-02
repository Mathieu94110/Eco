<script setup lang="ts">
import { inject, computed, reactive, onMounted, type Component } from "vue";
import { getUserAddById, updateUserAdd } from "@/api";
import Card from "@/components/Card/Card.vue";
import EditCard from "@/components/Card/EditCard.vue";
import { useRouter, useRoute } from "vue-router";
import Loading from "vue-loading-overlay";
import { useStore } from "vuex";
import type { UserAddInterface } from "@/shared/interfaces";

const sideBarClosed = inject("collapsed");
const router = useRouter();
const route = useRoute();
const store = useStore();
const toast: any = inject("toastMsg");

const state = reactive<{
  component: string;
  isEditMode: boolean;
  userAdd: UserAddInterface | {};
  loading: boolean;
  selection: number;
  isLoading: boolean;
  fullPage: boolean;
}>({
  component: "Card",
  isEditMode: false,
  userAdd: {},
  loading: false,
  selection: 1,
  isLoading: false,
  fullPage: true,
});

onMounted(async (): Promise<void> => {
  try {
    state.isLoading = true;
    const userAddId = route.params.id as string;
    const data = await getUserAddById(userAddId);
    const response = await data.json();
    state.userAdd = response;
    state.isLoading = false;
  } catch (error) {
    console.log(error);
  }
});

const goBack = (): void => {
  router.back();
};

const switchActive = (): void => {
  state.isEditMode = !state.isEditMode;
};
const updateUserCard = async (card: UserAddInterface): Promise<void> => {
  try {
    await updateUserAdd(card);
    toast("L'annonce a été mise à jour !", "success");
  } catch (err) {
    toast("Aucun changement détecté !", "warning");
    console.log(err);
  }
};
const isActive = computed<Component>(() =>
  state.isEditMode === true ? EditCard : Card
);
const isMobile = computed<boolean>(() => store?.state.windowWidth < 575);
</script>

<template>
  <div class="add-details" :style="{
    marginLeft: isMobile ? 'auto' : sideBarClosed ? '75px' : '270px',
  }">
    <loading v-model:active="state.isLoading" :can-cancel="true" :is-full-page="state.fullPage" />
    <div class="add-details__header">
      <button class="btn btn-primary" type="button" @click="goBack()">
        Retour
      </button>

      <button type="button" class="btn btn-primary" @click="switchActive()">
        Modifier
      </button>
    </div>

    <component :is="isActive" :add="state.userAdd" :isEditMode="state.isEditMode" @updateCard="updateUserCard" />
  </div>
</template>

<style lang="scss">
.add-details {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__header {
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
