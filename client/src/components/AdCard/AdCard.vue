<script setup lang="ts">
import { computed, watch, ref, defineProps } from "vue";
import { useRoute } from "vue-router";
import type { FakeAdInterface } from "@/shared/interfaces";

const props = defineProps<{
  ad: FakeAdInterface;
  favorites: FakeAdInterface[];
}>();

const emit = defineEmits<{
  (e: "add-item", ad: FakeAdInterface): void;
}>();
const route = useRoute();
const isFavoritePage = computed(() => route.name === "FavoritesDetails");
const isFavorited = ref<boolean>(false);

watch([props.ad, () => props.favorites], ([newAds, newFavorites]) => {
  isFavorited.value = newFavorites.some((favorite) => favorite.id === newAds.id);
});
</script>

<template>
  <div :class="['card', isFavoritePage ? 'favorite' : 'not-favorite']">
    <div class="card__product-img">
      <img v-if="props.ad.images" class="card__img" :src="props.ad.images[0]" height="100" alt="product-image" />
    </div>
    <div class="card__content">
      <p class="card__title">
        {{ props.ad.title }} <span>#{{ props.ad.id }}</span>
      </p>
      <p class="card__description" v-if="props.ad.description">
        {{ props.ad.description }}
      </p>
      <div class="card__content-bottom">
        <div :class="isFavoritePage ? 'card__price-favorite' : 'card__price'">
          <div class="card__price-items">
            <span>Prix:</span> <span>{{ props.ad.price }} $</span>
          </div>
          <div class="card__price-items">
            <span>% de réduction:</span>
            <span>{{ props.ad.discountPercentage }}</span>
          </div>
          <div v-if="props.ad.rating" class="card__price-items">
            <span>Avis vendeur: </span><span>{{ props.ad.rating }} / 5</span>
          </div>
        </div>
        <div v-if="isFavoritePage" class="card__price-favorite">
          <div class="card__price-items">
            <span>Marque: </span><span>{{ props.ad.brand }}</span>
          </div>

          <div class="card__price-items">
            <span>% de réduction: </span><span>{{ props.ad.discountPercentage }}</span>
          </div>
          <div class="card__price-items">
            <span>Stock: </span><span>{{ props.ad.stock }}</span>
          </div>
          <div class="card__price-items">
            <span>Miniature: </span>
            <img
              v-if="props.ad.images.length > 0"
              class="card__img"
              :src="props.ad.images[0]"
              height="50"
              alt="product-image"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="card__footer">
      <div class="card__avatar">
        <img alt="avatar-image" :src="props.ad.thumbnail" />
      </div>
      <div class="card__category">
        <div class="card__category-items">
          <span class="card__price-items">Catégorie:</span>
          <span class="card__category-items">{{ props.ad.category }}</span>
        </div>
        <div v-if="!isFavoritePage">
          <span @click="emit('add-item', props.ad)" class="card__heart" :class="{ active: isFavorited }">
            <i class="fas fa-heart"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.icon {
  display: flex;
}

.card {
  min-width: 300px;
  max-height: 600p;
  margin: 20px;
  background-color: #15263f;
  color: var(--primary-color);
  border-radius: 16px;
  font-size: 1.2rem;
  box-shadow: 0 25px 50px 0 rgba(0, 0, 0, 0.1);

  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    padding-bottom: 32px;
  }

  &__product-img {
    cursor: pointer;
    position: relative;
    border-radius: 8px;
    overflow: hidden;

    @mixin hoverOpacity {
      content: "";
      position: absolute;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 0.25s ease-out;
    }

    &::before {
      @include hoverOpacity;
      background-color: var(--primary-1);
    }

    &::after {
      @include hoverOpacity;
    }

    &:hover {
      &::before {
        opacity: 0.5;
      }

      &::after {
        opacity: 1;
      }
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 24px 0 16px 0;

    @media screen and (min-width: 768px) {
      gap: 16px;
      padding: 24px 0;
      height: 320px;
    }
  }

  &__title {
    height: 50px;
    color: var(--primary-color);
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      color: var(--primary-1);
    }
  }

  &__description {
    height: auto;
    overflow: hidden;
    font-size: 1rem;
    line-height: 1.2rem;
    font-weight: lighter;

    @media screen and (min-width: 768px) {
      height: 76px;
      overflow-y: auto;
    }
  }

  &__content-bottom {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 4px;
    font-size: 1rem;

    @media screen and (min-width: 768px) {
      padding-top: 6px;
    }

    > * {
      display: flex;
      gap: 8px;
      font-weight: 600;
    }
  }

  &__price {
    display: block;
  }

  &__price-favorite {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px 0;
  }

  &__price-items {
    display: flex;
    flex-direction: column;
    padding: 0 5px;

    :nth-child(odd) {
      color: var(--primary-1);
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    border-top: 1px solid var(--gray-3);
    gap: 16px;
    padding-top: 16px;
  }

  &__avatar {
    display: flex;
    border-radius: 90px;
    border: 1px solid var(--primary-color);

    img {
      width: 33px;
      max-height: 33px;
    }
  }

  &__category {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  &__category-items {
    :first-child {
      color: var(--primary-1);
    }
  }

  &__heart {
    padding: 10px;

    &:hover {
      cursor: pointer;
    }
    &.active {
      color: var(--danger-1);
    }
  }
}

.favorite {
  padding: 30px;
}

.not-favorite {
  padding: 16px;
  width: 250px;
  text-align: center;
}

//Transition
.fade-enter-active,
.fade-leave-active {
  transition: 0.25s ease-out;
}

.fade-leave-to,
.fade-enter-from {
  opacity: 0;
}
</style>
