<template>
  <div class="post-create-description">
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
    <div class="post-create-description__errors" v-if="errors.description">
      {{ errors.description }}
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
    const { validateDescriptionField, errors } = addFormValidation();
    const validateInput = () => {
      validateDescriptionField("description", input.value);
    };
    const storeDescription = computed(
      () => store.state.currentPost.description
    );
    watch(storeDescription, (newValue) => {
      if (!newValue) input.value = "";
      validateInput();
    });
    return {
      input,
      errors,
      validateInput,
      storeDescription,
    };
  },
};
</script>
<style lang="scss" scoped>
.post-create-description {
  width: 100%;
  margin: auto;
  height: 130px;

  textarea {
    width: 100%;
    padding: 5px 10px;
    border: 2px solid #000;
  }
  &__errors {
    color: rgb(229, 23, 23);
  }
}
</style>
