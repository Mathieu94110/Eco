<template>
  <div class="post-create__created-button-wrapper" v-if="props.isAddCreated">
    <button class="btn btn-success" @click.prevent="$emit('submitAdd')">
      Valider
    </button>
    <br />
    <button class="btn btn-danger" @click="$emit('resetAdd')">Annuler</button>
  </div>
  <div v-else class="post-create__button-wrapper">
    <button
      class="btn btn-primary"
      :class="{
        'btn-disabled': isCreateAddButtonDisabled,
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
}
</style>
