<template>
  <div class="genre-list">
    <div class="genre-list__container">
      <div class="container py-20">
        <div>
          <ul
            class="genre-list__container__buttons"
            :class="{ 'genre-list__container__buttons--show': state.tabButtonStatus }"
          >
            <button type="button" class="genre-list__container__buttons-close" @click="tabButtonsHandler">
              <i class="fa-solid fa-bars" :size="22"></i>
            </button>
            <li
              v-for="item in props.genresList"
              :key="item.id"
              class="genre-list__container__buttons__link"
              :class="item.id === state.activeTab.id && 'genre-list__container__buttons__link--active'"
            >
              <button type="button" @click="tabClickHandler(item?.id)">{{ item?.name }}</button>
            </li>
          </ul>
          <div class="genre-list__container__item">
            <div class="genre-list__container__item-list">
              <template v-for="item in state.activeTab?.games" :key="item.id">
                <GenreItem :gameItem="item" />
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import GenreItem from "@/components/genre/GenreItem.vue";
import { genresListType } from "@/types";

const props = defineProps<{
  genresList: genresListType[];
}>();
const state: { tabButtonStatus: boolean; activeTab: genresListType } = reactive({
  tabButtonStatus: false,
  activeTab: props.genresList[0],
});
const tabClickHandler = (id) => {
  props.genresList.map((item) => {
    if (item.id === id) {
      state.activeTab = item;
    }
  });
};
const tabButtonsHandler = (): boolean => (state.tabButtonStatus = !state.tabButtonStatus);
</script>

<style scoped lang="scss">
.genre-list {
  &__container {
    position: relative;
    min-height: 1000px;
    background-color: rgb(7, 5, 27);
    &__buttons {
      position: absolute;
      left: 0;
      top: 0;
      width: 286px;
      z-index: 99;
      padding-top: 20px;
      padding-bottom: 60px;
      transition: var(--transition-default);
      &--show {
        transform: translateX(0);
      }
      &-close {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: -32px;
        top: 0;
        width: 32px;
        height: 32px;
        display: none;
        background-color: #fff;
        &:hover {
          background-color: var(--pink-1);
          color: #fff;
          cursor: pointer;
        }
      }
      &__link {
        & button {
          cursor: pointer;
          padding: 12px 30px;
          font-family: "Barlow";
          font-weight: 500;
          font-size: 18px;
          letter-spacing: 0.1em;
          width: 100%;
          text-align: start;
          background-color: transparent;
          color: #fff;
        }
        &--active {
          button {
            background-color: var(--pink-1);
            color: #fff;
          }
        }
      }
    }
    &__item {
      max-width: 1050px;
      margin-left: auto;
      &-list {
        display: grid;
        gap: 40px;
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .genre-list {
    &__container {
      &__item {
        &-list {
          grid-template-columns: repeat(2, 1fr);
          align-items: stretch;
        }
      }
    }
  }
}

@media screen and (min-width: 1200px) {
  .genre-list {
    &__item {
      &-list {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }
}

@media screen and (max-width: 1280px) {
  .genre-list {
    &__container {
      &__buttons {
        transform: translateX(-88%);
        width: 286px;
        &-close {
          display: block;
        }
        &--show {
          transform: translateX(0);
        }
      }
    }
  }
}
@media screen and (max-width: 1380px) {
  .genre-list {
    &__container {
      &__buttons {
        width: 200px;
      }
    }
  }
}

@media screen and (max-width: 1480px) {
  .genre-list {
    &__container {
      &__buttons {
        width: 240px;
      }
    }
  }
}
</style>
