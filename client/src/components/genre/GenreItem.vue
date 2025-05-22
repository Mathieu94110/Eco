<script setup lang="ts">
import { onMounted, reactive, toRefs } from "vue";
import StarRating from "@/components/common/StarRating.vue";
import { apiURL } from "@/constants";
import axios from "@/api/axios";
import type { genresListType, gameInterface } from "@/types";
import { formatDate } from "@/utils";

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

const props = defineProps<{
  gameItem: genresListType;
}>();

const state = reactive<{
  gameData: gameInterface | null;
}>({
  gameData: null,
});

onMounted(() => {
  const fetchGameDetails = async (): Promise<void> => {
    try {
      const { data } = await axios.get(`${apiURL.gamesURL}/${props.gameItem.id}?key=${API_KEY}`);
      state.gameData = data;
    } catch (error) {
      console.error("Erreur récupération des détails du jeu:", error);
    }
  };
  fetchGameDetails();
});
</script>

<template>
  <div class="genre-item" v-if="state.gameData">
    <div class="genre-item__top">
      <img :src="state.gameData.background_image" :alt="state.gameData.name" />
      <StarRating :rating="state.gameData.rating" />
      <div class="genre-item__top-ratings-count">
        {{ state.gameData.ratings_count }}
        <font-awesome-icon :icon="['fas', 'star']" class="genre-item__top-ratings-count-star" />
      </div>
    </div>
    <div class="genre-item__bottom">
      <h4 class="genre-item__bottom-title">{{ state.gameData.name }}</h4>

      <div class="genre-item__bottom__details">
        <div class="genre-item__bottom__details__dates">
          <div class="genre-item__bottom__details__dates-item">
            <p>Date de création&nbsp;</p>
            <p>{{ formatDate(state.gameData.released) }}</p>
          </div>
          <div class="genre-item__bottom__details__dates-item">
            <p>Mise à jour&nbsp;</p>
            <p>{{ formatDate(state.gameData.updated) }}</p>
          </div>
        </div>
        <router-link :to="`/games/${state.gameData.id}`" class="genre-item__bottom__details-link">
          Voir plus
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.genre-item {
  display: flex;
  flex-direction: column;

  &__top {
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    height: 280px;
    overflow: hidden;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.27) 92.08%);
    position: relative;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    }

    &-ratings-count {
      position: absolute;
      left: 18px;
      bottom: 10px;
      font-weight: 700;
      font-size: 14px;
      padding: 0px 12px;
      border-radius: 16px;
      background-color: #fff;
      z-index: 1;
      display: flex;
      align-items: center;

      &-star {
        margin-left: 4px;
        font-size: 12px;
      }
    }
  }

  &__bottom {
    flex: 1;
    background-color: var(--secondary-2);
    padding: 20px 18px;

    &-title {
      color: #fff;
      text-transform: uppercase;
      font-size: 18px;
      font-weight: 800;
      letter-spacing: 0.06em;
      margin-bottom: 10px;
    }

    &__details {
      padding: 16px;

      &__dates {
        padding-top: 12px;
        color: rgba(255, 255, 255, 0.6);
        font-size: 14px;

        &-item {
          display: flex;
          align-items: center;
          justify-content: space-between;

          &>p {
            font-weight: 600;
            margin: 0 4px;
          }
        }
      }

      &-link {
        margin-top: 10px;
        height: 34px;
        text-align: center;
        border: 1px solid var(--primary-1);
        padding: 0px 16px;
        min-width: 108px;
        color: #fff;
        font-weight: 600;
        letter-spacing: 0.03em;
        display: inline-flex;
        align-items: center;
        transition: var(--transition-default);
        text-decoration: none;

        &:hover {
          background-color: var(--success-1);
        }
      }
    }
  }
}
</style>
