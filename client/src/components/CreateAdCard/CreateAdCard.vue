<script lang="ts">
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import FileInput from "@/components/CreateAdInputs/FileInput.vue";
import TextInputs from "@/components/CreateAdInputs/TextInputs.vue";
import SelectInput from "@/components/CreateAdInputs/SelectInput.vue";
import ActionInputs from "@/components/CreateAdInputs/ActionInputs.vue";
import type { UserAdInterface } from "@/types";

export default {
  components: {
    FileInput,
    TextInputs,
    SelectInput,
    ActionInputs,
  },
  emits: ["create-ad", "submit-ad", "cancel-ad"],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      categories: [],
      formData: {} as UserAdInterface,
      isAdCreated: false,
      isInputsDisabled: false,
    };
  },

  validations() {
    return {
      formData: {
        title: { required, minLength: minLength(4) },
        description: { required, minLength: minLength(10) },
        price: { required, Number },
        category: { required },
      },
    };
  },

  methods: {
    createAd() {
      this.$emit("create-ad", this.$data.formData);
      this.$data.isAdCreated = true;
      this.$data.isInputsDisabled = true;
    },
    submitAd() {
      this.$emit("submit-ad");
      this.$data.isAdCreated = false;
      this.reset();
    },
    cancelAd() {
      this.$emit("cancel-ad");
      this.$data.isAdCreated = false;
      this.reset();
    },
    reset() {
      Object.assign(this.$data.formData, {
        image: "",
        title: "",
        description: "",
        price: null,
        category: "",
      });
      this.v$.$reset();
      this.$data.isInputsDisabled = false;
    },
  },
};
</script>

<template>
  <div class="create-ad-card" data-cy="create-ad-card">
    <div class="create-ad-card__card">
      <div class="create-ad-card__card-content">
        <FileInput v-model="formData.image" :disabled="$data.isInputsDisabled" />
        <TextInputs label="Titre" v-model="v$.formData.title.$model" :errors="v$.formData.title.$errors"
          :is-valid-data="!v$.formData.title.$invalid" :disabled="$data.isInputsDisabled" data-cy="create-ad-title" />
        <TextInputs label="Description" v-model="v$.formData.description.$model"
          :errors="v$.formData.description.$errors" :is-valid-data="!v$.formData.description.$invalid"
          :disabled="$data.isInputsDisabled" data-cy="create-ad-description" />
        <TextInputs label="Prix" v-model="v$.formData.price.$model" :errors="v$.formData.price.$errors"
          :is-valid-data="!v$.formData.price.$invalid" type="number" :disabled="$data.isInputsDisabled"
          data-cy="create-ad-price" />
        <SelectInput label="Catégorie" v-model="v$.formData.category.$model" :errors="v$.formData.category.$errors"
          :is-valid-data="!v$.formData.category.$invalid" :options="categories" :disabled="$data.isInputsDisabled"
          data-cy="create-ad-category" />
        <div class="text-center">
          <ActionInputs data-cy="create-ad-button" :ad="$data.formData" :is-ad-created="$data.isAdCreated"
            :disabled="v$.$invalid" @create-ad="createAd" @submit-ad="submitAd" @cancel-ad="cancelAd" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../../assets/scss/mixins" as m;

.create-ad-card {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  &__card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
    flex: 0 0 auto;
    width: 500px;
    padding: 2rem;
  }

  &__card-content {
    flex: 1 1 auto;
    padding: 1rem 1rem;
  }
}

@include m.xs-lg {
  .create-ad-card {
    margin: 20px 0px;

    &__card {
      width: auto;
      margin: 1rem;
      padding: 0;
    }
  }
}
</style>
