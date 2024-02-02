<template>
  <div className="favorites">
    <div className="favorites__content">
      <Title :title="{ primary: 'Tous', secondary: 'vos favoris' }" />
      <template v-if="favorites?.length">
        <GameList :games="favorites" />
      </template>
      <template v-else>
        <div class="favorites__content__empty-list">
          <h2 class="favorites__content__empty-list-title">Vous n'avez pas enregistré de favoris</h2>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import Title from "@/components/Title/Title.vue";
import GameList from "@/components/GameList/GameList.vue";

const store = useStore();
const favorites = computed<any[]>(() => store.getters.getFavorites);
</script>

<style scoped lang="scss">
.favorites {
  background-color: rgb(7, 5, 27);
  min-height: 100vh;
  padding: 60px 0;
  &__content {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1.6rem;
    &__empty-list {
      display: flex;
      justify-content: center;
      &-title {
        color: #fff;
      }
    }
  }
}
</style>
