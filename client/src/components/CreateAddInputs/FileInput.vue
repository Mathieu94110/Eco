<script lang="ts">
import { reactive, ref, computed, watch } from "vue";
import { useStore } from "vuex";
import mysteryImage from "../../assets/images/mystery-image.png";

export default {
  setup(props, { emit }) {
    const state = reactive({
      currentImage: mysteryImage,
    });

    const fileInput = ref(null) as any;
    const store = useStore();
    const storeImage = computed(() => store?.state.currentPost.image);
    watch(storeImage, (newValue) => {
      if (!newValue) state.currentImage = mysteryImage;
      fileInput.value.value = "";
    });
    const onPickFile = (): void => {
      const file =
        fileInput.value && fileInput.value?.files ? fileInput.value.files : "";
      if (file && file[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          state.currentImage = e.target ? e.target.result : "";
        };
        reader.readAsDataURL(file[0]);
      }
    };
    watch(
      () => state.currentImage,
      (newValue) => {
        emit("update:modelValue", newValue),
        {
          flush: "post",
        };
      },
    );
    return {
      fileInput,
      onPickFile,
      state,
      storeImage,
    };
  },
};
</script>

<template>
  <div class="field">
    <div class="card">
      <div class="card__image" :style="{ 'background-image': `url(${state.currentImage})` }"></div>
      <label for="image">
        <input v-bind="$attrs" id="image" name="image" accept="image/*" ref="fileInput" type="file" @input="onPickFile" />
      </label>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../../assets/scss/mixins" as m;

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
