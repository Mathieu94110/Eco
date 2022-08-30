<template>
  <div class="field">
    <div>
      <textarea
        placeholder="Renseigner une description"
        autocomplete="off"
        @input="$emit('update:modelValue', $event.target.value)"
        v-model="input"
        @keyup="validateInput"
        @blur="validateInput"
      ></textarea>
    </div>
    <div v-if="errors.description">
      {{ errors.description }}
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import addFormValidation from "@/modules/formValidation";
export default {
  setup() {
    let input = ref("");
    const { validateDescriptionField, errors } = addFormValidation();
    const validateInput = () => {
      validateDescriptionField("description", input.value);
    };
    return { input, errors, validateInput };
  },
};
</script>
<style lang="scss" scoped>
.field {
  width: 100%;
  margin: auto;
  height: 130px;

  textarea {
    width: 100%;
    padding: 5px 10px;
    border: 2px solid #000;
  }
}
</style>
