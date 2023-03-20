<script setup lang="ts">
import { onMounted, reactive, computed, inject } from "vue";
import { useStore } from "vuex";
import AdCard from "@/components/AdCard/AdCard.vue";
import AdCardFilter from "@/components/AdCard/AdCardFilter.vue";
import Calc from "@/components/Calc/Calc.vue";
import { getFakeAds, addToFavorites, removeFromFavorites } from "@/api";
import type { FakeAdInterface, FilterUpdate, ToastInterface } from "@/shared/interfaces";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import { useRouter } from "vue-router";

const state = reactive<{
  ads: FakeAdInterface[];
  noResult: boolean;
  message: string;
  isLoading: boolean;
  fullPage: boolean;
  filters: FilterUpdate;
  open: boolean;
}>({
  ads: [],
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
const router = useRouter();
const toast = inject<ToastInterface>("toastMsg")!;
const userId = store?.state.user._id;
const isMobile = computed<boolean>(() => store?.state.windowWidth < 575);
const favorites = computed<FakeAdInterface[]>(() => store?.getters.getFavorites);

async function loadFakeAds(): Promise<void> {
  try {
    const fakeAds = await getFakeAds();
    if (fakeAds) {
      state.ads = fakeAds;
    } else {
      state.noResult = true;
      state.message = "Aucunes annonces trouvées !";
    }
  } catch (error) {
    state.noResult = true;
    state.message = "Erreur lors du chargement des annonces";
  }
  state.isLoading = false;
}

const toggleOnFavorites = async (ad: FakeAdInterface): Promise<void> => {
  const AdIsOnFavorite = favorites.value.some((favorite: FakeAdInterface) => favorite.id === ad.id);
  if (AdIsOnFavorite) {
    const variables = {
      id: ad.id,
      userFrom: userId,
    };
    const oldFavorites = store?.state.currentFavorites;
    await removeFromFavorites(variables);

    const newFavorites = oldFavorites.filter((favorite: FakeAdInterface) => favorite.id !== ad.id);
    await store.dispatch("userFavorites", newFavorites);
    toast("L'annonce a été retirée de vos favoris !", "success");
  } else {
    const userFavorite = { ...ad, userFrom: userId };
    try {
      await addToFavorites(userFavorite);
      await store.dispatch("userFavorites", [...favorites.value, { ...ad }]);
      toast("L'annonce a été ajoutée à vos favoris !", "success");
    } catch (e) {
      console.error(e);
    }
  }
};

const updateFilter = (filterUpdate: Partial<FilterUpdate>): void => {
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

const sendAdDetails = async (ad: FakeAdInterface): Promise<void> => {
  try {
    await store.dispatch("sendAdDetails", {
      ad: ad,
    });
    router.push({
      name: "Détails de l'annonce",
      params: { ad: ad.title },
    });
  } catch (e) {
    console.error(e);
  }
};

onMounted(async () => {
  await loadFakeAds();
});
</script>

<template>
  <div class="ads">
    <loading v-model:active="state.isLoading" :can-cancel="true" :is-full-page="state.fullPage" />
    <div v-if="state.ads.length">
      <div class="ads__wrapper">
        <Calc :open="isMobile && state.open" @close="state.open = false" :transparent="true" />
        <div class="ads__filter">
          <!--On below adding open/close transition on mobile, for large screen it's always true -->
          <Transition>
            <AdCardFilter v-if="state.open" :filters="state.filters" :ads="filteredAds" @update-filter="updateFilter" />
          </Transition>
        </div>
        <div class="d-flex flex-column full-width">
          <button class="ads__search-button btn btn-primary" @click="state.open = !state.open">
            <i class="fa-solid fa-magnifying-glass mr-10"></i>
            <span>Rechercher</span>
          </button>
          <div class="ads__list-container" v-if="filteredAds.length">
            <div class="ads__list">
              <AdCard
                v-for="ad in filteredAds"
                :key="ad.id"
                :ad="ad"
                :favorites="favorites"
                @send-ad="sendAdDetails($event)"
                @add-item="toggleOnFavorites(ad)"
              />
            </div>
          </div>
          <div v-else class="ads__no-results">
            <h2>Aucune annonce ne correspond aux critères</h2>
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
      background-color: var(--primary-color);
      position: fixed;
      z-index: 3;
    }
  }

  &__search-button {
    margin: 20px 20px 0px 20px;

    @include mixins.sm {
      display: none;
    }
  }

  &__list-container {
    margin: 50px 0;
    @include mixins.md {
      margin: 75px 0;
    }
  }
  &__list {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    padding: 0;
    margin: 0;
    @include mixins.md {
      gap: 20px;
    }
    @include mixins.xs-md {
      justify-content: space-around;
    }
  }
  &__no-results {
    height: calc(100vh - 60px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 20px;
    @include mixins.xs {
      h2 {
        font-size: 16px;
      }
    }
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
