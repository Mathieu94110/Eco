<script setup lang="ts">
import { computed } from "vue";
import { type RouteRecordName, useRoute } from "vue-router";

const route = useRoute();
const currentRoute = computed<RouteRecordName | null | undefined>(() => route.name);
</script>

<template>
  <div class="card-layout__card">
    <div class="card-layout__image">
      <slot name="image"></slot>
    </div>
    <div class="card-layout__content">
      <div class="card-layout__items">
        <span>Titre :</span>
        <div class="card-layout__items-title">
          <slot name="title"></slot>
        </div>
      </div>
      <div class="card-layout__items">
        <span>Description :</span>
        <div class="card-layout__items-description">
          <slot name="description"></slot>
        </div>
      </div>
      <div class="card-layout__items">
        <span>Prix :</span>
        <span>
          <slot name="price"></slot>
        </span>
      </div>
      <div class="card-layout__items">
        <span>Date de création :</span>
        <span>
          <slot name="date"></slot>
        </span>
      </div>
      <div class="card-layout__items">
        <span>Catégorie :</span> <span>
          <slot name="category"></slot>
        </span>
      </div>
      <div class="card-layout__footer" v-if="currentRoute === 'Mes favoris'">
        <div>
          <slot name="favorite"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../../assets/scss/mixins";

.card-layout {
  &__card {
    width: 320px;
    background-color: var(--primary-1);
    color: #8bacd9;
    border-radius: 16px;
    padding: 16px 10px;
    margin: 10px auto;
    font-size: 1.2rem;
    box-shadow: 0 25px 50px 0 rgba(0, 0, 0, 0.1);

    @include mixins.xs {
      font-size: 1rem;
      padding: 16px 10px 0px 10px;
      width: 80%;
      margin: 20px auto;
    }
  }

  &__image {
    cursor: pointer;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    text-align: center;
  }

  &__content {
    display: flex;
    flex-direction: column;
    padding: 12px 0 16px 0;
  }

  &__items {
    display: flex;
    flex-direction: column;

    >span {
      &:nth-child(odd) {
        color: var(--primary-1);
      }

      &:nth-child(even) {
        color: var(--primary-color);
      }
    }

    &-description {
      padding: 10px 0px;
      height: 100px;
      overflow: auto;

      @include mixins.xs {
        height: 60px;
      }
    }

    &-title {
      height: 60px;
      overflow: auto;

      @include mixins.xs {
        height: 30px;
      }
    }
  }

  &__footer {
    border-top: 1px solid var(--gray-3);
    padding-top: 16px;
  }
}
</style>
