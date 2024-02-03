<template>
  <div class="home-page">
    <Banner />
    <section class="home-page__popular">
      <div class="container">
        <Title :title="{ primary: 'Jeux', secondary: 'les plus populaires' }" />
      </div>
      <template v-if="status === 'loading'">
        <Loader />
      </template>
      <template v-else-if="status !== 'loading' && games.results?.length">
        <GameList :sliceValue="9" :games="games.results" />
        <div class="home-page__popular__link">
          <router-link to="/games" class="home-page__popular__link-content btn-play-now btn-primary">
            Voir plus de jeux
          </router-link>
        </div>
      </template>
      <template v-else>
        <h4>Aucun jeu trouvé !</h4>
      </template>
    </section>
    <Carousel />
    <section class="home-page__genres">
      <div class="container">
        <Title :title="{ primary: 'Top', secondary: 'genres' }" />
      </div>
      <template v-if="status === 'loading'">
        <Loader />
      </template>
      <template v-else-if="status !== 'loading' && genres.results?.length">
        <GenreList :sliceValue="9" :data="genres.results" />
      </template>
      <template v-else>
        <h4>Aucun genre trouvé !</h4>
      </template>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, computed } from "vue";
import Banner from "@/components/common/Banner.vue";
import Title from "@/components/common/Title.vue";
import Loader from "@/components/common/Loader.vue";
import { GameList } from "@/components/game";
import Carousel from "@/components/common/Carousel.vue";
import { GenreList } from "@/components/genre";
import { useStore } from "vuex";

const store = useStore();

onMounted(() => {
  store.dispatch("fetchGames");
  store.dispatch("fetchGenres");
});

const status = computed<string>(() => store?.getters.getStatus);
const games = computed(() => store.state.games);
const genres = computed(() => store.state.genres);
const state = reactive<{
  popular: object;
}>({
  popular: {
    primary: "jeux",
    secondary: "les plus populaires",
  },
});
</script>

<style scoped lang="scss">
.home-page {
  background: #6d6d6d;
  &__popular {
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
