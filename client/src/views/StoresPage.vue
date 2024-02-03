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
import Title from "@/components/common/Title/Title.vue";
import Loader from "@/components/common/Loader/Loader.vue";
import StoreList from "@/components/store/StoreList/StoreList.vue";

const store = useStore();
const status = computed<string>(() => store?.getters.getStatus);
const stores = computed(() => store.state.stores.results);

onMounted(() => {
  store.dispatch("fetchStores");
});
</script>

<style scoped lang="scss">
.stores-page {
  background-color: rgb(7, 5, 27);
  min-height: 100vh;
  padding-top: 65px;
  &__content {
  }
}
</style>
