<script setup lang="ts">
import { reactive, onMounted, computed, inject } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Toolbar from "@/components/Toolbar/Toolbar.vue";
import FavoriteCard from "@/components/Card/FavoriteCard.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import addsApi from "../api/adds";
import type { FakeAddInterface } from "@/shared/interfaces";

const state = reactive<{
  favorites: FakeAddInterface[];
  isLoading: boolean;
  fullPage: boolean;
}>({
  favorites: [],
  isLoading: false,
  fullPage: true,
});

const sideBarClosed = inject("collapsed");
const toast: any = inject("toastMsg");

const store = useStore();
const router = useRouter();

const isMobile = computed<boolean>(() => store?.state.windowWidth < 575);
const userId = store?.state.user.userId;
const variable: { userFrom: string } = {
  userFrom: userId
};

const getUserFavorites = async (): Promise<void> => {
  try {
    state.isLoading = true;
    const { data } = await addsApi.getFavorites(variable);
    if (data.posts) {
      state.favorites = data.posts;
      state.isLoading = false;
    }
  } catch (error) {
    console.log(error);
  }
};
const sendFavoriteDetails = async (add: FakeAddInterface): Promise<void> => {
  try {
    await store.dispatch("sendFavoriteDetails", {
      favorite: add,
    });
    router.push({
      name: "FavoritesDetails",
      params: { add: add.title },
    });
  } catch (e) {
    console.error(e);
  }
};
const deleteAdd = async (add: FakeAddInterface): Promise<void> => {
  try {
    if (add.id) {
      const variables = {
        id: add.id,
        userFrom: userId
      };
      const response = await addsApi.removeFromFavorites(variables);
      console.log(response);

      if (response.data.success) {
        toast("L'annonce a bien été supprimée !", "success");
        state.favorites = state.favorites.filter(
          (favorite) => favorite._id !== add._id
        );
      } else {
        alert('Failed to Remove From Favorite');
      }
    }
  } catch (e: unknown) {
    console.error(e);
  }
};

onMounted(async () => {
  await getUserFavorites();
});
</script>

<template>
  <Toolbar>Mes favoris</Toolbar>
  <loading v-model:active="state.isLoading" :can-cancel="true" :is-full-page="state.fullPage" />
  <div v-if="state.favorites.length > 0" :style="{
    marginLeft: isMobile ? 'auto' : sideBarClosed ? '115px' : '300px',
  }">
    <TransitionGroup name="list" tag="ul" class="favorites">
      <FavoriteCard v-for="add in state.favorites" :key="add.id" :add="add" @send-favorite="sendFavoriteDetails($event)"
        @delete="deleteAdd($event)" />
    </TransitionGroup>
  </div>
  <div v-else class="favorites__empty-wrapper center">
    <div class="p-20">
      <h2>Vous n'avez pas ajouté de favoris</h2>
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
