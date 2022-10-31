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
      :style="{
        paddingLeft: isMobile ? 'auto' : sideBarClosed ? '150px' : '345px',
      }"
    >
      <div class="adds__wrapper">
        <Calc
          :open="isMobile && state.open"
          @close="state.open = false"
          :transparent="true"
        />
        <div class="adds__filter">
          <!--On elow adding open/close transition on mobile, for large screen it's always true -->
          <Transition>
            <AddCardFilter
              v-if="state.open"
              :filters="state.filters"
              :add="filteredAdds"
              @update-filter="updateFilter"
            />
          </Transition>
        </div>
        <div class="d-flex flex-column">
          <button
            class="adds__search-button btn btn-primary"
            @click="state.open = !state.open"
          >
            <i class="fa-solid fa-magnifying-glass mr-10"></i>
            <span>Rechercher</span>
          </button>

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
  </div>
</template>

<script setup>
import { onMounted, reactive, computed } from "vue";
import AddCard from "@/components/Adds/AddCard/AddCard";
import Toolbar from "@/components/Toolbar/Toolbar";
import AddCardFilter from "@/components/Adds/AddCard/AddCardFilter";
import Calc from "@/components/Calc/Calc";
import { useStore } from "vuex";
import { getFakeAdds } from "../api/adds";
import "vue-loading-overlay/dist/vue-loading.css";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { inject } from "vue";

const state = reactive({
  adds: null,
  noResult: false,
  message: "",
  isLoading: false,
  fullPage: true,
  filters: {
    search: "",
    priceRange: [0, 9999],
    category: "Tout",
  },
  open: !matchMedia("(max-width: 575px)").matches,
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
  const userFavorite = { ...add, author: currentUser.value };
  store.dispatch("sendFavorite", userFavorite).then(() => {
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
const currentUser = computed(() => {
  return store?.state.user.userId;
});
const isMobile = computed(() => {
  return store?.state.windowWidth < 575;
});
</script>

<style lang="scss" scoped>
@use "../assets/scss/mixins";

.adds {
  height: 100%;
  &__wrapper {
    display: flex;
    height: calc(100vh - 60px);
  }
  &__filter {
    @include mixins.xs {
      position: absolute;
      top: 0px;
      left: 0px;
      background-color: var(--primary-color);
      z-index: 2;
    }
  }
  &__search-button {
    margin: 20px 20px 0px 20px;
    @include mixins.sm {
      display: none;
    }
  }
  &__cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    overflow-y: auto;
  }
}

.v-enter-from,
.v-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.2s;
}
</style>
