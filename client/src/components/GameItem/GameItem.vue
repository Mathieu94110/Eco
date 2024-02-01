<template>
  <div class="game-item">
    <div class="game-item__top">
      <img :src="props.gameItem?.background_image" :alt="props.gameItem?.name" />
      <StarRating :rating="props.gameItem?.rating" />
      <div class="game-item__top__ratings-count">
        {{ props.gameItem?.ratings_count }}
        <i class="fa-solid fa-star game-item__top__ratings-count-star" :size="12"></i>
      </div>
    </div>
    <div class="game-item__bottom">
      <h4 class="game-item__bottom-title">
        {{ props.gameItem?.name }}
      </h4>
      <div class="game-item__bottom__details">
        <div class="game-item__bottom__details__group">
          <div class="game-item__bottom__details__group__item">
            <p class="game-item__bottom__details__group__item-key">Date de création: &nbsp;</p>
            <p>{{ formatDate(props.gameItem?.released) }}</p>
          </div>
          <div class="game-item__bottom__details__group__item">
            <p class="game-item__bottom__details__group__item-key">Mise à jour: &nbsp;</p>
            <p>{{ formatDate(props.gameItem?.updated) }}</p>
          </div>
        </div>
        <div @click="$emit('toggleFavorite', props.gameItem)" v-if="props.isOnFavorites">
          <i class="fa-solid fa-star game-item__bottom__details-star--active"></i>
        </div>
        <div @click="$emit('toggleFavorite', props.gameItem)" v-else>
          <i class="fa-solid fa-star game-item__bottom__details-star"></i>
        </div>
        <router-link
          :to="{ name: 'Details du jeu', params: { gameId: `${props.gameItem?.id}` } }"
          class="game-item__bottom__details-link"
        >
          Voir plus
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import StarRating from "@/shared/components/StarRating/StarRating.vue";
import { formatDate } from "@/shared/utils";
// import { useStore } from "vuex";
defineEmits(["toggleFavorite"]);
const props = defineProps<{
  gameItem: Object;
  isOnFavorites: boolean;
}>();
// const store = useStore();
// async function toggleFavorite() {
//   await store.dispatch("toggleOnFavorites", props.gameItem);
// }
</script>

<style scoped lang="scss">
.game-item {
  display: flex;
  flex-direction: column;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &__top {
    height: 220px;
    overflow: hidden;
    position: relative;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.27) 92.08%);
    position: relative;
    &__ratings-count {
      position: absolute;
      left: 18px;
      bottom: 10px;
      font-weight: 700;
      font-size: 14px;
      padding: 0px 12px;
      border-radius: 16px;
      background-color: #fff;
      z-index: 1;
      &-star {
        margin-left: 4px;
      }
    }
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
  &__bottom {
    flex: 1;
    background-color: var(--secondary-2);
    padding: 10px;
    &-title {
      font-size: 14px;
      font-weight: 800px;
      letter-spacing: 0.06em;
      margin-bottom: 10px;
      text-transform: uppercase;
      color: #fff;
    }
    .card-button {
      height: 34px;
      text-align: center;
      border: 1px solid var(--primary-1);
      padding: 0px 16px;
      min-width: 108px;
      color: #fff;
      font-weight: 600;
      letter-spacing: 0.03em;
      display: flex;
      align-items: center;
      transition: all 300ms ease-in-out;

      &:hover {
        background-color: var(--primary-1);
      }
    }
    &__details {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      &__group {
        padding-top: 12px;
        color: rgba(255, 255, 255, 0.6);
        font-size: 12px;
        &__item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          &-key {
            font-weight: 600;
          }
        }
      }
      &-link {
        height: 34px;
        text-align: center;
        border: 1px solid var(--primary-1);
        padding: 0px 16px;
        min-width: 108px;
        color: #fff;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 0.03em;
        display: flex;
        align-items: center;
        transition: all 300ms ease-in-out;
        margin-top: 10px;
        text-transform: uppercase;
        text-decoration: none;
        color: gray;
      }
      &-star {
        &--active {
          color: yellow;
        }
      }
    }
  }
}

@media screen and (min-width: 800px) {
  .game-item {
    &__top {
      height: 280px;
      &__ratings-count {
        font-size: 14px;
      }
    }
    &__bottom {
      padding: 20px 18px;
      &-title {
        font-size: 18px;
      }
    }
  }
}
</style>
