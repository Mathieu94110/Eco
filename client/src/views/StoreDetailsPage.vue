<template>
  <div class="store-details-page">
    <div class="container">
      <button class="btn btn-primary" @click="goBack"><i class="fa-solid fa-arrow-left"></i></button>
      <template v-if="storesResults === 'loading'">
        <Loader />
      </template>
      <template v-else>
        <StoreDetails :storeData="storeDetails" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import Loader from "@/components/common/Loader.vue";
import { StoreDetails } from "@/components/store";
import { useRoute, useRouter } from "vue-router";
import type { StoreDetailsType } from "@/types";

const store = useStore();
const route = useRoute();
const router = useRouter();
const storeDetails = computed<StoreDetailsType>(() => store.state.storeDetails);
const storesResults = computed<''|'loading'>(() => store.state.status);

function goBack(): void {
  router.go(-1);
}
onMounted(() => {
  store.dispatch("fetchStoreDetails", Number(route.params.storeId));
});
watchEffect(async () => {
  if (route.params.storeId) {
    store.dispatch("fetchStoreDetails", Number(route.params.storeId));
  }
});
</script>

<style scoped lang="scss">
.store-details-page {
  background: #6d6d6d;
  min-height: 100vh;
  padding-top: 65px;
  padding-bottom: 65px;
}
</style>
