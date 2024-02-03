<script setup lang="ts">
import { reactive, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import type { FakeAdInterface } from "@/types/interfaces";
import UserAdCard from "@/components/UserAdCard/UserAdCard.vue";

const router = useRouter();
const store = useStore();
const state = reactive<{
  favoriteInfos: FakeAdInterface | null;
}>({
  favoriteInfos: null,
});

const favoriteDetails = computed<FakeAdInterface>(() => store.getters.getFavoriteDetails);

const goBack = (): void => {
  router.back();
};

onMounted(() => {
  if (favoriteDetails.value) {
    state.favoriteInfos = favoriteDetails.value;
  }
});
</script>

<template>
  <div class="favorites-details">
    <div class="favorites-details__header">
      <button class="btn btn-primary" @click="goBack()">Retour</button>
    </div>
    <div class="ads" v-if="state.favoriteInfos">
      <UserAdCard :ad="state.favoriteInfos" />
    </div>
  </div>
</template>

<style lang="scss">
@use "../assets/scss/mixins" as m;
.favorites-details {
  width: 100%;
  padding: 0 80px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @include m.xs {
    padding: 0 10px;
    align-items: start;
  }
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
    @include m.xs {
      width: 60%;
      padding: 0 10px;
      height: 64px;
    }
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
