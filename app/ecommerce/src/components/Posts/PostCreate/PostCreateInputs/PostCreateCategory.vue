<template>
  <div class="field">
    <div>
      <select
        placeholder="Catégorie"
        autocomplete="off"
        @input="$emit('update:modelValue', $event.target.value)"
        v-model="input"
        @keyup="validateInput"
        @blur="validateInput"
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
    </div>
    <div class="ui basic label pointing red" v-if="errors.category">
      {{ errors.category }}
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import addFormValidation from "@/modules/formValidation";
export default {
  setup() {
    let input = ref("");
    const store = useStore();
    const { validateCategoryField, errors } = addFormValidation();
    const validateInput = () => {
      validateCategoryField("category", input.value);
    };
    const storeCategory = computed(() => store.state.currentPost.description);
    watch(storeCategory, (newValue) => {
      if (!newValue) input.value = "";
      validateInput();
    });
    return { input, errors, validateInput, storeCategory };
  },
};
</script>
<style lang="scss" scoped>
.field {
  width: 100%;
  margin: auto;
  height: 80px;
  select {
    width: 100%;
    padding: 5px 10px;
    border: 2px solid #000;
  }
}
</style>
