<template>
  <div class="game-list container">
    <template v-for="item in props.games.slice(0, slicedValue)" :key="item.id">
      <GameItem
        :gameItem="item"
        @toggle-favorite="toggleFavorite"
        :isOnFavorites="checkFavorite(item)"
        :favorites="favorites"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import { useStore } from "vuex";
import GameItem from "@/components/game/GameItem.vue"; 
import type { FavoriteItemType } from "@/types";
import toast from "@/mixins/toast";

const store = useStore();

const props = defineProps<{
  games: any; // lookat reason why Games type doesnt work here
  sliceValue?: number;
}>();

const slicedValue = computed(() => props.sliceValue ?? 9);
const favorites = computed<FavoriteItemType[]>(() => store.getters.getFavorites ?? []);

function checkFavorite(item: any) {
 return favorites.value.some((fav) => fav.id === item.id); 
}

function toggleFavorite(item: FavoriteItemType) {
  if (checkFavorite(item)) {
    store.dispatch("removeFavorite", item);
    toast(`${item.name} a été retiré de vos favoris !`, "success");
  } else {
    store.dispatch("addFavorite", item);
    toast(`${item.name} a été ajouté à vos favoris !`, "success");
  }
} 
</script>

<style lang="scss" scoped>
.game-list {
  padding: 20px;
  display: grid;
  gap: 40px;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    align-items: stretch;
  }

  @media screen and (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
