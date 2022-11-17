<template>
  <div class="field">
    <div class="card">
      <div
        class="card__image"
        :style="{ 'background-image': `url(${state.currentImage})` }"
      ></div>
      <label for="image">
        <input
          id="image"
          name="image"
          accept="image/*"
          ref="fileInput"
          type="file"
          @input="onPickFile"
        />
      </label>
    </div>
    <div v-if="errors.image">
      {{ errors.image }}
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref, computed, watch } from "vue";
import { useStore } from "vuex";
import addFormValidation from "@/modules/formValidation";
import mysteryImage from "@/assets/images/mystery-image.png";

export default {
  name: "PostCreateImage",
  setup(props, { emit }) {
    const state = reactive({
      currentImage: mysteryImage,
    });

    const fileInput = ref(null);
    const store = useStore();
    const { validateNameField, errors } = addFormValidation();
    const validateInput = () => {
      validateNameField("image", fileInput.value);
    };
    const storeImage = computed(() => store?.state.currentPost.image);
    watch(storeImage, (newValue) => {
      if (!newValue) state.currentImage = mysteryImage;
      fileInput.value.value = "";
    });
    const onPickFile = () => {
      const file = fileInput.value.files;
      if (file && file[0]) {
        const reader = new FileReader();
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
    return {
      fileInput,
      onPickFile,
      errors,
      state,
      validateInput,
      storeImage,
    };
  },
};
</script>
<style lang="scss" scoped>
@use "../../../../assets/scss/mixins" as m;
.card {
  display: block;
  margin-bottom: 20px;
  input {
    font-size: 12px;
  }
  &__image {
    width: 100px;
    height: 100px;
    display: block;
    cursor: pointer;
    margin: 0 auto 14px;
    background-size: cover;
    background-position: center center;
  }
}
@include m.sm {
  .card {
    &__image {
      width: 160px;
      height: 160px;
    }
  }
}
</style>
