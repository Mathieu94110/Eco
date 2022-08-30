<template>
  <div class="field">
    <div>
      <input
        type="number"
        placeholder="Prix"
        autocomplete="off"
        @input="$emit('update:modelValue', $event.target.value)"
        v-model="input"
        @keyup="validateInput"
        @blur="validateInput"
      />
    </div>
    <div v-if="errors.prix">
      {{ errors.prix }}
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import addFormValidation from "@/modules/formValidation";
export default {
  setup() {
    let input = ref();
    const { validatePriceField, errors } = addFormValidation();
    const validateInput = () => {
      validatePriceField("prix", input.value);
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
