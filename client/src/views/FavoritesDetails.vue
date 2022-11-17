<template>
  <div class="favorites-details">
    <div class="favorites-details__header">
      <input
        class="go-back-btn"
        type="button"
        @click="goBack()"
        value="Retour"
      />
    </div>
    <div class="adds" v-if="state.favoriteInfos">
      <AddCard :add="state.favoriteInfos" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AddCard from "@/components/Adds/AddCard/AddCard.vue";
import { reactive, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import type { AddInterface } from "@/shared/interfaces";

const router = useRouter();
const store = useStore();
const state = reactive<{
  favoriteInfos: AddInterface | null;
}>({
  favoriteInfos: null,
});

const favoriteDetails = computed<AddInterface>(
  () => store.getters.getFavoriteDetails
);

const goBack = () => {
  router.back();
};

onMounted(() => {
  if (favoriteDetails.value) {
    state.favoriteInfos = favoriteDetails.value;
  }
});
</script>

<style lang="scss">
.favorites-details {
  width: 100%;
  padding: 0 80px;
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

    input {
      background-image: linear-gradient(#42a1ec, #0070c9);
      border: 1px solid var(----primary-2);
      border-radius: 4px;
      color: var(--primary-color);
      cursor: pointer;
      font-size: 17px;
      font-weight: 400;
      letter-spacing: -0.022em;
      min-width: 30px;
      padding: 4px 15px;
      height: 40px;
      text-align: center;
      &:hover {
        background-image: linear-gradient(#51a9ee, #147bcd);
        border-color: var(----primary-2);
        text-decoration: none;
      }
    }
  }
}
</style>
