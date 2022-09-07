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
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import addFormValidation from "@/modules/formValidation";
export default {
  setup() {
    let input = ref();
    const store = useStore();
    const { validatePriceField, errors } = addFormValidation();
    const validateInput = () => {
      validatePriceField("prix", input.value);
    };
    const storePrice = computed(() => store.state.currentPost.price);
    watch(storePrice, (newValue) => {
      if (!newValue) input.value = "";
      validateInput();
    });
    return { input, errors, validateInput, storePrice };
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
