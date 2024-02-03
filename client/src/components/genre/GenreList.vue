<template>
  <div class="genre-list">
    <div class="genre-list__container">
      <div class="container">
        <div>
          <ul
            class="genre-list__container__buttons"
            :class="{ 'genre-list__container__buttons--show': state.tabButtonStatus }"
          >
            <button type="button" class="genre-list__container__buttons-close" @click="tabButtonsHandler">
              <i class="fa-solid fa-bars" :size="22"></i>
            </button>
            <li
              v-for="item in props.data"
              :key="item.id"
              class="genre-list__container__buttons__link"
              :class="{ 'genre-list__container__buttons__link--active': `${item?.id === state.activeTab.id}` }"
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
const props = defineProps<{
  data: any[];
}>();
const state = reactive({
  tabButtonStatus: false,
  activeTab: props.data[0],
});
const tabClickHandler = (id) => {
  props.data.map((item) => {
    if (item.id === id) {
      state.activeTab = item;
    }
  });
};
const tabButtonsHandler = () => (state.tabButtonStatus = !state.tabButtonStatus);
</script>

<style scoped lang="scss">
.genre-list {
  margin-top: 60px;
  &__container {
    position: relative;
    min-height: 1000px;
    background-color: var(--secondary-2);
    &__buttons {
      position: absolute;
      left: 0;
      top: 0;
      width: 286px;
      z-index: 99;
      padding-top: 60px;
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
          background-color: pink;
          color: #fff;
        }
      }
      &__link {
        position: absolute;
        left: 0;
        top: 0;
        width: 286px;
        z-index: 99;
        padding-top: 60px;
        padding-bottom: 60px;
        transition: var(--transition-default);
        &--active {
          background-color: var(--secondary-2);
          button {
            color: #fff;
          }
        }
        & > button {
          color: #fff;
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
    transform: translateX(-88%);
    width: 286px;

    .tabs-buttons-close {
      display: block;
    }

    &.show {
      transform: translateX(0);
    }
  }
}

@media screen and (max-width: 1380px) {
  .genre-list {
    width: 200px;
  }
}

@media screen and (max-width: 1480px) {
  .genre-list {
    width: 240px;
  }
}
</style>
