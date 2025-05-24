<template>
  <div class="game-details-page">
    <div class="game-details-page__content">
      <div class="game-details-page__card">
        <button class="game-details-page__back-button btn btn-primary" @click="goBack">
          <font-awesome-icon :icon="['fa-solid', 'fa-arrow-left']" />
        </button>

        <template v-if="status === 'loading'">
          <Loader class="game-details-page__loader" />
        </template>

        <template v-else>
          <GameDetails :gameData="singleGameData" class="game-details-page__details" />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { GameDetails } from "@/components/game";
import Loader from "@/components/common/Loader.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();

const status = computed<string>(() => store?.getters.getStatus);
const singleGameData = computed(() => store.getters.getGameDetails);

function goBack() {
  router.go(-1);
}

watchEffect(() => {
  if (route.params.gameId) {
    store.dispatch("fetchGameDetails", Number(route.params.gameId));
  }
});
</script>

<style scoped lang="scss">
@use '../assets//scss/mixins' as m;

.game-details-page {
  &__content {
    min-height: 100vh;
    padding: 65px 10px;
    background-image: url("@/assets/images/game-details-background.jpg");
    background-size: cover;
    background-repeat: no-repeat;
  }

  &__card {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1rem;

    @include m.sm {
      padding: 0 1.6rem;
    }
  }

  &__back-button {
    margin-bottom: 1rem;
  }

  &__loader {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
  }

  &__details {
    margin-top: 2rem;
  }
}
</style>
