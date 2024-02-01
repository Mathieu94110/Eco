<template>
  <div className="creators-page">
    <div className="container">
      <Title :title="{ primary: 'Nos', secondary: 'createurs' }" />
      <template v-if="status === 'loading'">
        <Loader />
      </template>
      <template v-else-if="creators?.length">
        <CreatorList :creators="creators" />
      </template>
      <template v-else>
        <h2>Aucun créateur trouvé</h2>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import Loader from "@/components/Loader/Loader.vue";
import Title from "@/components/Title/Title.vue";
import CreatorList from "@/components/CreatorList/CreatorList.vue";
import { useStore } from "vuex";

const store = useStore();

const status = computed<string>(() => store?.getters.getStatus);
const creators = computed(() => store.state.creators.results);

onMounted(() => {
  store.dispatch("fetchCreators");
});
</script>

<style scoped lang="scss">
.creators-page {
  background-color: rgb(7, 5, 27);
  min-height: 100vh;
  padding: 60px 0;
}
</style>
