<template>
  <div class="post-create-category">
    <div>
      <label for="category">
        <select
          placeholder="Catégorie"
          autocomplete="off"
          @input="$emit('update:modelValue', $event.target.value)"
          v-model="input"
          @change="validateInput"
        >
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
    </div>
    <div class="post-create-category__errors" v-if="errors.category">
      {{ errors.category }}
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import addFormValidation from '@/modules/formValidation';

export default {
  setup() {
    const input = ref('');
    const store = useStore();
    const { validateCategoryField, errors } = addFormValidation();
    const validateInput = () => {
      validateCategoryField('category', input.value);
    };
    const storeCategory = computed(() => store?.state.currentPost.category);
    watch(storeCategory, (newValue) => {
      if (!newValue) input.value = '';
      validateInput();
    });
    return {
      input,
      errors,
      validateInput,
      storeCategory,
    };
  },
};
</script>
<style lang="scss" scoped>
@use "../../../../assets/scss/mixins" as m;

.post-create-category {
  width: 100%;
  margin: auto;
  height: 47px;
  select {
    width: 100%;
    padding: 5px 10px;
    border: 2px solid #000;
  }
  &__errors {
    color: rgb(229, 23, 23);
    font-size: 12px;
  }
}
@include m.sm {
  .post-create-category {
    height: 80px;

    &__errors {
      font-size: 15px;
    }
  }
}
</style>
