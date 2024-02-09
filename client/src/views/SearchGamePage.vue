<template>
  <div class="search-game-page">
    <Title :title="{ primary: 'Rechercher', secondary: 'un jeu' }" />
    <SearchInput v-model="search" @search-game="searchGames" />
    <template v-if="state.isSearchSubmit">
      <template v-if="status === 'loading'">
        <Loader />
      </template>
      <template v-else-if="(status = ' ' && searchedGames.results?.length)">
        <GameList :games="searchedGames.results" />
        <Pagination @page-handler="pageHandler" :nextPage="nextPage" :prevPage="prevPage" :currentPage="page" />
      </template>
      <template v-else>
        <h2 class="no-data-found">Aucun jeu trouvé</h2>
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
import { gamesInterface } from "@/types";

const state = reactive({
  isSearchSubmit: false,
});
const store = useStore();
const search = ref("");
const searchResults = [];
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
  },
);
</script>

<style scoped lang="scss">
.search-game-page {
  min-height: 600px;
  background-color: var(--dark-1);
}
</style>
