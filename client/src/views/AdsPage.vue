<script setup lang="ts">
import { onMounted, reactive, computed, inject } from "vue";
import { useStore } from "vuex";
import AdCard from "@/components/AdCard/AdCard.vue";
import Toolbar from "@/components/Toolbar/Toolbar.vue";
import AdCardFilter from "@/components/AdCard/AdCardFilter.vue";
import Calc from "@/components/Calc/Calc.vue";
import { getFakeAds, getFavorites, addToFavorites, removeFromFavorites } from "@/api";
import type { FakeAdInterface, FilterUpdate, ToastInterface } from "@/shared/interfaces";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const state = reactive<{
  ads: FakeAdInterface[];
  favorites: FakeAdInterface[];
  noResult: boolean;
  message: string;
  isLoading: boolean;
  fullPage: boolean;
  filters: FilterUpdate;
  open: boolean;
}>({
  ads: [],
  favorites: [],
  noResult: false,
  message: "",
  isLoading: true,
  fullPage: true,
  filters: {
    search: "",
    priceRange: [0, 9999],
    category: "all",
  },
  open: !matchMedia("(max-width: 575px)").matches,
});

const store = useStore();
const toast = inject<ToastInterface>("toastMsg")!;
const sideBarClosed = inject<boolean>("collapsed");
const userId = store?.state.user._id;
const isMobile = computed<boolean>(() => store?.state.windowWidth < 575);

async function loadFakeAds(): Promise<void> {
  try {
    const fakeAds = await getFakeAds();
    if (fakeAds) {
      state.ads = fakeAds;
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
const getUserFavorites = async (): Promise<void> => {
  try {
    const response = await getFavorites(userId);
    if (response) {
      state.favorites = response;
    }
  } catch (error) {
    console.log(error);
  }
};

const toggleOnFavorites = async (ad: FakeAdInterface): Promise<void> => {
  const AdIsOnFavorite = state.favorites.some((favorite: FakeAdInterface) => favorite.id === ad.id);
  if (AdIsOnFavorite) {
    const variables = {
      id: ad.id,
      userFrom: userId,
    };
    await removeFromFavorites(variables);
    toast("L'annonce a été retirée de vos favoris !", "success");
    state.favorites = state.favorites.filter((favorite) => favorite.id !== ad.id);
  } else {
    const userFavorite = { ...ad, userFrom: userId };
    try {
      await addToFavorites(userFavorite);
      toast("L'annonce a été ajoutée à vos favoris !", "success");
      state.favorites = [...state.favorites, { ...ad }];
    } catch (e) {
      console.error(e);
    }
  }
};

const updateFilter = (filterUpdate: FilterUpdate): void => {
  if (filterUpdate.search !== undefined) {
    state.filters.search = filterUpdate.search;
  } else if (filterUpdate.priceRange) {
    state.filters.priceRange = filterUpdate.priceRange;
  } else if (filterUpdate.category) {
    state.filters.category = filterUpdate.category;
  } else {
    state.filters = { search: "", priceRange: [0, 9999], category: "all" };
  }
};

const filteredAds = computed(
  () =>
    state.ads &&
    state.ads.filter((ad) => {
      if (
        ad.title.toLocaleLowerCase().startsWith(state.filters.search!.toLocaleLowerCase()) &&
        ad.price >= state.filters.priceRange[0] &&
        ad.price <= state.filters.priceRange[1] &&
        (ad.category === state.filters.category || state.filters.category === "all")
      ) {
        return true;
      }
      return false;
    }),
);

onMounted(async () => {
  await loadFakeAds();
  await getUserFavorites();
});
</script>

<template>
  <div class="ads">
    <Toolbar>Liste des annonces</Toolbar>
    <loading v-model:active="state.isLoading" :can-cancel="true" :is-full-page="state.fullPage" />
    <div
      v-if="state.ads"
      :style="{
        paddingLeft: isMobile ? 'auto' : sideBarClosed ? '150px' : '345px',
      }"
    >
      <div class="ads__wrapper">
        <Calc :open="isMobile && state.open" @close="state.open = false" :transparent="true" />
        <div class="ads__filter">
          <!--On below adding open/close transition on mobile, for large screen it's always true -->
          <Transition>
            <AdCardFilter v-if="state.open" :filters="state.filters" :ads="filteredAds" @update-filter="updateFilter" />
          </Transition>
        </div>
        <div class="d-flex flex-column">
          <button class="ads__search-button btn btn-primary" @click="state.open = !state.open">
            <i class="fa-solid fa-magnifying-glass mr-10"></i>
            <span>Rechercher</span>
          </button>

          <div class="ads__cards">
            <AdCard
              v-for="ad in filteredAds"
              :key="ad.id"
              :ad="ad"
              :favorites="state.favorites"
              @add-item="toggleOnFavorites(ad)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/mixins";

.ads {
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
