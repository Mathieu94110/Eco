<template>
  <div
    class="creator-item"
    :style="{
      background: `linear-gradient(rgba(7, 5, 27, 0.9), rgba(0, 0, 0, 0.95)), url(${props.creatorItem?.image_background}) center/cover no-repeat`,
    }"
  >
    <div class="creator-item__top">
      <img :src="props.creatorItem?.image" />
    </div>
    <div class="creator-item__bottom">
      <h4 class="creator-item__bottom-title">{{ props.creatorItem?.name }}</h4>
      <ul class="creator-item__bottom__list">
        <li class="creator-item__bottom__list__group-item">
          <span class="creator-item__bottom__list__group-item-left">Nombre de jeux </span>
          <span class="creator-item__bottom__list__group-item-right">{{ props.creatorItem?.games_count }}</span>
        </li>
        <li class="creator-item__bottom__list__group-item">
          <span class="creator-item__bottom__list__group-item-left">Position </span>
          <span v-if="positions.length" class="creator-item__bottom__list__group-item-right">{{
            positions.join(", ")
          }}</span>
          <span v-else class="creator-item__bottom__list__group-item-right">N/A</span>
        </li>
        <li class="creator-item__bottom__list__group-item">
          <span class="creator-item__bottom__list__group-item-left">Jeux </span>
          <span v-if="games.length" class="creator-item__bottom__list__group-item-right">{{
            games.join(", ")
          }}</span>
          <span v-else class="creator-item__bottom__list__group-item-right">N/A</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import { CreatorItemType } from "@/types";
const props = defineProps<{
  creatorItem: CreatorItemType;
}>();
const positions = computed<string[]>(() => props.creatorItem?.positions?.map((position) => position?.name));
const games = computed<string[]>(() => props.creatorItem?.games?.map((game) => game?.name));
</script>

<style scoped lang="scss">
.creator-item {
  min-height: 360px;
  margin-bottom: 80px;
  padding: 16px 32px 24px 32px;
  text-align: center;
  &__top {
    height: 150px;
    width: 150px;
    margin-right: auto;
    margin-left: auto;
    border-radius: 50%;
    overflow: hidden;
    margin-top: -75px;
    border: 2px solid #fff;
    transition: var(--transition-default);
    &:hover {
      transform: scale(1.1);
    }
  }
  &__bottom {
    margin-top: 48px;
    color: #fff;
    &-title {
      font-size: 24px;
    }
    &__list {
      color: #fff;

      &__group-item {
        margin: 8px 0;
        display: flex;
        flex-direction: column;
        &-left {
          font-weight: 600;
          color: var(--primary-1);
        }
      }
    }
  }
}
</style>
