<template>
  <div
    class="add-details"
    :style="{
      marginLeft: isMobile ? 'auto' : sideBarClosed ? '75px' : '270px',
    }"
  >
    <loading
      v-model:active="state.isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />
    <div
      class="add-details__header"
      :style="!currentState && { 'margin-bottom': '60px' }"
    >
      <button class="btn btn-primary" type="button" @click="goBack()">
        Retour
      </button>

      <button
        type="button"
        class="btn btn-primary"
        :key="component"
        @click="switchActive()"
      >
        Modifier
      </button>
    </div>

    <component
      :is="isActive"
      :add="state.userAdd"
      :currentState="state.currentState"
      @updateCard="updateUserCard"
    />
  </div>
</template>

<script setup>
import { inject, computed, reactive, onMounted } from "vue";
import { getPostId } from "@/api/adds";
import Card from "@/components/Card/Card";
import EditCard from "@/components/Card/EditCard";
import { updateAdds } from "@/api/adds";
import { useRouter, useRoute } from "vue-router";
import Loading from "vue-loading-overlay";
import { useStore } from "vuex";

const sideBarClosed = inject("collapsed");
const router = useRouter();
const route = useRoute();
const store = useStore();
const toast = inject("toastMsg");

const state = reactive({
  component: "Card",
  currentState: false,
  userAdd: undefined,
  loading: false,
  selection: 1,
  isLoading: false,
});

onMounted(async () => {
  try {
    state.isLoading = true;
    const response = await getPostId(route.params.id);
    state.userAdd = response.data;
    state.isLoading = false;
  } catch (error) {
    console.log(error);
  }
});

const goBack = () => {
  router.back();
};

const switchActive = () => {
  state.currentState = !state.currentState;
};
const updateUserCard = async (card) => {
  try {
    await updateAdds(card);
    toast("L'annonce a été mise à jour !", "success");
  } catch (err) {
    toast("Aucun changement détecté !", "warning");
    console.log(err);
  }
};
const isActive = computed(() => {
  return state.currentState === true ? EditCard : Card;
});
const isMobile = computed(() => {
  return store.state.windowWidth < 575;
});
</script>

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
