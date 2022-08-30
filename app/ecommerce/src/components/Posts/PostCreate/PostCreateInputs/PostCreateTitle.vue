<template>
  <div class="field">
    <div>
      <input
        type="text"
        placeholder="Titre"
        autocomplete="off"
        @input="$emit('update:modelValue', $event.target.value)"
        v-model="input"
        @keyup="validateInput"
        @blur="validateInput"
      />
    </div>
    <div class="ui basic label pointing red" v-if="errors.titre">
      {{ errors.titre }}
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import addFormValidation from "@/modules/formValidation";
export default {
  setup() {
    let input = ref("");
    const { validateTitleField, errors } = addFormValidation();
    const validateInput = () => {
      validateTitleField("titre", input.value);
    };

    return { input, errors, validateInput };
  },
};
</script>
<style lang="scss" scoped>
.field {
  width: 100%;
  margin: auto;
  height: 80px;
  input {
    width: 100%;
    padding: 5px 10px;
    border: 2px solid #000;
  }
}
</style>
