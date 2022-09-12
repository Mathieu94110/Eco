<template>
  <div class="adds">
    <Toolbar>Liste des annonces</Toolbar>
    <loading
      v-model:active="state.isLoading"
      :can-cancel="true"
      :is-full-page="state.fullPage"
    />
    <div
      v-if="state.adds"
      :style="{ paddingLeft: sideBarClosed ? '150px' : '345px' }"
    >
      <div class="adds__wrapper">
        <div>
          <AddCardFilter
            :filters="state.filters"
            :add="filteredAdds"
            @update-filter="updateFilter"
            style="height: 100%; width: 200px"
          />
        </div>

        <div class="adds__cards">
          <AddCard
            v-for="add in filteredAdds"
            :key="add.id"
            :add="add"
            @add-item="addToFavorites(add)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, computed } from "vue";
import AddCard from "@/components/Adds/AddCard/AddCard";
import Toolbar from "@/components/Toolbar/Toolbar";
import AddCardFilter from "@/components/Adds/AddCard/AddCardFilter";
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
  filters: {
    search: "",
    priceRange: [0, 9999],
    category: "Tout",
  },
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

function addToFavorites(add) {
  store.dispatch("sendFavorite", add).then(() => {
    toast("L'annonce a été ajoutée à vos favoris !", "success");
  });
}

function updateFilter(filterUpdate) {
  if (filterUpdate.search !== undefined) {
    state.filters.search = filterUpdate.search;
  } else if (filterUpdate.priceRange) {
    state.filters.priceRange = filterUpdate.priceRange;
  } else if (filterUpdate.category) {
    state.filters.category = filterUpdate.category;
  } else {
    state.filters = { search: "", priceRange: [0, 9999], category: "Tout" };
  }
}

const filteredAdds = computed(() => {
  return state.adds.filter((add) => {
    if (
      add.title
        .toLocaleLowerCase()
        .startsWith(state.filters.search.toLocaleLowerCase()) &&
      add.price >= state.filters.priceRange[0] &&
      add.price <= state.filters.priceRange[1] &&
      (add.category === state.filters.category ||
        state.filters.category === "Tout")
    ) {
      return true;
    } else {
      return false;
    }
  });
});
</script>

<style lang="scss" scoped>
.adds {
  height: 100vh;
  &__wrapper {
    display: flex;
    height: calc(100vh - 60px);
  }
  &__cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    overflow-y: auto;
  }
}
</style>
