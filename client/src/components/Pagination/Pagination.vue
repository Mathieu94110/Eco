<template>
  <div v-if="props.totalRecords > 0">
    <div class="pagination">
      <button class="btn btn-primary" @click="changePage(0)">&lt;&lt;</button>

      <button class="btn btn-primary" @click="changePage(-1)">&lt;</button>
      <span class="pagination__pages">
        {{
          isMobile
            ? `${state.page}/${pages}`
            : `Page ${state.page} sur  ${pages}`
        }}
      </span>
      <button class="btn btn-primary" @click="changePage(1)">></button>
      <button class="btn btn-primary" @click="changePage(pages)">>></button>
      <span class="pagination__seperator">|</span>

      {{ isMobile ? "Résultats:" : "Nombre de résultats:" }}
      <span
        class="pagination__quantity"
        :class="state.perPage === amount && 'active'"
        v-for="(amount, index) in props.perPageOptions"
        :key="index"
        @click="setPerPage(amount)"
        @keydown="setPerPage(amount)"
        >{{ amount }}</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, defineProps, defineEmits } from "vue";
import type { PageOptionsInterface } from "@/shared/interfaces";

const props = defineProps<{
  totalRecords: number;
  perPageOptions: number[];
  isMobile: boolean;
}>();

const state = reactive<{
  page: number;
  perPage: number;
}>({
  page: 1,
  perPage: props.perPageOptions[0],
});

const emit = defineEmits<{
  (e: "input", pageOptions: PageOptionsInterface): void;
}>();

const pages = computed<number>((): number => {
  const remainder = props.totalRecords % state.perPage;
  if (remainder > 0) {
    return Math.floor(props.totalRecords / state.perPage) + 1;
  }
  return props.totalRecords / state.perPage;
});

const setPerPage = (amount: number): void => {
  state.perPage = amount;
  emit("input", { page: state.page, perPage: amount });
};
const changePage = (val: number): void => {
  switch (val) {
    case 0:
      state.page = 1;
      break;
    case -1:
      state.page = state.page > 1 ? state.page - 1 : state.page;
      break;
    case 1:
      state.page = state.page < pages.value ? state.page + 1 : state.page;
      break;
    default:
      state.page = pages.value;
      break;
  }
  emit("input", { page: state.page, perPage: state.perPage });
};
</script>

<style lang="scss">
@use "../../assets/scss/mixins";
.pagination {
  max-width: 600px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  color: #444;
  font-weight: 400;
  margin-right: 20px;
  @include mixins.xs {
    font-size: 14px;
    margin-right: 0;
  }
  &__pages {
    display: flex;
    margin: 0px 10px;
    @include mixins.xs {
      margin: 0px 5px;
    }
  }
  &__seperator,
  &__quantity {
    font-size: 18px;
    font-weight: 300;
    color: #888;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 10px;
    @include mixins.xs {
      margin: 0px 5px;
      font-size: 14px;
    }
  }
  &__quantity {
    margin: 0px 5px;
    font-weight: 400;
    cursor: pointer;
    &.active {
      color: #2997ff;
    }
  }
  button {
    @include mixins.xs {
      padding: 4px 8px;
    }
  }
}
</style>
