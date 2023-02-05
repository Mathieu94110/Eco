<script setup lang="ts">
import { defineProps } from "vue";
import type { UserAddInterface } from "@/shared/interfaces";

const props = defineProps<{
  isAddCreated: boolean;
  add: UserAddInterface;
}>();

const emit = defineEmits<{
  (e: "createAdd"): void;
  (e: "submitAdd"): void;
  (e: "cancelAdd"): void;
}>();
</script>

<template>
  <div v-if="props.isAddCreated" class="create-add-buttons__after">
    <button class="btn btn-success" data-test="submit-button" @click.prevent="emit('submitAdd')">
      <span class="font-600">Valider</span>
    </button>
    <br />
    <button class="btn btn-danger" data-test="cancel-button" @click="emit('cancelAdd')">
      <span class="font-600">Annuler</span>
    </button>
  </div>
  <div v-else class="create-add-buttons__before">
    <input type="button" value="Créer" class="btn btn-primary font-600" v-bind="$attrs" @click="emit('createAdd')"
      id="create-button" />
  </div>
</template>

<style lang="scss" scoped>
.create-add-buttons {
  &__after {
    display: flex;
    justify-content: space-evenly;
  }

  &__before {
    text-align: center;
  }
}
</style>
