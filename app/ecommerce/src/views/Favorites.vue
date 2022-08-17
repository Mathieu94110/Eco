<template>
  <Toolbar>Mes favoris</Toolbar>
  <div class="favorites">
    <FavoriteCard v-for="add in favorites" :key="add.id" :add="add" />
  </div>
</template>

<script>
import { getFavorites } from "@/api/adds";
import Toolbar from "../components/Toolbar/Toolbar.vue";
import FavoriteCard from "@/components/Card/FavoriteCard";

export default {
  name: "Favorites",
  components: { Toolbar, FavoriteCard },
  data() {
    return {
      favorites: [],
    };
  },
  methods: {
    async getUserFavorites() {
      try {
        this.isLoading = true;
        const { data } = await getFavorites();
        console.log(data);
        if (data.posts) {
          this.favorites = data.posts;
          this.isLoading = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getUserFavorites();
  },
};
</script>

<style lang="scss" scoped>
.favorites {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
