<script setup lang="ts">
import type { UserAddInterface } from "@/shared/interfaces";
import { reactive, onMounted, computed, watch, defineProps } from "vue";
import CardLayout from "../Layout/CardLayout.vue";

const state = reactive<{
  editCard: boolean;
  edit: boolean;
  card: UserAddInterface;
}>({
  editCard: false,
  edit: false,
  card: {
    author: "",
    title: "",
    description: "",
    category: "",
    price: 0,
    image: "",
    created_at: "",
  },
});

const props = defineProps<{
  add: UserAddInterface;
  isEditMode: boolean;
}>();

const onPickFile = (e: Event) => {
  state.edit = true;
  const target = e.target as HTMLInputElement;
  if (target.files) {
    const imageFile = target.files;
    if (!imageFile.length) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        state.card.image = e.target.result;
      }
      return;
    };
    reader.readAsDataURL(imageFile[0]);
  }
};

onMounted(() => {
  if (props.add) {
    state.card = props.add;
  }
});

const title = computed({
  get() {
    return state.card.title;
  },
  set(val) {
    state.card.title = val;
  },
});

const description = computed({
  get() {
    return state.card.description;
  },
  set(val) {
    state.card.description = val;
  },
});

const price = computed({
  get() {
    return state.card.price;
  },
  set(val) {
    state.card.price = val;
  },
});

const category = computed({
  get() {
    return state.card.category;
  },
  set(val) {
    state.card.category = val;
  },
});

watch(
  () => state.edit,
  (newValue: boolean) => (state.editCard = newValue)
);
</script>

<template>
  <div class="edit-card">
    <div class="edit-card__validate-button-wrapper my-20">
      <buttton
        v-if="props.isEditMode"
        type="button"
        class="btn btn-primary font-600"
        @click="$emit('updateCard', state.card)"
        >Valider</buttton
      >
    </div>
    <CardLayout v-if="props.add">
      <template #image>
        <div class="edit-card__product-img" v-if="!state.edit">
          <img
            class="edit-card__img"
            :src="props.add.image"
            height="200"
            alt="product-image"
          />
        </div>
        <div
          v-else
          class="edit-card__imagePreviewed"
          :style="{ 'background-image': `url(${state.card.image})` }"
        ></div>
        <label for="image">
          <input
            id="image"
            name="image"
            accept="image/*"
            type="file"
            @change="onPickFile($event)"
          />
        </label>
      </template>
      <template #title>
        <label for="title">
          <input v-model="title" class="edit-card__inputs" />
        </label>
      </template>
      <template #description>
        <label for="description">
          <textarea v-model="description" class="edit-card__inputs"></textarea>
        </label>
      </template>
      <template #price>
        <label for="price">
          <input v-model="price" class="edit-card__inputs" />
        </label>
      </template>
      <template #date>
        <span>{{
          new Date(props.add.created_at as any).toLocaleDateString()
        }}</span>
      </template>
      <template #category>
        <label for="category">
          <select v-model="category" class="edit-card__inputs">
            <option value="Informatique">Informatique</option>
            <option value="Téléphones, tablettes">Téléphones, tablettes</option>
            <option value="Électro">Électro</option>
            <option value="Rangements">Rangements</option>
            <option value="Vetements">Vetements</option>
            <option value="Cosmétiques">Cosmétiques</option>
            <option value="Vidéo, son">Vidéo, son</option>
            <option value="Auto, moto">Auto, moto</option>
            <option value="Autres">Autres</option>
          </select>
        </label>
      </template>
    </CardLayout>
  </div>
</template>

<style scoped lang="scss">
.edit-card {
  width: 100%;
  &__validate-button-wrapper {
    width: 100%;
    text-align: center;
  }
  &__product-img {
    cursor: pointer;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    text-align: center;
  }
  &__imagePreviewed {
    width: 200px;
    height: 200px;
    display: block;
    cursor: pointer;
    margin: 0 auto 14px;
    background-size: cover;
    background-position: center center;
  }
  &__inputs {
    font-weight: 600;

    > options {
      height: 40px;
      width: 100%;
    }
  }
}
</style>
