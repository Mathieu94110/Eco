<template>
  <div class="game-details">
    <div class="game-details__title">
      <h3 class="game-details__title-text">
        {{ gameData?.name }}
      </h3>
    </div>
    <div class="game-details__grid">
      <div class="game-details__grid__img">
        <img :src="gameData?.background_image" :alt="gameData?.name" />
      </div>

      <div class="game-details__grid__content">
        <h4 class="game-details__grid__content-title">Details <span>du jeu</span></h4>

        <div class="game-details__grid__content-top-text">
          <p>{{ topTextDescription }}</p>
        </div>

        <ul class="game-details__grid__content__list">
          <li class="game-details__grid__content__list-item">
            <div class="game-details__grid__content__list-item__left">
              <span class="game-details__grid__content__list-item__left-icon">
                <i class="fa-regular fa-calendar"></i>
              </span>
              <span class="game-details__grid__content__list-item__left-details"> Date de création: </span>
            </div>
            <span class="game-details__grid__content__list-item-right"> {{ createdDate }} </span>
          </li>

          <li class="game-details__grid__content__list-item">
            <div class="game-details__grid__content__list-item__left">
              <span class="game-details__grid__content__list-item__left-icon"
                ><i class="fa-solid fa-layer-group"></i
              ></span>
              <span class="game-details__grid__content__list-item__left-details"> plateformes: </span>
            </div>
            <span class="game-details__grid__content__list-item-right"> {{ platforms?.join(", ") }} </span>
          </li>

          <li class="game-details__grid__content__list-item">
            <div class="game-details__grid__content__list-item__left">
              <span class="game-details__grid__content__list-item__left-icon"> <i class="fa-solid fa-code"></i> </span>
              <span class="game-details__grid__content__list-item__left-details"> développeurs: </span>
            </div>
            <span class="game-details__grid__content__list-item-right"> {{ developers?.join(", ") }} </span>
          </li>

          <li class="game-details__grid__content__list-item">
            <div class="game-details__grid__content__list-item__left">
              <span class="game-details__grid__content__list-item__left-icon">
                <i class="fa-solid fa-gamepad"></i>
              </span>
              <span class="game-details__grid__content__list-item__left-details"> genres: </span>
            </div>
            <span class="game-details__grid__content__list-item-right"> {{ genres?.join(", ") }} </span>
          </li>

          <li class="game-details__grid__content__list-item">
            <div class="game-details__grid__content__list-item__left">
              <span class="game-details__grid__content__list-item__left-icon"
                ><i class="fa-solid fa-building"></i
              ></span>
              <span class="game-details__grid__content__list-item__left-details"> éditeurs: </span>
            </div>
            <span class="game-details__grid__content__list-item-right"> {{ publishers?.join(", ") }} </span>
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
        <Tab title="Platformes">
          <h3 class="game-details__tabs-title">Plateformes</h3>
          <div class="game-details__tabs-platforms">
            <div
              v-for="item in gameData?.platforms"
              :key="item?.platform?.id"
              class="game-details__tabs-platforms__item"
            >
              <p class="game-details__tabs-platforms__item-title">{{ item?.platform?.name }}</p>
              <div class="game-details__tabs-platforms__item__img">
                <img :src="item?.platform?.image_background" class="game-details__tabs-platforms__item__img-img" />
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

<script setup lang="ts">
import { computed } from "vue";
import { StoreItem } from "@/components/store";
import Tabs from "@/components/common/Tabs/Tabs.vue";
import Tab from "@/components/common/Tabs/Tab.vue";
import { formatDate } from "@/utils";
import { gameDetailsType } from "@/types";
const props = defineProps<{
  gameData: gameDetailsType;
}>();
const topTextDescription = computed<string>(
  () => props.gameData?.description_raw?.split(".").splice(0, 3).join(".") + ".",
);
const platforms = computed<string[]>(() => props.gameData?.platforms?.map((platform) => platform.platform.name));
const developers = computed<string[]>(() => props.gameData?.developers?.map((developer) => developer.name));
const genres = computed<string[]>(() => props.gameData?.genres?.map((genre) => genre.name));
const publishers = computed<string[]>(() => props.gameData?.publishers?.map((publisher) => publisher.name));
const createdDate = computed<string>(() => formatDate(props.gameData?.released));
</script>

<style scoped lang="scss">
.game-details {
  background: #00000099;
  padding: 10px;
  margin-top: 32px;
  color: #fff;
  &__title {
    margin-bottom: 36px;
    &-text {
      font-size: 18px;
      letter-spacing: 0.04em;
      color: #fff;
      font-weight: 600;
      text-transform: uppercase;
    }
  }
  &__grid {
    display: grid;
    &__img {
      min-height: 320px;
      & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &__content {
      margin-top: 24px;
      &-title {
        font-weight: 700;
        color: var(--primary-1);
        margin-bottom: 12px;
        font-size: 20px;
        letter-spacing: 2px;
        & > span {
          color: #fff;
        }
      }
      &-top-text {
        font-weight: 200;
        opacity: 0.9;
      }
      &__list {
        padding: 30px 0;
        &-item {
          margin: 8px 0;
          color: #fff;
          align-items: center;
          flex-wrap: wrap;
          &__left {
            display: flex;
            align-items: center;
            font-weight: 600;
            &-icon {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              margin: 8px 0;
              overflow: hidden;
              width: 32px;
            }
            &-details {
              text-transform: uppercase;
              font-weight: 600;
              letter-spacing: 0.04em;
              margin-right: 12px;
            }
          }
          &-right {
            font-weight: 400;
          }
        }
      }
    }
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
    }
    &-description {
      font-weight: 200;
      opacity: 0.9;
      color: #fff;
    }
    &-platforms {
      gap: 16px;
      &__item {
        color: #fff;
        &-title {
          margin-bottom: 8px;
        }
        &__img {
          height: 180px;
          &-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
    &-stores {
      display: grid;
      gap: 40px;
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

@media screen and (min-width: 992px) {
  .game-details {
    &__tabs {
      &-platforms {
        display: grid;
        gap: 40px;
        grid-template-columns: repeat(3, 1fr);
      }
      &-stores {
        grid-template-columns: repeat(2, 1fr);
        align-items: stretch;
      }
    }
  }
}

@media screen and (min-width: 1080px) {
  .game-details {
    padding: 60px 42px;
    &__title {
      &-text {
        font-size: 42px;
      }
    }
    &__grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 32px;
      align-items: stretch;
      &__content {
        &-title {
          font-size: 28px;
        }
        margin-top: 0;
        &__list {
          padding: 30px 0;
          &-item {
            &__left {
              &-icon {
                margin: 8px;
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (min-width: 1200px) {
  .game-details {
    &__tabs {
      &-stores {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }
}
</style>
