<template>
  <Toolbar>Mes favoris</Toolbar>

  <div
    class="favorites"
    :style="{ marginLeft: sideBarClosed ? '115px' : '300px' }"
  >
    <FavoriteCard
      v-for="add in favorites"
      :key="add.id"
      :add="add"
      @send-favorite="sendFavoriteDetails($event)"
      @delete-add="deleteAdd($event)"
      :toggle="isModalOpen"
    />
  </div>
</template>

<script>
import { getFavorites } from "@/api/adds";
import Toolbar from "@/components/Toolbar/Toolbar.vue";
import FavoriteCard from "@/components/Card/FavoriteCard";
import { deleteFavorite } from "@/api/adds";

export default {
  name: "Favorites",
  components: { Toolbar, FavoriteCard },
  data() {
    return {
      favorites: [],
      isModalOpen: null,
      sideBarClosed: this.$collapsed,
    };
  },
  methods: {
    async getUserFavorites() {
      try {
        this.isLoading = true;
        const { data } = await getFavorites();
        if (data.posts) {
          this.favorites = data.posts;
          this.isLoading = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    sendFavoriteDetails(add) {
      this.$store
        .dispatch("sendFavoriteDetails", {
          favorite: add,
        })
        .then(() => {
          this.$router.push({
            name: "FavoritesDetails",
            params: { add: add.title },
          });
        });
    },
    deleteAdd(add) {
      const index = add._id;
      deleteFavorite(index);
      this.$toastMsg("L'annonce a bien été supprimée !", "success");
      this.isModalOpen = false;
      this.favorites = this.favorites.filter(
        (favorite) => favorite._id !== index
      );
    },
  },
  mounted() {
    this.getUserFavorites();
  },
  watch: {
    favorites: {
      handler(newValue) {
        this.favorites = newValue;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.favorites {
  height: calc(100% - 60px);
  padding: 20px 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
</style>
