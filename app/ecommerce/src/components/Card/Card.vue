<template>
  <CardLayout v-if="add">
    <template #image>
      <img :src="add.image" height="200" alt="product-image" />
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
    <template #date>
      <span>{{ new Date(add.date).toLocaleDateString() }}</span>
    </template>
    <template #category>
      <span>{{ add.category }}</span>
    </template>
    <template #favorite>
      <p>Favoris</p>
    </template>
  </CardLayout>
</template>

<script>
import CardLayout from "../Layout/CardLayout.vue";

export default {
  data() {
    return {
      editCard: false,
    };
  },
  components: {
    CardLayout,
  },
  props: ["add", "edit"],

  watch: {
    edit(newValue) {
      console.log()
      this.editCard = newValue;
    },
  },
};
</script>
