<template>
  <div class="game-list">
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
import GameItem from "@/components/GameItem/GameItem.vue";
import { gameInterface } from "@/shared/interfaces";
import { required } from "@vuelidate/validators";
import { computed, defineProps } from "vue";
import { useStore } from "vuex";
import toast from "@/mixins/toast";

const store = useStore();
const props = defineProps<{
  games: { type: gameInterface[]; required: true };
  sliceValue: { type: Number };
}>();

const slicedValue = computed<any>(() => (props.sliceValue ? props.sliceValue : 9));
const favorites = computed<any[]>(() => store.getters.getFavorites);

function checkFavorite(item) {
  return favorites.value.some((fav) => fav.id === item.id);
}
function toggleFavorite(item) {
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
