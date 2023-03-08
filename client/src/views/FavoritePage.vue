<script setup lang="ts">
import { reactive, onMounted, computed, inject } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Toolbar from "@/components/Toolbar/Toolbar.vue";
import FavoriteCard from "@/components/Card/FavoriteCard.vue";
import { getFavorites, removeFromFavorites } from "@/api";
import type { FakeAdInterface, ToastInterface } from "@/shared/interfaces";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const state = reactive<{
  favorites: FakeAdInterface[];
  isLoading: boolean;
  fullPage: boolean;
}>({
  favorites: [],
  isLoading: true,
  fullPage: true,
});

const sideBarClosed = inject<boolean>("collapsed");
const toast = inject<ToastInterface>("toastMsg")!;

const store = useStore();
const router = useRouter();
const isMobile = computed<boolean>(() => store?.state.windowWidth < 575);
const userId = store?.state.user.userId;

const getUserFavorites = async (): Promise<void> => {
  try {
    const response = (await getFavorites(userId)) as FakeAdInterface[];
    state.favorites = response;
    state.isLoading = false;
  } catch (error) {
    console.log(error);
  }
};

const sendFavoriteDetails = async (ad: FakeAdInterface): Promise<void> => {
  try {
    await store.dispatch("sendFavoriteDetails", {
      favorite: ad,
    });
    router.push({
      name: "FavoritesDetails",
      params: { ad: ad.title },
    });
  } catch (e) {
    console.error(e);
  }
};
const deleteFavorite = async (ad: FakeAdInterface): Promise<void> => {
  try {
    const variables = {
      id: ad.id,
      userFrom: userId,
    };
    await removeFromFavorites(variables);
    toast("L'annonce a bien été retirée de vos favoris !", "success");
    state.favorites = state.favorites.filter((favorite) => favorite._id !== ad._id);
  } catch {
    toast("Erreur lors du retrait de l'annonce de vos favoris!", "error");
  }
};

onMounted(async () => {
  await getUserFavorites();
});
</script>

<template>
  <div>
    <Toolbar>Mes favoris</Toolbar>
    <loading v-model:active="state.isLoading" :can-cancel="true" :is-full-page="state.fullPage" />
    <div
      v-if="state.favorites.length > 0"
      :style="{
        marginLeft: isMobile ? 'auto' : sideBarClosed ? '115px' : '300px',
      }"
    >
      <TransitionGroup name="list" tag="ul" class="favorites">
        <FavoriteCard
          v-for="ad in state.favorites"
          :key="ad._id"
          :ad="ad"
          @send-favorite="sendFavoriteDetails($event)"
          @delete="deleteFavorite($event)"
        />
      </TransitionGroup>
    </div>
    <div v-else class="favorites__empty-wrapper center">
      <div class="p-20">
        <h2>Vous n'avez pas ajouté de favoris</h2>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/mixins";

.favorites {
  height: calc(100% - 60px);
  padding: 20px 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  @include mixins.xs {
    justify-content: center;
  }

  &__empty-wrapper {
    width: 100%;
    height: calc(100vh - 60px);

    @include mixins.xs {
      font-size: 0.7rem;
    }
  }
}

//Transition
.list-enter-active {
  animation: bounce-in 0.5s;
}

.list-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}
</style>
