<template>
  <div class="creator-item" :style="backgroundStyle">
    <div class="creator-item__top">
      <img :src="image" alt="Creator Avatar" />
    </div>
    <div class="creator-item__bottom">
      <h4 class="creator-item__title">{{ name }}</h4>
      <ul class="creator-item__info">
        <CreatorInfoRow label="Nombre de jeux" :value="gamesCount" />
        <CreatorInfoRow label="Position" :value="positionsDisplay" />
        <CreatorInfoRow label="Jeux" :value="gamesDisplay" />
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import type { CreatorItemType } from "@/types";
import CreatorInfoRow from "./CreatorInfoRow.vue";

const props = defineProps<{ creatorItem: CreatorItemType }>();
const {
  image,
  name,
  image_background,
  games_count: gamesCount,
  positions = [],
  games = [],
} = props.creatorItem;

const backgroundStyle = computed(() => ({
  background: `linear-gradient(rgba(7, 5, 27, 0.9), rgba(0, 0, 0, 0.95)), url(${image_background}) center/cover no-repeat`,
}));

const positionsDisplay = computed(() =>
  positions.length ? positions.map(p => p.name).join(", ") : "N/A"
);
const gamesDisplay = computed(() =>
  games.length ? games.map(g => g.name).join(", ") : "N/A"
);
</script>

<style scoped lang="scss">
.creator-item {
  min-height: 360px;
  margin-bottom: 80px;
  padding: 16px 32px 24px;
  text-align: center;
  color: #fff;

  &__top {
    height: 150px;
    width: 150px;
    margin: -75px auto 0;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid #fff;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }
  }

  &__bottom {
    margin-top: 48px;
  }

  &__title {
    font-size: 24px;
    margin-bottom: 16px;
  }

  &__info {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin: 8px 0;
      display: flex;
      flex-direction: column;

      .label {
        font-weight: 600;
        color: var(--primary-1);
      }
    }
  }
}
</style>
