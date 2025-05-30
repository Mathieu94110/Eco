<script setup lang="ts">
import { computed, defineProps, type Component } from "vue";
import { useStore } from "vuex";
import TableLargeScreen from "@/components/Table/TableLargeScreen.vue";
import TableSmallScreen from "@/components/Table/TableSmallScreen.vue";
import type { UserAdInterface, userAdsConfigInterface } from "@/types";

const props = defineProps<{
  userAds: UserAdInterface[];
  config: userAdsConfigInterface[];
}>();

const store = useStore();

const isTabletOrMobile = computed<boolean>(() => store?.state.windowWidth < 800);
const isActive = computed<Component>(() => (isTabletOrMobile.value === true ? TableSmallScreen : TableLargeScreen));
</script>

<template>
  <div class="table">
    <div v-if="props.userAds.length > 0" class="table__content">
      <component :is="isActive" :user-ads="props.userAds" :user-config="props.config" v-bind="$attrs" />
    </div>
    <div v-else class="table__empty-wrapper center">
      <div class="p-20 text-center">
        <h2>Vous n'avez aucune annonce en ligne</h2>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../assets/scss/mixins" as m;

.table {
  &__content {
    border: 1px solid #999;
    border-radius: 4px;
    color: #333;
    overflow: auto;
    overflow: hidden;
    margin: 30px 0px;

    figure {
      margin-block-start: 0;
      margin-block-end: 0;
      margin-inline-start: 0;
      margin-inline-end: 0;

      img {
        border: 1px solid #bbb;
        border-radius: 50%;
        height: 60px;
        width: 60px;

        @include m.xs-md {
          height: 40px;
          width: 40px;
        }
      }
    }

    table {
      border-collapse: collapse;
      border: 1px solid var(--primary-1);
      width: 100%;

      tr {
        @include m.xs-md {
          &:nth-child(odd) {
            background: var(--gray-2);
          }
        }

        th {
          position: sticky;
          top: 0;

          @include m.xs-md {
            background: var(--primary-1);
          }

          width: 50px;
          padding: 10px 5px;
          text-align: center;
          border-bottom: 1px solid #999;
        }

        td {
          padding: 5px 5px;
          text-align: center;

          span {
            font-weight: 400px;
            font-size: 16px;
          }
        }
      }

      &__cell-action {
        display: flex;
        justify-content: center;
      }
    }

    a {
      text-decoration: none;
      font-weight: 500;
    }
  }

  &__empty-wrapper {
    width: 100%;
    height: calc(100% - 60px);
  }
}
</style>
