<template>
  <div class="post-create-title">
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
    <div class="post-create-title__errors" v-if="errors.title">
      {{ errors.title }}
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
      validateTitleField("title", input.value);
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
@use "../../../../assets/scss/mixins" as m;
.post-create-title {
  width: 100%;
  margin: auto;
  height: 46px;
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
  .post-create-title {
    height: 80px;
  }
}
</style>
