<template>
  <FavoriteCardLayout v-if="add">
    <template #image>
      <img :src="add.images[0]" height="200" alt="product-image" />
    </template>
    <template #title>
      <span>{{ add.title }}</span>
    </template>
    <template #description>
      <span>{{ add.description }}</span>
    </template>
    <template #price>
      <span>{{ add.price }} €</span>
    </template>
    <template class="favorite-card__category" #category>
      <span>{{ add.category }}</span>
    </template>
    <template #favorite>
      <div class="favorite-card__actions">
        <span @click="this.$emit('sendFavorite', add)"
          ><i class="fa fa-eye" aria-hidden="true"></i
        ></span>

        <FavoriteModal :favorite="add" :toggle="isModalOpen" v-bind="$attrs">
        </FavoriteModal>
      </div>
    </template>
  </FavoriteCardLayout>
</template>

<script>
import FavoriteCardLayout from "../Layout/FavoriteCardLayout.vue";
import FavoriteModal from "../Modal/FavoriteModal.vue";

export default {
  data() {
    return {
      isModalOpen: null,
    };
  },
  components: {
    FavoriteCardLayout,
    FavoriteModal,
  },
  props: ["add"],
};
</script>
<style lang="scss" scoped>
.favorite-card {
  &__category {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
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
