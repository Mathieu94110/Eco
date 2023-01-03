<script setup lang="ts">
import type { UserAddInterface } from "@/shared/interfaces";
import { computed } from "vue";
import { reactive, watch, defineProps } from "vue";
import CardLayout from "../Layout/CardLayout.vue";

const state = reactive({
  editCard: false,
});

const props = defineProps<{
  add: UserAddInterface;
  edit: boolean;
}>();

const createdDate = computed((): string =>
  new Date(props.add.created_at as any).toLocaleDateString()
);

watch(
  () => props.edit,
  (newValue: boolean) => (state.editCard = newValue)
);
</script>

<template>
  <CardLayout v-if="add">
    <template #image>
      <img :src="props.add.image" height="200" alt="product-image" />
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
    <template #created_at>
      <span>{{ createdDate }}</span>
    </template>
    <template #category>
      <span>{{ props.add.category }}</span>
    </template>
    <template #favorite>
      <p>Favoris</p>
    </template>
  </CardLayout>
</template>
