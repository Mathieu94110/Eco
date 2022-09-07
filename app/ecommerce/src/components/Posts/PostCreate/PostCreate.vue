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

<script setup>
import { reactive, defineProps } from "vue";
import PostCreateImage from "@/components/Posts/PostCreate/PostCreateInputs/PostCreateImage";
import PostCreateTitle from "@/components/Posts/PostCreate/PostCreateInputs/PostCreateTitle";
import PostCreateDescription from "@/components/Posts/PostCreate/PostCreateInputs/PostCreateDescription";
import PostCreatePrice from "@/components/Posts/PostCreate/PostCreateInputs/PostCreatePrice";
import PostCreateCategory from "@/components/Posts/PostCreate/PostCreateInputs/PostCreateCategory";
import PostCreateButtons from "@/components/Posts/PostCreate/PostCreateInputs/PostCreateButtons";

const add = reactive({
  image: null,
  title: "",
  description: "",
  price: null,
  category: "",
});
const props = defineProps(["isAddCreated"]);
</script>

<style lang="scss" scoped>
.post-create {
  display: flex;
  justify-content: center;
  align-items: center;
  &__form {
    width: 320px;
    background: #dbe0dc;
    padding: 20px;
    overflow-wrap: break-word;
    text-shadow: 0px 2px 2px #bbbbbb;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    border-radius: 20px;
    font-size: 15px;
  }
}
</style>
