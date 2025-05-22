<template>
  <div class="game-details-page">
    <div class="game-details-page__content">
      <div class="game-details-page__content-card">
        <button class="btn btn-primary" @click="goBack">
          <font-awesome-icon :icon="['fa-solid', 'fa-arrow-left']" />
        </button>
        <template v-if="status === 'loading'">
          <Loader />
        </template>
        <template v-else>
          <GameDetails :gameData="singleGameData" />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, watchEffect } from "vue";
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
watchEffect(async () => {
  if (route.params.gameId) {
    store.dispatch("fetchGameDetails", Number(route.params.gameId));
  }
});
</script>

<style scoped lang="scss">
.game-details-page {
  &__content {
    min-height: 100vh;
    padding: 65px 10px;
    background-image: url("@/assets/images/game-details-background.jpg");
    background: cover;
    background-size: cover;
    background-repeat: no-repeat;

    &-card {
      max-width: 1280px;
      margin: 0 auto;
    }
  }
}

@media screen and (min-width: 600px) {
  .game-details-page {
    &__content {
      &-card {
        padding: 0 1.6rem;
      }
    }
  }
}
</style>
