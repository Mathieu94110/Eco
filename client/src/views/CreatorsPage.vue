<template>
  <div class="creators-page">
    <div class="creators-page__content container">
      <Title class="creators-page__title" :title="{ primary: 'Nos', secondary: 'createurs' }" />

      <template v-if="status === 'loading'">
        <Loader class="creators-page__loader" />
      </template>

      <template v-else-if="creators?.length">
        <CreatorList :creators="creators" class="creators-page__list" />
        <Pagination class="creators-page__pagination" @page-handler="pageHandler" :nextPage="nextPage"
          :prevPage="prevPage" :currentPage="page" />
      </template>

      <template v-else>
        <h2 class="creators-page__no-data">Aucun créateur trouvé</h2>
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
  }
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

  &__title {
    margin-bottom: 2rem;
  }

  &__loader {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
  }

  &__list {
    margin-top: 1.5rem;
  }

  &__pagination {
    margin-top: 2rem;
  }

  &__no-data {
    text-align: center;
    color: #fff;
    margin-top: 3rem;
  }
}
</style>
