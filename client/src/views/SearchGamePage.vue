<template>
  <div class="search-game-page">
    <Title :title="{ primary: 'Rechercher', secondary: 'un jeu' }" class="search-game-page__title" />

    <SearchInput v-model="search" @search-game="searchGames" class="search-game-page__input" />

    <template v-if="state.isSearchSubmit">
      <template v-if="status === 'loading'">
        <Loader class="search-game-page__loader" />
      </template>

      <template v-else-if="status !== 'loading' && searchedGames.results?.length">
        <GameList :games="searchedGames.results" class="search-game-page__list" />
        <Pagination @page-handler="pageHandler" :nextPage="nextPage" :prevPage="prevPage" :currentPage="page"
          class="search-game-page__pagination" />
      </template>

      <template v-else>
        <h2 class="search-game-page__no-data">Aucun jeu trouvé</h2>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from "vue";
import { useStore } from "vuex";
import Title from "@/components/common/Title.vue";
import SearchInput from "@/components/SearchInput/SearchInput.vue";
import { GameList } from "@/components/game";
import Pagination from "@/components/common/BasicPagination.vue";
import { type gamesInterface } from "@/types";

const state = reactive({
  isSearchSubmit: false,
});
const store = useStore();
const search = ref("");
const status = computed<string>(() => store?.getters.getStatus);
const searchedGames = computed<gamesInterface[]>(() => store.state.searchedGames);

const searchGames = () => {
  store.dispatch("fetchSearchedGames", search.value);
  state.isSearchSubmit = true;
};

const page = ref<number>(1);
const pageIndex = computed<number>({
  get: () => page.value,
  set: (val) => {
    page.value = val;
  },
});

function pageHandler(pageValue: number): void {
  pageIndex.value = pageValue;
}

watch(
  () => page.value,
  () => {
    store.dispatch("fetchSearchedGames", page.value);
  }
);
</script>

<style scoped lang="scss">
.search-game-page {
  min-height: 600px;
  background-color: var(--dark-1);
  padding: 2rem;

  &__title {
    margin-bottom: 1rem;
  }

  &__input {
    margin-bottom: 2rem;
  }

  &__loader {
    margin: 2rem 0;
  }

  &__list {
    margin-bottom: 2rem;
  }

  &__pagination {
    display: flex;
    justify-content: center;
  }

  &__no-data {
    text-align: center;
    color: var(--gray-light);
    font-size: 1.25rem;
    margin-top: 2rem;
  }
}
</style>
