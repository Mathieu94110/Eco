<template>
  <div class="game-list">
    <template v-for="item in props.games.slice(0, sliceValue)" :key="item.id">
      <GameItem :gameItem="item" />
    </template>
  </div>
</template>

<script setup lang="ts">
import GameItem from "@/components/GameItem/GameItem.vue";
import { gameInterface } from "@/shared/interfaces";
import { required } from "@vuelidate/validators";
import { computed, defineProps } from "vue";

const props = defineProps<{
  games: { type: gameInterface[]; required: true };
  sliceValue: { type: Number };
}>();
const slicedValue = computed<any>(() => (props.sliceValue ? props.sliceValue : 9));

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
