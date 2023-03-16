<script setup lang="ts">
import { reactive, computed, inject } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Toolbar from "@/components/Toolbar/Toolbar.vue";
import FavoriteCard from "@/components/Card/FavoriteCard.vue";
import { removeFromFavorites } from "@/api";
import type { FakeAdInterface, ToastInterface } from "@/shared/interfaces";
import "vue-loading-overlay/dist/css/index.css";

const state = reactive<{
  fullPage: boolean;
}>({
  fullPage: true,
});

const sideBarClosed = inject<boolean>("collapsed");
const toast = inject<ToastInterface>("toastMsg")!;

const store = useStore();
const router = useRouter();
const isMobile = computed<boolean>(() => store?.state.windowWidth < 575);
const favorites = computed<FakeAdInterface[]>(() => store.getters.getFavorites);
const userId = store?.state.user._id;

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
    const oldFavorites = store.state.currentFavorites;
    await removeFromFavorites(variables);
    const newFavorites = oldFavorites.filter((favorite: FakeAdInterface) => favorite.id !== ad.id);
    await store.dispatch("userFavorites", newFavorites);
    toast("L'annonce a bien été retirée de vos favoris !", "success");
  } catch {
    toast("Erreur lors du retrait de l'annonce de vos favoris!", "error");
  }
};
</script>

<template>
  <div>
    <Toolbar>Mes favoris</Toolbar>
    <div
      v-if="favorites && favorites.length > 0"
      :style="{
        marginLeft: isMobile ? 'auto' : sideBarClosed ? '115px' : '300px',
      }"
    >
      <TransitionGroup name="list" tag="FavoriteCard" class="favorites">
        <FavoriteCard
          v-for="ad in favorites"
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
  padding: 20px 10px;
  display: flex;
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
