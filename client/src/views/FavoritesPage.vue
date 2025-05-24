<template>
  <div class="favorites">
    <div class="favorites__content container">
      <Title :title="{ primary: 'Tous', secondary: 'vos favoris' }" />

      <template v-if="favorites?.length">
        <GameList :games="favorites" class="favorites__list" />
      </template>

      <template v-else>
        <div class="favorites__empty">
          <h2 class="favorites__empty-title">
            Vous n'avez pas enregistré de favoris
          </h2>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import Title from "@/components/common/Title.vue";
import { GameList } from "@/components/game";

const store = useStore();
const favorites = computed<any[]>(() => store.getters.getFavorites);
</script>

<style scoped lang="scss">
@use "@/assets/scss/mixins";

.favorites {
  background-color: var(--dark-1);
  min-height: 100vh;
  padding: 60px 0;

  &__list {
    margin-top: 2rem;
  }

  &__empty {
    display: flex;
    justify-content: center;
    margin-top: 2rem;

    &-title {
      color: #fff;
      text-align: center;

      @include mixins.xs {
        font-size: 14px;
      }
    }
  }
}
</style>
