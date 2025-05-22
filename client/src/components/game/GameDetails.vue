<script setup lang="ts">
import { computed } from "vue";
import { StoreItem } from "@/components/store";
import Tabs from "@/components/common/Tabs/Tabs.vue";
import Tab from "@/components/common/Tabs/Tab.vue";
import { formatDate } from "@/utils";
import type { gameDetailsType } from "@/types";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faLayerGroup, faCode, faGamepad, faBuilding } from "@fortawesome/free-solid-svg-icons";

library.add(faCalendar, faLayerGroup, faCode, faGamepad, faBuilding);

const props = defineProps<{
  gameData: gameDetailsType;
}>();

const topTextDescription = computed<string>(
  () => props.gameData?.description_raw?.split(".").splice(0, 3).join(".") + "."
);
const platforms = computed<string[]>(() =>
  props.gameData?.platforms?.map((platform) => platform.platform.name)
);
const developers = computed<string[]>(() =>
  props.gameData?.developers?.map((developer) => developer.name)
);
const genres = computed<string[]>(() => props.gameData?.genres?.map((genre) => genre.name));
const publishers = computed<string[]>(() =>
  props.gameData?.publishers?.map((publisher) => publisher.name)
);
const createdDate = computed<string>(() => formatDate(props.gameData?.released));
</script>

<template>
  <div class="game-details">
    <div class="game-details__header">
      <h3 class="game-details__title">
        {{ gameData?.name }}
      </h3>
    </div>

    <div class="game-details__content">
      <div class="game-details__image-wrapper">
        <img :src="gameData?.background_image" :alt="gameData?.name" class="game-details__image" />
      </div>

      <div class="game-details__info">
        <h4 class="game-details__info-title">Details <span>du jeu</span></h4>

        <p class="game-details__description">
          {{ topTextDescription }}
        </p>

        <ul class="game-details__list">
          <li class="game-details__list-item">
            <div class="game-details__list-item-left">
              <span class="game-details__icon">
                <font-awesome-icon :icon="['far', 'calendar']" />
              </span>
              <span class="game-details__label">Date de création:</span>
            </div>
            <span class="game-details__list-item-right">{{ createdDate }}</span>
          </li>

          <li class="game-details__list-item">
            <div class="game-details__list-item-left">
              <span class="game-details__icon">
                <font-awesome-icon :icon="['fas', 'layer-group']" />
              </span>
              <span class="game-details__label">Plateformes:</span>
            </div>
            <span class="game-details__list-item-right">{{ platforms?.join(", ") }}</span>
          </li>

          <li class="game-details__list-item">
            <div class="game-details__list-item-left">
              <span class="game-details__icon">
                <font-awesome-icon :icon="['fas', 'code']" />
              </span>
              <span class="game-details__label">Développeurs:</span>
            </div>
            <span class="game-details__list-item-right">{{ developers?.join(", ") }}</span>
          </li>

          <li class="game-details__list-item">
            <div class="game-details__list-item-left">
              <span class="game-details__icon">
                <font-awesome-icon :icon="['fas', 'gamepad']" />
              </span>
              <span class="game-details__label">Genres:</span>
            </div>
            <span class="game-details__list-item-right">{{ genres?.join(", ") }}</span>
          </li>

          <li class="game-details__list-item">
            <div class="game-details__list-item-left">
              <span class="game-details__icon">
                <font-awesome-icon :icon="['fas', 'building']" />
              </span>
              <span class="game-details__label">Éditeurs:</span>
            </div>
            <span class="game-details__list-item-right">{{ publishers?.join(", ") }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="game-details__tabs">
      <Tabs>
        <Tab title="Description">
          <h3 class="game-details__tabs-title">Description du jeu</h3>
          <div class="game-details__tabs-description" v-html="gameData?.description"></div>
        </Tab>
        <Tab title="Plateformes">
          <h3 class="game-details__tabs-title">Plateformes</h3>
          <div class="game-details__tabs-platforms">
            <div v-for="item in gameData?.platforms" :key="item?.platform?.id"
              class="game-details__tabs-platforms-item">
              <p class="game-details__tabs-platforms-item-title">{{ item?.platform?.name }}</p>
              <div class="game-details__tabs-platforms-item-img">
                <img :src="item?.platform?.image_background" class="game-details__tabs-platforms-item-img-img" />
              </div>
            </div>
          </div>
        </Tab>
        <Tab title="Stores">
          <h3 class="game-details__tabs-title">Liste des Stores</h3>
          <div class="game-details__tabs-stores">
            <div v-for="item in gameData?.stores" :key="item?.store?.id">
              <StoreItem :storeItem="item?.store" />
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  </div>
</template>

<style scoped lang="scss">
.game-details {
  background: #00000099;
  padding: 10px;
  margin-top: 32px;
  color: #fff;

  &__header {
    margin-bottom: 36px;
  }

  &__title {
    font-size: 18px;
    letter-spacing: 0.04em;
    color: #fff;
    font-weight: 600;
    text-transform: uppercase;
  }

  &__content {
    display: grid;
    gap: 24px;
    grid-template-columns: 1fr;

    @media (min-width: 1080px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 32px;
      align-items: stretch;
    }
  }

  &__image-wrapper {
    min-height: 320px;

    &>.game-details__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__info {
    margin-top: 24px;

    @media (min-width: 1080px) {
      margin-top: 0;
    }
  }

  &__info-title {
    font-weight: 700;
    color: var(--primary-1);
    margin-bottom: 12px;
    font-size: 20px;
    letter-spacing: 2px;

    &>span {
      color: #fff;
    }
  }

  &__description {
    font-weight: 200;
    opacity: 0.9;
    margin-bottom: 30px;
  }

  &__list {
    padding: 30px 0;
    list-style: none;
    margin: 0;

    &-item {
      display: flex;
      justify-content: space-between;
      margin: 8px 0;
      color: #fff;
      flex-wrap: wrap;
      align-items: center;
    }
  }

  &__list-item-left {
    display: flex;
    align-items: center;
    font-weight: 600;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 8px 12px 8px 0;
    width: 32px;
    overflow: hidden;
  }

  &__label {
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.04em;
  }

  &__list-item-right {
    font-weight: 400;
  }

  &__tabs {
    width: 100%;
    min-height: 600px;
    background-color: var(--secondary-2);
    margin: 0;
    padding: 10px;

    &-title {
      color: #fff;
      margin: 12px 0;
      text-decoration: underline;
      font-size: 22px;
      font-weight: 600;
    }

    &-description {
      font-weight: 200;
      opacity: 0.9;
      color: #fff;
    }

    &-platforms {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;

      &-item {
        color: #fff;
        width: 100%;

        @media (min-width: 992px) {
          width: calc(33.333% - 10px);
        }
      }

      &-item-title {
        margin-bottom: 8px;
        font-weight: 600;
      }

      &-item-img {
        height: 180px;

        &-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }

    &-stores {
      display: grid;
      gap: 40px;

      @media (min-width: 992px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (min-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }
}

@media screen and (min-width: 600px) {
  .game-details {
    padding: 32px 14px;

    &__tabs {
      padding: 20px;
    }
  }
}

@media screen and (min-width: 1080px) {
  .game-details {
    padding: 60px 42px;

    &__title {
      font-size: 42px;
    }
  }
}
</style>
