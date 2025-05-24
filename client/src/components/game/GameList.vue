<template>
  <div class="game-list container">
    <GameItem v-for="item in slicedGames" :key="item.id" :gameItem="item" :isOnFavorites="isFavorite(item.id)"
      :favorites="favorites" @toggle-favorite="() => toggleFavorite(item)" />
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import { useStore } from "vuex";
import GameItem from "@/components/game/GameItem.vue";
import toast from "@/mixins/toast";
import type { FavoriteItemType, GameDetails } from "@/types";

// Props
const props = defineProps<{
  games: GameDetails[];
  sliceValue?: number;
}>();

// Store
const store = useStore();
const favorites = computed<FavoriteItemType[]>(() => store.getters.getFavorites ?? []);

// Computed sliced games
const slicedGames = computed(() =>
  props.games.slice(0, props.sliceValue ?? 9)
);

// Check if a game is in favorites
const isFavorite = (gameId: number) =>
  favorites.value.some((fav) => fav.id === gameId);

// Toggle favorite
const toggleFavorite = (item: GameDetails) => {
  const action = isFavorite(item.id) ? "removeFavorite" : "addFavorite";
  const message = isFavorite(item.id)
    ? `${item.name} a été retiré de vos favoris !`
    : `${item.name} a été ajouté à vos favoris !`;

  store.dispatch(action, item);
  toast(message, "success");
};
</script>

<style scoped lang="scss">
@use '../../assets/scss/mixins' as m;

.game-list {
  padding: 20px;
  display: grid;
  gap: 40px;

  @include m.md {
    grid-template-columns: repeat(2, 1fr);
    align-items: stretch;
  }

  @include m.xl {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
