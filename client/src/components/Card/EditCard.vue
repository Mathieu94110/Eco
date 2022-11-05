<template>
  <div class="edit-card">
    <div class="edit-card__validate-button-wrapper mb-20">
      <buttton
        v-if="props.currentState"
        type="button"
        class="btn btn-primary font-600"
        :key="component"
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
        <input
          id="image"
          name="image"
          accept="image/*"
          ref="fileInput"
          type="file"
          @input="onPickFile"
        />
      </template>
      <template #title>
        <input v-model="title" class="edit-card__inputs" />
      </template>
      <template #description>
        <textarea v-model="description" class="edit-card__inputs"></textarea>
      </template>
      <template #price>
        <input v-model="price" class="edit-card__inputs" />
      </template>
      <template #date>
        <span>{{ new Date(props.add.date).toLocaleDateString() }}</span>
      </template>
      <template #category>
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
      </template>
    </CardLayout>
  </div>
</template>

<script setup>
import {
  reactive, onMounted, computed, watch, defineProps, ref,
} from 'vue';
import CardLayout from '../Layout/CardLayout.vue';

const state = reactive({
  editCard: false,
  edit: false,
  card: {},
});

const props = defineProps(['add', 'currentState']);
const fileInput = ref(null);
const onPickFile = () => {
  state.edit = true;
  const input = fileInput.value;
  const file = input.files;
  if (file && file[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      state.card.image = e.target.result;
    };
    reader.readAsDataURL(file[0]);
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

watch(state.edit, (newValue) => {
  state.editCard = newValue;
});
</script>

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
