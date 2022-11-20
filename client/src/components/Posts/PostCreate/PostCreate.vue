<script setup lang="ts">
import { reactive, defineProps } from "vue";
import PostCreateImage from "@/components/Posts/PostCreate/PostCreateInputs/PostCreateImage.vue";
import PostCreateTitle from "@/components/Posts/PostCreate/PostCreateInputs/PostCreateTitle.vue";
import PostCreateDescription from "@/components/Posts/PostCreate/PostCreateInputs/PostCreateDescription.vue";
import PostCreatePrice from "@/components/Posts/PostCreate/PostCreateInputs/PostCreatePrice.vue";
import PostCreateCategory from "@/components/Posts/PostCreate/PostCreateInputs/PostCreateCategory.vue";
import PostCreateButtons from "@/components/Posts/PostCreate/PostCreateInputs/PostCreateButtons.vue";

const add = reactive<{
  image: string;
  title: string;
  description: string;
  price: number | null;
  category: string;
}>({
  image: "",
  title: "",
  description: "",
  price: null,
  category: "",
});

const props = defineProps<{
  isAddCreated: boolean;
}>();
</script>

<template>
  <section class="post-create">
    <form class="post-create__form">
      <PostCreateImage v-model="add.image" />
      <PostCreateTitle v-model="add.title" />
      <PostCreateDescription v-model="add.description" />
      <PostCreatePrice v-model="add.price" />
      <PostCreateCategory v-model="add.category" />
      <PostCreateButtons
        :add="add"
        :isAddCreated="props.isAddCreated"
        v-bind="$attrs"
      />
    </form>
  </section>
</template>

<style lang="scss" scoped>
@use "../../../assets/scss/mixins" as m;
.post-create {
  font-size: 0.8vw;
  display: flex;
  justify-content: center;
  align-items: center;
  &__form {
    width: 80%;
    background: #dbe0dc;
    padding: 10px;
    overflow-wrap: break-word;
    text-shadow: 0px 2px 2px #bbbbbb;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    border-radius: 20px;
    font-size: 15px;
    overflow-wrap: break-word;
    margin: 20px 0;
  }
}
@include m.sm {
  .post-create {
    font-size: 16px;
    &__form {
      width: 320px;
      padding: 20px;
      margin: 20px 0px;
    }
  }
}
</style>
