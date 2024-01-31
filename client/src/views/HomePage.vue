<template>
  <div class="homepage">
    <Banner />
    <section class="home-page__popular">
      <div class="home-page__popular-title">
        <Title :title="{ primary: 'Jeux', secondary: 'les plus populaires' }" />
      </div>
      <template v-if="status === 'loading'">
        <Loader />
      </template>
      <template v-else-if="status !== 'loading' && games.results?.length">
        <GameList :sliceValue="9" :games="games.results" />
        <div class="home-page__popular__link">
          <router-link to="/games" class="home-page__popular__link-content"> Voir plus de jeux </router-link>
        </div>
      </template>
      <template v-else>
        <h4>Aucun jeu trouvé !</h4>
      </template>
    </section>
    <Carousel />
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, computed } from "vue";
import Banner from "@/components/Banner/Banner.vue";
import Title from "@/components/Title/Title.vue";
import Loader from "@/components/Loader/Loader.vue";
import GameList from "@/components/GameList/GameList.vue";
import Carousel from "@/components/Carousel/Carousel.vue";
import { useStore } from "vuex";

const store = useStore();

onMounted(() => {
  store.dispatch("fetchGames");
});

const status = computed<string>(() => store?.getters.getStatus);
const games = computed(() => store.state.games);
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
