<template>
  <FavoriteCardLayout v-if="add">
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
    <template class="favorite-card__category" #category>
      <span>{{ props.add.category }}</span>
    </template>
    <template #favorite>
      <div class="favorite-card__actions">
        <span @click="this.$emit('sendFavorite', add)"
          ><i class="fa fa-eye" aria-hidden="true"></i
        ></span>
        <Modal :add="props.add" :toggle="state.isModalOpen" v-bind="$attrs">
          <template #header>
            <h2>Supprimer {{ props.add.title }}</h2>
          </template>

          <template #body>
            <p>Au prix de {{ props.add.price }}</p>
            <p>Cette action est irréversible !</p>
          </template>
        </Modal>
      </div>
    </template>
  </FavoriteCardLayout>
</template>

<script setup>
import FavoriteCardLayout from "../Layout/FavoriteCardLayout.vue";
import Modal from "../Modal/Modal";
import { reactive, defineProps, watch } from "vue";

const state = reactive({
  isModalOpen: false,
});

const props = defineProps(["add"]);

watch(props.toggle, (newValue) => {
  state.isModalOpen.value = newValue;
});
</script>
<style lang="scss" scoped>
@use "../../assets/../assets/scss/mixins";
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

    > * {
      &:nth-child(odd) {
        :hover {
          color: #00fff8;
          cursor: pointer;
        }
      }
      &:nth-child(even) {
        :hover {
          color: #00fff8;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
