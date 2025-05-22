<script setup lang="ts">
import { defineProps } from "vue";
import Modal from "@/components/Modal/Modal.vue";
import type { UserAdInterface, userAdsConfigInterface } from "@/types";

const props = defineProps<{
  userAds: UserAdInterface[];
  userConfig: userAdsConfigInterface[];
}>();
</script>

<template>
  <table class="table-small__responsive">
    <tr v-for="(obj, index) in props.userConfig" :key="index">
      <th class="table-small__responsive-title">
        {{ obj.title }}
      </th>
      <th class="table-small__responsive-cell" v-for="(row, index) in props.userAds" :key="index" :id="row['_id']">
        <span class="table-small__responsive-cell-content" v-if="obj.key === 'title'">{{ row[obj.key] }}</span>
        <span v-if="obj.key === 'created_at'">{{ new Date(row[obj.key] as any).toLocaleDateString() }} </span>
        <span v-if="obj.key === 'price'">{{ row[obj.key] }}</span>
        <figure v-if="obj.key === 'image'">
          <img :src="row[obj.key]" width="auto" alt="ad picture" />
        </figure>
        <span v-if="obj.key === 'description'">{{ row[obj.key] }}</span>
        <span v-if="obj.key === 'category'">{{ row[obj.key] }}</span>
        <div class="table-small__responsive-cell-action" v-if="obj.title === 'Actions'">
          <router-link :to="{
            name: 'Détails de votre annonce',
            params: { id: row['_id'] },
          }">
            <font-awesome-icon :icon="['fa', 'fa-eye']" aria-hidden="true" />
          </router-link>
          <div class="table-small__delete-icon">
            <Modal :ad="row" v-bind="$attrs">
              <template #header>
                <h2>
                  <span class="danger">Supprimer </span>
                  <span class="default-color">{{ row.title }}</span>
                </h2>
              </template>

              <template #body>
                <p>
                  <span class="default-color">Au prix de</span>
                  {{ row.price }} €
                </p>
                <p class="danger">Cette action est irréversible !</p>
              </template>
            </Modal>
          </div>
        </div>
      </th>
    </tr>
  </table>
</template>

<style lang="scss">
@use "../../assets/scss/mixins";

.table-small {
  &__responsive {
    table-layout: fixed;
    width: 100%;

    &-title {
      height: 100px;
      padding: 0;
      background-color: var(--primary-1);
      font-size: 16px;

      @include mixins.xs {
        font-size: 10px;
        word-wrap: break-word;
      }
    }

    &-cell {
      height: 100px;
      padding: 5px;
      word-wrap: break-word;
      width: 15%;
      font-size: 14px;

      &:nth-child(odd) {
        background: var(--gray-2);
      }

      @include mixins.xs {
        font-size: 10px;
        padding: 0 2px;
      }

      &-content {
        word-wrap: break-word;
        font-size: 14px;

        @include mixins.xs {
          font-size: 10px;
        }
      }

      &-action {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    }
  }

  &__delete-icon {
    &:hover {
      cursor: pointer;
      color: var(--dark-2);
    }
  }
}
</style>
