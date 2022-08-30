<template>
  <div class="field">
    <div class="card">
      <div
        v-if="state.currentImage"
        class="card__image"
        :style="{ 'background-image': `url(${state.currentImage})` }"
      ></div>

      <input
        id="image"
        name="image"
        accept="image/*"
        ref="fileInput"
        type="file"
        @input="onPickFile"
      />
    </div>
    <div class="ui basic label pointing red" v-if="errors.image">
      {{ errors.image }}
    </div>
  </div>
</template>

<script>
import { reactive, ref, watch } from "vue";
import addFormValidation from "@/modules/formValidation";
import mysteryImage from "../../../../assets/mystery-image.png";

export default {
  name: "PostCreateImage",
  setup(props, { emit }) {
    const state = reactive({
      currentImage: mysteryImage,
    });

    const fileInput = ref(null);

    const { validateNameField, errors } = addFormValidation();
    const validateInput = () => {
      validateNameField("image", fileInput.value);
    };

    const onPickFile = () => {
      let file = fileInput.value.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          state.currentImage = e.target.result;
        };

        reader.readAsDataURL(file[0]);
      }
    };
    watch(
      () => state.currentImage,
      (newValue) => {
        emit("update:modelValue", newValue);
      },
      emit("update:modelValue", state.currentImage),
      {
        flush: "post",
      }
    );
    return { fileInput, onPickFile, errors, state, validateInput };
  },
};
</script>
<style lang="scss" scoped>
.card {
  display: block;
  margin-bottom: 20px;
  &__image {
    width: 200px;
    height: 200px;
    display: block;
    cursor: pointer;
    margin: 0 auto 14px;
    background-size: cover;
    background-position: center center;
  }
}
</style>
