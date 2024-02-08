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
  <div>
    <table>
      <thead>
        <tr>
          <th v-for="(obj, index) in props.userConfig" :key="index">
            {{ obj.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in props.userAds" :key="index" :id="row['_id']">
          <td v-for="(obj, id) in props.userConfig" :key="id">
            <span v-if="obj.key === 'title'">{{ row[obj.key] }}</span>
            <span v-if="obj.key === 'created_at'">{{ new Date(row[obj.key] as any).toLocaleDateString() }} </span>
            <span v-if="obj.key === 'price'">{{ row[obj.key] }}</span>
            <figure v-if="obj.key === 'image'">
              <img :src="row[obj.key]" width="auto" alt="ad picture" />
            </figure>
            <span v-if="obj.key === 'description'">{{ row[obj.key] }}</span>
            <span v-if="obj.key === 'category'">{{ row[obj.key] }}</span>
            <div class="d-flex justify-center" v-if="obj.title === 'Actions'">
              <router-link
                :to="{
                  name: 'Détails de votre annonce',
                  params: { id: row['_id'] },
                }"
                ><i class="fa fa-eye" aria-hidden="true"></i>
              </router-link>
              <div class="table__delete-icon">
                <Modal :ad="row" v-bind="$attrs">
                  <template #header>
                    <h2>
                      <span class="danger">Supprimer </span>
                      <span class="default-color">{{ row.title }}</span>
                    </h2>
                  </template>

                  <template #body>
                    <p>Au prix de {{ row.price }} €</p>
                    <p>
                      <span class="danger">Cette action est irréversible !</span>
                    </p>
                  </template>
                </Modal>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
@use "../../assets/scss/mixins";

.table {
  &__delete-icon {
    padding: 0 20px;
    &:hover {
      cursor: pointer;
      color: var(--dark-2);
    }
  }
}
</style>
