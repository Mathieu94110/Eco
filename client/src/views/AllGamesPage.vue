<template>
  <div className="all-games">
    <div className="container">
      <Title :title="{ primary: 'Tous', secondary: 'les jeux' }" />
      <template v-if="status === 'loading'">
        <Loader />
      </template>
      <template v-else-if="games.results?.length">
        <GameList :games="games.results" />
        <Pagination @page-handler="pageHandler" :nextPage="nextPage" :prevPage="prevPage" :currentPage="page" />
      </template>
      <template v-else>
        <h2>Aucun jeu trouvé</h2>
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

const store = useStore();

const status = computed<string>(() => store.getters.getStatus);
const games = computed(() => store.state.games);
const page = ref(1);
const prevPage = computed(() => store.state.games.previous);
const nextPage = computed(() => store.state.games.next);
const pageIndex = computed({
  get: () => page.value,
  set: (val) => {
    page.value = val;
  },
});
function pageHandler(pageValue: number) {
  pageIndex.value = pageValue;
}

onMounted(() => {
  store.dispatch("fetchGames", page.value);
});

watch(
  () => page.value,
  () => {
    store.dispatch("fetchGames", page.value);
  },
);
</script>

<style scoped lang="scss">
.all-games {
  background-color: rgb(7, 5, 27);
  min-height: 100vh;
  padding: 60px 0;
}
</style>
