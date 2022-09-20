<template>
  <div class="post-create-price">
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
    <div class="post-create-price__errors" v-if="errors.price">
      {{ errors.price }}
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
      validatePriceField("price", input.value);
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
@use "../../../../assets/scss/mixins" as m;
.post-create-price {
  width: 100%;
  margin: auto;
  height: 47px;
  input {
    width: 100%;
    padding: 5px 10px;
    border: 2px solid #000;
  }
  &__errors {
    color: rgb(229, 23, 23);
  }
}
@include m.sm {
  .post-create-price {
    height: 80px;
  }
}
</style>
