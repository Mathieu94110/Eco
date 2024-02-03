<template>
  <div class="store-details-page">
    <div class="container">
      <template v-if="status === 'loading'">
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
import Loader from "@/components/Loader/Loader.vue";
import StoreDetails from "@/components/StoreDetails/StoreDetails.vue";
import { useRoute, useRouter } from "vue-router";

const store = useStore();
const route = useRoute();
const storeDetails = computed(() => store.state.storeDetails);

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
