<template>
  <EditAddCard v-if="add">
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
  </EditAddCard>
</template>

<script>
import EditAddCard from "../Layout/EditAddCard.vue";

export default {
  data() {
    return {
      editCard: false,
    };
  },
  components: {
    EditAddCard,
  },
  props: ["add", "edit"],

  watch: {
    edit(newValue) {
      this.editCard = newValue;
    },
  },
};
</script>
