<template>
  <section class="post-create">
    <form class="post-create__form" @submit.prevent="checkForm">
      <PostCreateImage v-model="add.image" />
      <PostCreateTitle v-model="add.title" />
      <PostCreateDescription v-model="add.description" />
      <PostCreatePrice v-model="add.price" />
      <PostCreateCategory v-model="add.category" />

      <div class="post-create__created-button-wrapper" v-if="isAddCreated">
        <input type="submit" class="post-create__button" value="Envoyer" />
        <br />
        <button class="post-create__cancel-button" @click="reset">
          Annuler
        </button>
      </div>
      <div v-else class="post-create__button-wrapper">
        <button
          class="post-create__button"
          :class="{
            'post-create__button--disabled': isCreateAddButtonDisabled,
          }"
          @click="createPost"
          :disabled="isCreateAddButtonDisabled"
        >
          Créer
        </button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import PostCreateImage from "@/components/Posts/PostCreate/PostCreateInputs/PostCreateImage";
import PostCreateTitle from "@/components/Posts/PostCreate/PostCreateInputs/PostCreateTitle";
import PostCreateDescription from "@/components/Posts/PostCreate/PostCreateInputs/PostCreateDescription";
import PostCreatePrice from "@/components/Posts/PostCreate/PostCreateInputs/PostCreatePrice";
import PostCreateCategory from "@/components/Posts/PostCreate/PostCreateInputs/PostCreateCategory";
import addFormValidation from "@/modules/formValidation";
import createAddButtonState from "@/modules/isCreateAddButtonDisabled";
import { useForm } from "vee-validate";
import { inject } from "vue";
import { defineEmits } from "vue";

const initialAdd = {
  image: null,
  title: "",
  description: "",
  price: null,
  category: "",
};

const add = reactive({
  image: null,
  title: "",
  description: "",
  price: null,
  category: "",
});

const store = useStore();
const { errors } = addFormValidation();
const { isCreateAddButtonDisabled } = createAddButtonState(add, errors);
const toastMsg = inject("toastMsg");
const resetEmit = defineEmits(["resetPost"]);

let isAddCreated = ref(false);

const createPost = () => {
  store
    .dispatch("createPost", {
      title: add.title,
      description: add.description,
      category: add.category,
      price: add.price,
      image: add.image,
    })
    .then(() => {
      isAddCreated.value = true;
    })
    .catch((err) => {
      this.toast(err);
    });
};

const { handleSubmit } = useForm();

const checkForm = handleSubmit(() => {
  store.dispatch("sendPost").then(() => {
    toastMsg("L'annonce a bien été postée!", "success");
  });
  setTimeout(() => {
    window.location.reload();
  }, 2000);
});

const reset = () => {
  store.dispatch("resetForm", initialAdd).then(() => {
    isAddCreated.value = false;
    resetEmit("resetPost");
    toastMsg("L'annonce a bien été annulée !", "info");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  });
};
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

  &__created-button-wrapper {
    display: flex;
    justify-content: space-evenly;
  }
  &__button-wrapper {
    text-align: center;
  }
  &__button {
    padding: 10px;
    font-weight: 600;
    color: #4f95ff;
    background: #fff;
    border-radius: 5px;
    border: 2px solid #000;
    cursor: pointer;
    &:hover {
      color: #fff;
      background: #4f95ff;
    }
    &--disabled {
      color: #000;
      cursor: not-allowed;
      background: none;
      &:hover {
        color: #000;
        background: red;
        border: 2px solid #000;
      }
    }
  }
  &__cancel-button {
    padding: 10px;
    font-weight: 600;
    color: red;
    background: #fff;
    border-radius: 5px;
    border: 2px solid red;
    cursor: pointer;
    &:hover {
      color: #000;
      background: red;
    }
  }
}
</style>
