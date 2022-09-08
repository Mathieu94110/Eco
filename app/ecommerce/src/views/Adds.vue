<template>
  <Toolbar>Liste des annonces</Toolbar>
  <loading
    v-model:active="state.isLoading"
    :can-cancel="true"
    :is-full-page="state.fullPage"
  />
  <div
    class="adds"
    v-if="state.adds"
    :style="{ marginLeft: sideBarClosed ? '125px' : '320px' }"
  >
    <Pagination
      v-if="state.adds"
      :totalRecords="state.adds.length"
      :perPageOptions="perPageOptions"
      @input="setData($event)"
    />
    <div class="adds__cards">
      <AddCard
        v-for="add in computedAddsData"
        :key="add.id"
        :add="add"
        @add-item="addToFavorites(add)"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, computed } from "vue";
import AddCard from "@/components/Adds/AddCard/AddCard";
import Toolbar from "@/components/Toolbar/Toolbar";
import Pagination from "@/components/Pagination/Pagination";
import { useStore } from "vuex";
import { getFakeAdds } from "../api/adds";
import "vue-loading-overlay/dist/vue-loading.css";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { inject } from "vue";
const perPageOptions = [20, 50, 100];
const state = reactive({
  adds: null,
  noResult: false,
  message: "",
  isLoading: false,
  fullPage: true,
  perPageOptions,
  pagination: { page: 1, perPage: perPageOptions[0] },
});

onMounted(() => {
  loadFakeAdds();
});

const store = useStore();

const toast = inject("toastMsg");
const sideBarClosed = inject("collapsed");

async function loadFakeAdds() {
  try {
    state.isLoading = true;
    const { data } = await getFakeAdds();
    if (data.products) {
      state.adds = data.products;
      state.isLoading = false;
    } else {
      state.noResult = true;
      state.message = "Aucunes annonces trouvées !";
    }
  } catch (error) {
    state.noResult = true;
    state.message = "Erreur lors du chargement des annonces";
  }
}

function setData(data) {
  state.pagination = data;
}

function addToFavorites(add) {
  store.dispatch("sendFavorite", add).then(() => {
    toast("L'annonce a été ajoutée à vos favoris !", "success");
  });
}

const computedAddsData = computed(() => {
  if (!state.adds) return [];
  else {
    const firstIndex = (state.pagination.page - 1) * state.pagination.perPage;
    const lastIndex = state.pagination.page * state.pagination.perPage;
    return state.adds.slice(firstIndex, lastIndex);
  }
});
</script>

<style lang="scss" scoped>
.adds {
  display: block;
  width: 100%;
  height: 100%;
  &__cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
