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
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import addFormValidation from "@/modules/formValidation";
export default {
  setup() {
    let input = ref("");
    const store = useStore();
    const { validateTitleField, errors } = addFormValidation();
    const validateInput = () => {
      validateTitleField("titre", input.value);
    };
    const storeTitle = computed(() => store.state.currentPost.title);
    watch(storeTitle, (newValue) => {
      if (!newValue) input.value = "";
      validateInput();
    });
    return { input, errors, validateInput, storeTitle };
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
