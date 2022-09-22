<template>
  <Toolbar>Mes favoris</Toolbar>

  <div
    class="favorites"
    :style="{
      marginLeft: isMobile ? 'auto' : sideBarClosed ? '115px' : '300px',
    }"
  >
    <FavoriteCard
      v-for="add in state.favorites"
      :key="add.id"
      :add="add"
      @send-favorite="sendFavoriteDetails($event)"
      @delete-add="deleteAdd($event)"
      :toggle="state.isModalOpen"
    />
  </div>
</template>

<script setup>
import { getFavorites } from "@/api/adds";
import Toolbar from "@/components/Toolbar/Toolbar.vue";
import FavoriteCard from "@/components/Card/FavoriteCard";
import { deleteFavorite } from "@/api/adds";
import { reactive, onMounted, computed, inject } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const state = reactive({
  favorites: [],
  isModalOpen: false,
  isLoading: false,
});
const sideBarClosed = inject("collapsed");
const toast = inject("toastMsg");
const screenWidth = inject("screenWidth");

const store = useStore();
const router = useRouter();

onMounted(() => {
  getUserFavorites();
  console.log("on fav=", screenWidth);
});

const isMobile = computed(() => {
  return store.state.windowWidth < 575;
});

const getUserFavorites = async () => {
  try {
    state.isLoading = true;
    const { data } = await getFavorites();
    if (data.posts) {
      //In waiting to recover filtered data by user on back-end side, comming soon !
      state.favorites = data.posts.filter(
        (post) => post.author === store.state.user.userId
      );
      state.isLoading = false;
    }
  } catch (error) {
    console.log(error);
  }
};
const sendFavoriteDetails = (add) => {
  store
    .dispatch("sendFavoriteDetails", {
      favorite: add,
    })
    .then(() => {
      router.push({
        name: "FavoritesDetails",
        params: { add: add.title },
      });
    });
};
const deleteAdd = (add) => {
  const index = add._id;
  deleteFavorite(index);
  toast("L'annonce a bien été supprimée !", "success");
  state.isModalOpen = false;
  state.favorites = state.favorites.filter(
    (favorite) => favorite._id !== index
  );
};
</script>

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
}
</style>
