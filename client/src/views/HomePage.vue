<template>
  <div class="home-page">
    <Banner />

    <section class="home-page__popular">
      <div class="home-page__container">
        <Title :title="{ primary: 'Jeux', secondary: 'les plus populaires' }" />
      </div>

      <template v-if="status === 'loading'">
        <Loader class="home-page__loader" />
      </template>

      <template v-else-if="status !== 'loading' && !games.results?.length">
        <h4 class="home-page__no-data">Aucun jeu trouvé !</h4>
      </template>

      <template v-else>
        <GameList :sliceValue="9" :games="games.results" class="home-page__game-list" />

        <div class="home-page__popular-link">
          <router-link to="/games" class="home-page__popular-link-content btn-play-now btn-primary">
            Voir plus de jeux
          </router-link>
        </div>
      </template>
    </section>

    <Carousel />

    <section class="home-page__genres">
      <div class="home-page__container">
        <Title :title="{ primary: 'Top', secondary: 'genres' }" />
      </div>

      <template v-if="status === 'loading'">
        <Loader class="home-page__loader" />
      </template>

      <template v-else-if="status !== 'loading' && genres.results?.length">
        <GenreList :sliceValue="9" :genresList="genres.results" class="home-page__genre-list" />
      </template>

      <template v-else>
        <h4 class="home-page__no-data">Aucun genre trouvé !</h4>
      </template>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import Banner from "@/components/common/Banner.vue";
import Title from "@/components/common/Title.vue";
import Loader from "@/components/common/Loader.vue";
import { GameList } from "@/components/game";
import Carousel from "@/components/common/Carousel.vue";
import { GenreList } from "@/components/genre";
import { useStore } from "vuex";
import type { genresInterface, gamesInterface } from "@/types";

const store = useStore();

onMounted(() => {
  store.dispatch("fetchGamesAndGenres");
});

const status = computed<string>(() => store?.getters.getStatus);
const games = computed<gamesInterface>(() => store.state.games);
const genres = computed<genresInterface>(() => store.state.genres);
</script>

<style scoped lang="scss">
.home-page {
  background: #6d6d6d;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
  }

  &__loader {
    margin: 2rem 0;
    display: flex;
    justify-content: center;
  }

  &__no-data {
    text-align: center;
    font-size: 1.25rem;
    color: #fff;
    margin-top: 2rem;
  }

  &__popular {
    padding: 2rem 0;

    &-link {
      display: flex;
      justify-content: center;

      &-content {
        margin-top: 60px;
      }
    }
  }

  &__game-list {
    margin-top: 2rem;
  }

  &__genres {
    padding: 2rem 0;
  }

  &__genre-list {
    margin-top: 2rem;
  }
}
</style>
