<template>
  <div class="games-page">
    <div class="games-page__container container">
      <Title :title="{ primary: 'Tous', secondary: 'les jeux' }" />

      <template v-if="status === 'loading' && !games.results?.length">
        <Loader class="games-page__loader" />
      </template>

      <template v-else-if="!games.results?.length && status !== 'loading'">
        <h2 class="games-page__no-data">Aucun jeu trouvé</h2>
      </template>

      <template v-else>
        <GameList :games="games.results" />
        <Pagination @page-handler="pageHandler" :nextPage="nextPage" :prevPage="prevPage" :currentPage="page" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref, watch } from "vue";
import { useStore } from "vuex";
import Title from "@/components/common/Title.vue";
import Loader from "@/components/common/Loader.vue";
import { GameList } from "@/components/game";
import Pagination from "@/components/common/BasicPagination.vue";
import type { gamesInterface } from "@/types";

const store = useStore();
const status = computed<string>(() => store.getters.getStatus);
const games = computed<gamesInterface>(() => store.state.games);

const page = ref<number>(1);
const prevPage = computed(() => store.state.games.previous);
const nextPage = computed(() => store.state.games.next);

const pageIndex = computed({
  get: () => page.value,
  set: (val) => (page.value = val),
});

function pageHandler(pageValue: number): void {
  pageIndex.value = pageValue;
}

onMounted(() => {
  store.dispatch("fetchGames", page.value);
});

watch(() => page.value, () => {
  store.dispatch("fetchGames", page.value);
});
</script>

<style scoped lang="scss">
.games-page {
  background-color: var(--dark-1);
  min-height: 100vh;
  padding: 60px 0;

  &__container {
    max-width: 1280px;
    margin: 0 auto;
  }

  &__loader {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }

  &__no-data {
    text-align: center;
    color: #fff;
    margin-top: 2rem;
  }
}
</style>
