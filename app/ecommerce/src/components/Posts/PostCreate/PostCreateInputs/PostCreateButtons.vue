<template>
  <div class="post-create__created-button-wrapper" v-if="props.isAddCreated">
    <button class="post-create__button" @click.prevent="$emit('submitAdd')">
      Valider
    </button>
    <br />
    <button class="post-create__cancel-button" @click="$emit('resetAdd')">
      Annuler
    </button>
  </div>
  <div v-else class="post-create__button-wrapper">
    <button
      class="post-create__button"
      :class="{
        'post-create__button--disabled': isCreateAddButtonDisabled,
      }"
      @click="$emit('createAdd', props.add)"
      :disabled="isCreateAddButtonDisabled"
    >
      Créer
    </button>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import addFormValidation from "@/modules/formValidation";
import createAddButtonState from "@/modules/isCreateAddButtonDisabled";

const props = defineProps(["isAddCreated", "add"]);

const { errors } = addFormValidation();
const { isCreateAddButtonDisabled } = createAddButtonState(props.add, errors);
</script>

<style lang="scss" scoped>
.post-create {
  &__created-button-wrapper {
    display: flex;
    justify-content: space-evenly;
  }
  &__button-wrapper {
    text-align: center;
  }
  &__button {
    padding: 10px;
    font-weight: 600;
    color: #4f95ff;
    background: #fff;
    border-radius: 5px;
    border: 2px solid #000;
    cursor: pointer;
    &:hover {
      color: #fff;
      background: #4f95ff;
    }
    &--disabled {
      color: #000;
      cursor: not-allowed;
      background: none;
      &:hover {
        color: #000;
        background: red;
        border: 2px solid #000;
      }
    }
  }
  &__cancel-button {
    padding: 10px;
    font-weight: 600;
    color: red;
    background: #fff;
    border-radius: 5px;
    border: 2px solid red;
    cursor: pointer;
    &:hover {
      color: #000;
      background: red;
    }
  }
}
</style>
