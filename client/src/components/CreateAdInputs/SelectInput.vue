<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseSelect",
  props: {
    label: {
      type: String,
      default: null,
    },
    options: {
      type: Array,
      default: () => [],
    },
    errors: {
      type: Array,
      default: () => [],
    },
    isValidData: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedValue: "",
    };
  },
  methods: {
    changeHandler(e: Event) {
      const target = e.target as HTMLInputElement;
      this.$emit("update:modelValue", target.value);
    },
  },
});
</script>

<template>
  <div class="select-input">
    <label class="mb-1">{{ label }}</label>
    <select
      class="select-input__select"
      :class="{ 'select-input__select--valid': isValidData }"
      :placeholder="label"
      @change="changeHandler"
      v-bind="$attrs"
      :value="$attrs.modelValue"
    >
      <option value="">Choisissez une catégorie</option>
      <option v-for="(option, index) in options" :key="label + index" :value="option">
        {{ option }}
      </option>
    </select>
    <div class="select-input__invalid-feedback mb-2">
      <span v-for="(error, index) in errors" :key="`error-${label}-${index}`">
        {{ error.$message }}
      </span>
    </div>
  </div>
</template>

<style lang="scss">
.select-input {
  &__select {
    word-wrap: normal;
    display: block;
    width: 100%;
    padding: 0.375rem 2.25rem 0.375rem 0.75rem;
    -moz-padding-start: calc(0.75rem - 3px);
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 16px 12px;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    text-transform: capitalize !important;

    &--valid {
      border-color: #198754;
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3E%3C/svg%3E");
    }
  }
  &__invalid-feedback {
    display: block;
    font-size: 12px;
    height: 18px;
    margin-bottom: 0.5rem !important;
  }
}
</style>
