<script setup lang="ts">
import { defineProps } from "vue";
import addFormValidation from "@/modules/formValidation";
import createAddButtonState from "@/modules/isCreateAddButtonDisabled";
import type { UserAddInterface } from "@/shared/interfaces";

const props = defineProps<{
  isAddCreated: boolean;
  add: UserAddInterface;
}>();
const { errors } = addFormValidation();
const { isCreateAddButtonDisabled } = createAddButtonState(props.add, errors);

const emit = defineEmits<{
  (e: "submitAdd"): void;
  (e: "resetAdd"): void;
  (e: "createAdd", add: UserAddInterface): void;
}>();
</script>

<template>
  <div class="post-create__created-button-wrapper" v-if="props.isAddCreated">
    <button
      class="btn btn-success"
      data-test="submit-button"
      @click.prevent="emit('submitAdd')"
    >
      <span class="font-600">Valider</span>
    </button>
    <br />
    <button
      class="btn btn-danger"
      data-test="cancel-button"
      @click="emit('resetAdd')"
    >
      <span class="font-600">Annuler</span>
    </button>
  </div>
  <div v-else class="post-create__button-wrapper">
    <button
      class="btn btn-primary"
      :class="{
        'btn-disabled': isCreateAddButtonDisabled,
      }"
      @click="emit('createAdd', props.add)"
      :disabled="isCreateAddButtonDisabled"
      id="create-button"
    >
      <span class="font-600">Créer</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.post-create {
  &__created-button-wrapper {
    display: flex;
    justify-content: space-evenly;
  }
  &__button-wrapper {
    text-align: center;
  }
}
</style>
