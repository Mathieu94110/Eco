<template>
  <div class="stores-page">
    <div class="stores-page__content">
      <Title :title="{ primary: 'Tous', secondary: 'les stores' }" />

      <Loader v-if="status === 'loading'" class="stores-page__loader" />

      <StoreList v-else-if="storesResults.length" :stores="storesResults" class="stores-page__list" />

      <h2 v-else class="stores-page__no-data">Aucun store trouvé</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import Title from "@/components/common/Title.vue";
import Loader from "@/components/common/Loader.vue";
import { StoreList } from "@/components/store";
import type { storeResultsType } from "@/types";

const store = useStore();
const status = computed<string>(() => store?.getters.getStatus);
const storesResults = computed<storeResultsType[]>(() => store.state.stores.results);

onMounted(() => {
  store.dispatch("fetchStores");
});
</script>

<style scoped lang="scss">
.stores-page {
  background-color: var(--dark-1);
  min-height: 100vh;
  padding-top: 65px;
}
</style>
