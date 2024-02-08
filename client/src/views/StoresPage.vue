<template>
  <div class="stores-page">
    <div className="stores-page__content">
      <Title :title="{ primary: 'Tous', secondary: 'les stores' }" />
      <template v-if="status === 'loading'">
        <Loader />
      </template>
      <template v-else-if="stores?.length">
        <StoreList :stores="stores" />
      </template>

      <template v-else>
        <h2>Aucun store trouvé</h2>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import Title from "@/components/common/Title.vue";
import Loader from "@/components/common/Loader.vue";
import { StoreList } from "@/components/store";
import { storeResultsType } from "@/types";

const store = useStore();
const status = computed<string>(() => store?.getters.getStatus);
const stores = computed<storeResultsType>(() => store.state.stores.results);

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
