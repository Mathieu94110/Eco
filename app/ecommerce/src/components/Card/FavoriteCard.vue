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
        <span><i class="fa fa-eye" aria-hidden="true"></i></span>
        <span @click="showDeleteModal(row)">
          <i class="fa fa-trash" aria-hidden="true"></i
        ></span>
      </div>
    </template>
  </FavoriteCardLayout>
</template>

<script>
import FavoriteCardLayout from "../Layout/FavoriteCardLayout.vue";

export default {
  components: {
    FavoriteCardLayout,
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

    > span {
      &:nth-child(odd) {
        :hover {
          color: #00fff8;
        }
      }
      &:nth-child(even) {
        :hover {
          color: #00fff8;
        }
      }
    }
  }
}
</style>
