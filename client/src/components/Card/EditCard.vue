<script setup lang="ts">
import { reactive, computed, watch, defineProps } from "vue";
import CardLayout from "../Layout/CardLayout.vue";
import type { UserAdInterface } from "@/shared/interfaces";

const state = reactive<{
  editCard: boolean;
  edit: boolean;
  card: UserAdInterface;
}>({
  editCard: false,
  edit: false,
  card: {
    _id: "",
    userFrom: "",
    image: "",
    title: "",
    description: "",
    category: "",
    price: 0,
    created_at: "",
    __v: 0,
  },
});

const props = defineProps<{
  ad: UserAdInterface;
}>();

const emit = defineEmits<{
  (e: "update-card", ad: UserAdInterface): void;
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

const title = computed({
  get() {
    return props.ad.title;
  },
  set(val) {
    state.card.title = val.trim();
  },
});

const description = computed({
  get() {
    return props.ad.description;
  },
  set(val) {
    state.card.description = val.trim();
  },
});

const price = computed({
  get() {
    return props.ad.price;
  },
  set(val) {
    state.card.price = val;
  },
});

const category = computed({
  get() {
    return props.ad.category;
  },
  set(val) {
    state.card.category = val;
  },
});

const updateCard = () => {
  const newValues = state.card;
  for (const [key] of Object.entries(newValues)) {
    if (newValues[key] === "" || newValues[key] === 0) {
      newValues[key] = props.ad[key];
    }
  }
  emit("update-card", newValues);
};
watch(
  () => state.edit,
  (newValue: boolean) => (state.editCard = newValue),
);
</script>

<template>
  <div class="edit-card">
    <div class="edit-card__validate-button-wrapper my-20">
      <buttton type="button" class="btn btn-primary font-600" @click="updateCard()">Valider </buttton>
    </div>
    <CardLayout v-if="props.ad">
      <template #image>
        <div class="edit-card__product-img" v-if="!state.edit">
          <img class="edit-card__img" :src="props.ad.image" height="200" alt="product-image" />
        </div>
        <div
          v-else
          class="edit-card__imagePreviewed"
          :style="{ 'background-image': `url(${state.card.image ? state.card.image : props.ad.image})` }"
        ></div>
        <label for="image">
          <input id="image" name="image" accept="image/*" type="file" @change="onPickFile($event)" />
        </label>
      </template>
      <template #title>
        <label for="title">
          <input v-model="title" type="text" class="edit-card__inputs" />
        </label>
      </template>
      <template #description>
        <label for="description">
          <textarea v-model="description" class="edit-card__inputs"></textarea>
        </label>
      </template>
      <template #price>
        <label for="price">
          <input v-model="price" type="number" class="edit-card__inputs" />
        </label>
      </template>
      <template #date>
        <span>{{ new Date(props.ad.created_at as any).toLocaleDateString() }}</span>
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
    padding: 4px;
    font-weight: 600;
    min-width: 90%;
    > options {
      height: 40px;
      width: 100%;
    }
  }
}
</style>
