<script setup lang="ts">
import { computed, defineProps } from "vue";
import CardLayout from "../Layout/CardLayout.vue";
import type { UserAdInterface } from "@/types";

const props = defineProps<{
  ad: UserAdInterface;
}>();

const createdDate = computed((): string => new Date(props.ad.created_at as string).toLocaleDateString());
</script>

<template>
  <CardLayout v-if="ad">
    <template #image>
      <img :src="props.ad.image" height="200" alt="product-image" />
    </template>
    <template #title>
      <span>{{ props.ad.title }}</span>
    </template>
    <template #description>
      <span>{{ props.ad.description }}</span>
    </template>
    <template #price>
      <span>{{ props.ad.price }} €</span>
    </template>
    <template #date>
      <span>{{ createdDate }}</span>
    </template>
    <template #category>
      <span>{{ props.ad.category }}</span>
    </template>
    <template #favorite>
      <p>Favoris</p>
    </template>
  </CardLayout>
</template>
