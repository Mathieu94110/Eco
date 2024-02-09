<template>
  <div className="creators-page">
    <div className="creators-page__content">
      <Title :title="{ primary: 'Nos', secondary: 'createurs' }" />
      <template v-if="status === 'loading'">
        <Loader />
      </template>
      <template v-else-if="creators?.length">
        <CreatorList :creators="creators" />
        <Pagination @page-handler="pageHandler" :nextPage="nextPage" :prevPage="prevPage" :currentPage="page" />
      </template>
      <template v-else>
        <h2 class="no-data-found">Aucun créateur trouvé</h2>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref, watch } from "vue";
import Loader from "@/components/common/Loader.vue";
import Title from "@/components/common/Title.vue";
import { CreatorList } from "@/components/creator";
import Pagination from "@/components/common/BasicPagination.vue";
import { useStore } from "vuex";

const store = useStore();

const status = computed<string>(() => store?.getters.getStatus);
const creators = computed(() => store.state.creators.results);
const page = ref(1);
const prevPage = computed(() => store.state.creators.previous);
const nextPage = computed(() => store.state.creators.next);
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
  store.dispatch("fetchCreators", page.value);
});
watch(
  () => page.value,
  () => {
    store.dispatch("fetchCreators", page.value);
  },
);
</script>

<style scoped lang="scss">
.creators-page {
  background-color: var(--dark-1);
  min-height: 100vh;
  padding: 60px 0;
  &__content {
    margin: 10px;
  }
}
</style>
