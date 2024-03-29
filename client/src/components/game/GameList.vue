<template>
  <div class="game-list container">
    <template v-for="item in props.games.slice(0, sliceValue)" :key="item.id">
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
import { GameItem } from "@/components/game";
import { gameInterface } from "@/types";
import { required } from "@vuelidate/validators";
import { FavoriteItemType } from "@/types";
import toast from "@/mixins/toast";

const store = useStore();
const props = defineProps<{
  games: { type: gameInterface[]; required: true };
  sliceValue: number;
}>();

const slicedValue = computed<number>(() => (props.sliceValue ? props.sliceValue : 9));
const favorites = computed<FavoriteItemType[]>(() => store.getters.getFavorites);

function checkFavorite(item: FavoriteItemType): boolean {
  return favorites.value.some((fav) => fav.id === item.id);
}
function toggleFavorite(item: FavoriteItemType) {
  const isFavorited = checkFavorite(item);
  if (isFavorited) {
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
