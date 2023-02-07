<script setup lang="ts">
import type { FakeAddInterface } from "@/shared/interfaces";
import { defineProps } from "vue";
import CardLayout from "../Layout/CardLayout.vue";
import Modal from "../Modal/Modal.vue";

const props = defineProps<{
  add: FakeAddInterface;
}>();
</script>

<template>
  <CardLayout v-if="add">
    <template #image>
      <img
        :src="props.add.images[0]"
        class="favorite-card__image"
        alt="product-image"
      />
    </template>
    <template #title>
      <span>{{ props.add.title }}</span>
    </template>
    <template #description>
      <span>{{ props.add.description }}</span>
    </template>
    <template #price>
      <span>{{ props.add.price }} €</span>
    </template>
    <template #category>
      <div class="favorite-card__category">
        <span>{{ props.add.category }}</span>
      </div>
    </template>
    <template #favorite>
      <div class="favorite-card__actions">
        <span
          @click="$emit('send-favorite', add)"
          @keydown="$emit('send-favorite', add)"
          ><i class="fa fa-eye" aria-hidden="true"></i
        ></span>
        <Modal :add="props.add" v-bind="$attrs">
          <template #header>
            <h2><span class="danger">Supprimer</span> {{ props.add.title }}</h2>
          </template>

          <template #body>
            <p>Au prix de {{ props.add.price }} €</p>
            <p span class="danger">Cette action est irréversible !</p>
          </template>
        </Modal>
      </div>
    </template>
  </CardLayout>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/mixins";
.favorite-card {
  &__category {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
  &__image {
    overflow: hidden;
    height: 100px;
    @include mixins.sm {
      height: 200px;
      display: block;
      margin: 0 auto 14px;
      background-size: cover;
      background-position: center center;
    }
  }
  &__actions {
    display: flex;
    justify-content: space-evenly;
    > {
      :hover {
        color: var(--primary-1);
        cursor: pointer;
      }
    }
  }
}
h2 {
  @include mixins.xs {
    font-size: 18px;
  }
}
</style>
