<script setup lang="ts">
import StarRating from '@/components/common/StarRating.vue';
import { formatDate } from '@/utils';
import type { GameDetails } from '@/types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

library.add(fasStar, farStar);

const props = defineProps<{
  gameItem: GameDetails;
  isOnFavorites: boolean;
}>();

const emit = defineEmits<{
  (e: 'toggleFavorite', item: GameDetails): void;
}>();

function onToggleFavorite() {
  emit('toggleFavorite', props.gameItem);
}
</script>

<template>
  <div class="game-item" v-if="gameItem">
    <div class="game-item__top">
      <img v-if="gameItem.background_image" :src="gameItem.background_image" :alt="gameItem.name"
        class="game-item__image" />
      <StarRating :rating="gameItem.rating" />
      <div class="game-item__ratings-count">
        {{ gameItem.ratings_count }}
        <font-awesome-icon icon="star" class="game-item__ratings-icon" />
      </div>
    </div>
    <div class="game-item__bottom">
      <h4 class="game-item__title">{{ gameItem.name }}</h4>
      <div class="game-item__details">
        <div class="game-item__details-group">
          <p class="game-item__details-label">Date de création:</p>
          <p class="game-item__details-value">{{ formatDate(gameItem.released) }}</p>
        </div>
        <div class="game-item__details-group">
          <p class="game-item__details-label">Mise à jour:</p>
          <p class="game-item__details-value">{{ formatDate(gameItem.updated) }}</p>
        </div>
        <div class="game-item__favorite" :class="{ 'game-item__favorite--active': isOnFavorites }"
          @click="onToggleFavorite" title="Ajouter aux favoris">
          <font-awesome-icon :icon="[isOnFavorites ? 'fas' : 'far', 'star']" />
        </div>
        <router-link :to="{ name: 'Details du jeu', params: { gameId: `${gameItem.id}` } }" class="game-item__link">
          Voir plus
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../../assets/scss/mixins' as m;

.game-item {
  display: flex;
  flex-direction: column;
  background-color: var(--secondary-2);

  &__top {
    position: relative;
    height: 220px;
    overflow: hidden;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.27) 92.08%);

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__ratings-count {
    position: absolute;
    bottom: 10px;
    left: 18px;
    background: #fff;
    padding: 0 12px;
    border-radius: 16px;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    align-items: center;
  }

  &__ratings-icon {
    margin-left: 4px;
  }

  &__bottom {
    padding: 10px;
  }

  &__title {
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 10px;
  }

  &__details {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__details-group {
    display: flex;
    justify-content: space-between;
    color: rgba(255, 255, 255, 0.6);
    font-size: 12px;
  }

  &__details-label {
    font-weight: 600;
  }

  &__details-value {
    font-weight: 400;
  }

  &__favorite {
    cursor: pointer;
    align-self: flex-end;
    margin-top: 8px;
    width: 18px;
    color: #ccc;
    transition: color 0.3s ease;

    &--active {
      color: yellow;
    }
  }

  &__link {
    margin-top: 20px;
    padding: 6px 12px;
    background: var(--primary-1);
    color: #fff;
    text-transform: uppercase;
    text-align: center;
    font-weight: bold;
    display: inline-block;
    transition: background 0.3s ease;
    text-decoration: none;
  }

  &__link:hover {
    background-color: var(--primary-1);
    filter: brightness(0.9);
  }
}

@include m.md {
  .game-item__top {
    height: 280px;
  }

  .game-item__title {
    font-size: 18px;
  }
}
</style>