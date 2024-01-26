<template>
  <div class="homepage">
    <Banner />
    <section class="home-page__popular">
      <div class="home-page__popular-title">
        <Title :title="{ primary: 'Jeux', secondary: 'les plus populaires' }" />
      </div>

      <template v-if="state.gamesStatus === 'STATUS.LOADING'">
        <Loader />
      </template>

      <template v-else-if="state.games?.length > 0">
        <GameList :sliceValue="9" :games="state.games" />
        <div class="home-page__popular__link">
          <router-link to="/games" class="home-page__popular__link-content"> Voir plus de jeux </router-link>
        </div>
      </template>
      <template v-else>
        <h4>Aucun jeu trouvé !</h4>
      </template>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Banner from "@/components/Banner/Banner.vue";
import Title from "@/components/Title/Title.vue";
import Loader from "@/components/Loader/Loader.vue";
import GameList from "@/components/GameList/GameList.vue";

const state = reactive<{
  popular: object;
  gamesStatus: string;
  games: array;
}>({
  popular: {
    primary: "jeux",
    secondary: "les plus populaires",
  },
  gamesStatus: "",
  games: [
    {
      background_image: "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg",
      name: "Grand Theft Auto V",
      rating: 4.5,
      ratings_count: 6706,
      released: "2013-09-17",
      updated: "2024-01-26T00:43:03",
      id: 1,
    },
    {
      background_image: "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg",
      name: "Grand Theft Auto V",
      rating: 5,
      ratings_count: 6706,
      released: "2013-09-17",
      updated: "2024-01-26T00:43:03",
      id: 2,
    },
    {
      background_image: "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg",
      name: "Grand Theft Auto V",
      rating: 4.3,
      ratings_count: 6706,
      released: "2013-09-17",
      updated: "2024-01-26T00:43:03",
      id: 3,
    },
    {
      background_image: "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg",
      name: "Grand Theft Auto V",
      rating: 1.2,
      ratings_count: 6706,
      released: "2013-09-17",
      updated: "2024-01-26T00:43:03",
      id: 4,
    },
    {
      background_image: "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg",
      name: "Grand Theft Auto V",
      rating: 0,
      ratings_count: 6706,
      released: "2013-09-17",
      updated: "2024-01-26T00:43:03",
      id: 5,
    },
    {
      background_image: "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg",
      name: "Grand Theft Auto V",
      rating: 0.5,
      ratings_count: 6706,
      released: "2013-09-17",
      updated: "2024-01-26T00:43:03",
      id: 6,
    },
  ],
});
</script>

<style scoped lang="scss">
.homepage {
  background: #6d6d6d;
  &__popular {
    &-title {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 1.6rem;
    }
    &__link {
      display: flex;
      justify-content: center;
      &-content {
        margin-top: 60px;
      }
    }
  }
}
</style>
