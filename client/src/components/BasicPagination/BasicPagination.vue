<template>
  <div class="basic-pagination">
    <button type="button" class="basic-pagination-left" :disabled="props.prevPage === null" @click="pagePrevHandler">
      <i class="fa-solid fa-arrow-left"></i> Précédent
    </button>
    <button type="button" class="basic-pagination-right" :disabled="props.nextPage === null" @click="pageNextHandler">
      Suivant <i class="fa-solid fa-arrow-right"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps<{
  nextPage: string | null;
  prevPage: string | null;
  currentPage: Number;
}>();
const emit = defineEmits(["pageHandler"]);

const pagePrevHandler = () => {
  if (prev !== null) emit("pageHandler", prev.value);
};
const pageNextHandler = () => {
  if (next !== null) emit("pageHandler", next.value);
};

const prev = computed<Number | null>(() => (props.prevPage ? Number(props.currentPage) - 1 : null));
const next = computed<Number | null>(() => (props.nextPage ? Number(props.currentPage) + 1 : null));
</script>

<style scoped lang="scss">
.basic-pagination {
  margin-top: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  &-left,
  &-right {
    padding: 6px;
    font-size: 12px;
    margin: 0 8px 0 0;
    letter-spacing: 2px;
    font-weight: 600;
    color: var(--secondary-2);
  }
}
@media screen and (min-width: 600px) {
  .basic-pagination {
    margin-top: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    &-left,
    &-right {
      margin: 0 16px;
      padding: 8px;
      font-size: 16px;
    }
  }
}
</style>
