<script setup lang="ts">
import { inject, computed } from "vue";
import type { FiltersInterface, FakeAdInterface, FilterUpdate, Category } from "@/shared/interfaces";
import { fakeAdsCategories } from "@/constants/fakeAds";

const props = defineProps<{
  filters: FiltersInterface;
  ads: FakeAdInterface[];
}>();

const emit = defineEmits<{
  (e: "update-filter", filterUpdate: FilterUpdate): void;
}>();

const sideBarClosed = inject<(x: boolean) => string>("collapsed");
const rangeFilter = computed<[number, number]>(() => props.filters.priceRange);
const categoryFilter = computed<Category>(() => props.filters.category);
const numberOfAds = computed<number>(() => props.ads.length);
</script>

<template>
  <div class="ad-card-filter">
    <div class="ad-card-filter__wrapper" :style="{ left: sideBarClosed ? '75px' : '270px' }">
      <section class="mb-20">
        <h3 class="mb-10">Rechercher</h3>
        <label for="search">
          <input
            @input="
              $emit('update-filter', {
                search: ($event.target as HTMLInputElement).value,
              })
            "
            type="text"
            placeholder="Rechercher"
            class="ad-card-filter__search"
          />
        </label>
      </section>
      <section>
        <h3 class="mb-10">Trier par prix</h3>
        <div
          class="mb-5"
          v-for="(priceRange, index) of ([
            [0, 9999],
            [5, 500],
            [500, 1000],
            [1000, 2000],
            [2000, 9999],
          ] as [number, number][])"
          :key="index"
        >
          <label for="priceRange">
            <input
              :checked="rangeFilter[0] === priceRange[0]"
              type="radio"
              @input="emit('update-filter', { priceRange })"
              name="priceRange"
              :id="priceRange[0] + ''"
              class="mr-10"
            />
          </label>
          <span class="ml-10" :for="priceRange[0] + ''">
            {{
              priceRange[0] === 0
                ? "Tous les prix"
                : priceRange[0] === 2000
                ? "Plus de 2000€"
                : `Entre ${priceRange[0]} et ${priceRange[1]}€`
            }}
          </span>
        </div>
      </section>
      <section class="ad-card-filter__category">
        <h3 class="mb-10">Trier par categories</h3>
        <div class="ad-card-filter__category-items">
          <p
            class="ad-card-filter__category-item"
            :class="{ selected: categoryFilter === category }"
            v-for="(category, index) in fakeAdsCategories"
            :key="index"
            @click="emit('update-filter', { category })"
            @keydown="emit('update-filter', { category })"
          >
            {{ category }}
          </p>
        </div>
      </section>
      <small class="my-10">
        Nombre de résultats:
        <strong class="primary">{{ numberOfAds }} </strong>
      </small>
      <button class="btn btn-danger" @click="emit('update-filter', {})">Supprimer les filtres</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ad-card-filter {
  height: 100%;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  &__wrapper {
    padding: 0px 10px 20px;
    display: flex;
    flex-direction: column;
    max-height: 800px;
    justify-content: space-evenly;

    > input:first-child {
      width: 180px;
    }
  }
  &__search {
    max-width: 180px;
    padding: 0 10px;
  }
  &__category {
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    &-items {
      max-height: 200px;
      overflow-y: auto;
    }
    &-item {
      font-size: 14px;
      line-height: 18px;
      padding-bottom: 5px;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  &__reset-button {
    color: var(--primary-color);
    background: var(--danger-2);
    padding: 10px 20px;
    border-radius: 5px;
    &:hover {
      cursor: pointer;
    }
  }
}
.selected {
  font-weight: bold;
  text-decoration: underline;
}
label {
  font-size: 14px;
  font-weight: 600;
}
</style>
