<template>
  <div class="basic-pagination">
    <button type="button" class="basic-pagination-left" :disabled="props.prevPage === null" @click="pagePrevHandler">
      <font-awesome-icon :icon="['fas', 'arrow-left']" /> Précédent
    </button>
    <button type="button" class="basic-pagination-right" :disabled="props.nextPage === null" @click="pageNextHandler">
      Suivant <font-awesome-icon :icon="['fas', 'arrow-right']" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

// Ajout des icônes dans la bibliothèque FontAwesome
library.add(faArrowLeft, faArrowRight);

const props = defineProps<{
  nextPage: string | null;
  prevPage: string | null;
  currentPage: Number;
}>();

const emit = defineEmits(["pageHandler"]);

const prev = computed<Number | null>(() => (props.prevPage ? Number(props.currentPage) - 1 : null));
const next = computed<Number | null>(() => (props.nextPage ? Number(props.currentPage) + 1 : null));

const pagePrevHandler = () => {
  if (prev.value !== null) emit("pageHandler", prev.value);
};

const pageNextHandler = () => {
  if (next.value !== null) emit("pageHandler", next.value);
};
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
    cursor: pointer;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    :deep(svg) {
      margin: 0 5px;
    }
  }
}

@media screen and (min-width: 600px) {
  .basic-pagination {

    &-left,
    &-right {
      margin: 0 16px;
      padding: 8px;
      font-size: 16px;
      background-color: var(--primary-1);
      color: #fff;
    }
  }
}
</style>
