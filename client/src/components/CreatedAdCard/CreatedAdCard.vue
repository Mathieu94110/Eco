<script setup lang="ts">
import { defineProps } from "vue";
import CardLayout from "../Layout/CardLayout.vue";
import type { UserAdInterface } from "@/types";
import mysteryImage from "../../assets/images/mystery-image.png";

const props = defineProps<{
  currentPost: UserAdInterface
}>();
</script>

<template>
  <div v-if="props.currentPost" class="created-ad-card" data-cy="created-ad-card">
    <CardLayout class="created-ad">
      <template #image>
        <div class="created-ad__img-wrapper">
          <img :src="props.currentPost.image || mysteryImage" class="created-ad__img-content"
            :alt="props.currentPost.title || 'Annonce sans titre'" />
        </div>
      </template>
      <template #title>
        <span>{{ props.currentPost.title }}</span>
      </template>
      <template #description>
        <span>{{ props.currentPost.description }}</span>
      </template>
      <template #price>
        <span>{{ props.currentPost.price }} €</span>
      </template>
      <template #date>
        <span>{{ new Date().toLocaleDateString() }}</span>
      </template>
      <template #category>
        <span>{{ props.currentPost.category }}</span>
      </template>
    </CardLayout>
  </div>
</template>

<style lang="scss" scoped>
@use "../../assets/scss/mixins" as m;

.created-ad {
  &__img-wrapper {
    height: 114px;
    margin-bottom: 20px;
  }

  &__img-content {
    width: 100px;
    height: 100px;
    display: block;
    cursor: pointer;
    margin: 14px auto;
    object-fit: cover;
    background-position: center center;
  }
}

@include m.md {
  .created-ad {
    margin: 0 auto 20px;
  }
}

@include m.sm {
  .created-ad {
    height: 630px;
    width: 320px;

    &__img-wrapper {
      height: auto;
      margin-bottom: 0;
    }

    &__img-content {
      width: 160px;
      height: 160px;
    }
  }
}
</style>
