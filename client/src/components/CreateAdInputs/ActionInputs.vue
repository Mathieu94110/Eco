<script setup lang="ts">
import { defineProps } from "vue";
import type { UserAdInterface } from "@/types";

const props = defineProps<{
  isAdCreated: boolean;
  ad: UserAdInterface;
}>();

const emit = defineEmits<{
  (e: "create-ad"): void;
  (e: "submit-ad"): void;
  (e: "cancel-ad"): void;
}>();
</script>

<template>
  <div v-if="props.isAdCreated" class="create-ad-buttons__after">
    <button
      class="btn btn-success"
      data-cy="validate-create-button"
      data-test="submit-button"
      @click="emit('submit-ad')"
    >
      <span class="font-600">Valider</span>
    </button>
    <br />
    <button class="btn btn-danger" data-cy="cancel-create-button" data-test="cancel-button" @click="emit('cancel-ad')">
      <span class="font-600">Annuler</span>
    </button>
  </div>
  <div v-else class="create-ad-buttons__before">
    <input
      type="button"
      value="Créer"
      class="btn btn-primary font-600"
      v-bind="$attrs"
      @click="emit('create-ad')"
      id="create-button"
    />
  </div>
</template>

<style lang="scss" scoped>
.create-ad-buttons {
  &__before {
    text-align: center;
  }
  &__after {
    display: flex;
    justify-content: space-evenly;
  }
}
</style>
