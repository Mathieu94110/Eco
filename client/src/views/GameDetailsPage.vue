<template>
  <div class="game-details-page">
    <div className="game-details-page__content">
      <div className="game-details-page__content-card">
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
import { useRoute } from "vue-router";
import GameDetails from "@/components/GameDetails/GameDetails.vue";
import Loader from "@/components/Loader/Loader.vue";

const store = useStore();
const route = useRoute();
const status = computed<string>(() => store?.getters.getStatus);
const singleGameData = computed(() => store.getters.getGameDetails);

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
    padding-top: 65px;
    padding-bottom: 65px;
    background-image: url("@/assets/images/game-details-background.jpg");
    background: cover;
    background-size: cover;
    background-repeat: no-repeat;
    &-card {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 1.6rem;
    }
  }
}
</style>
