<template>
  <div class="post-add-container">
    <Toolbar> Poster une annonce </Toolbar>
    <div
      class="post-add-container__items"
      :style="{ marginLeft: sideBarClosed ? '115px' : '300px' }"
    >
      <div>
        <PostCreate
          :isAddCreated="isAddCreated"
          @create-add="createAdd"
          @submit-add="submitAdd"
          @reset-add="resetAdd"
        ></PostCreate>

        <PostCreated
          v-if="state.showCreatedPost"
          :currentPost="state.post"
        ></PostCreated>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, watch, ref } from "vue";
import Toolbar from "@/components/Toolbar/Toolbar.vue";
import PostCreate from "@/components/Posts/PostCreate/PostCreate.vue";
import PostCreated from "@/components/Posts/PostCreated.vue";
import { inject } from "vue";
import { useStore } from "vuex";

const state = reactive({
  post: null,
  showCreatedPost: true,
});

const toastMsg = inject("toastMsg");
const sideBarClosed = inject("collapsed");
const store = useStore();
let isAddCreated = ref(false);

function createAdd(add) {
  store
    .dispatch("createPost", {
      title: add.title,
      description: add.description,
      category: add.category,
      price: add.price,
      image: add.image,
    })
    .then(() => {
      state.showCreatedPost = true;
      state.post;
      isAddCreated.value = true;
    })
    .catch((err) => {
      this.toast(err);
    });
}
function submitAdd() {
  store
    .dispatch("sendPost")
    .then(() => {
      store.dispatch("resetForm", {
        image: "",
        title: "",
        description: "",
        price: null,
        category: "",
      });
    })
    .then(() => {
      isAddCreated.value = false;
      state.showCreatedPost = false;
      toastMsg("L'annonce a bien été postée!", "success");
    });
}

function resetAdd() {
  store
    .dispatch("resetForm", {
      image: "",
      title: "",
      description: "",
      price: null,
      category: "",
    })
    .then(() => {
      isAddCreated.value = false;
      state.showCreatedPost = false;
      toastMsg("L'annonce a bien été annulée !", "info");
    });
}

const currentPost = computed(() => store.state.currentPost);

watch(currentPost, (newValue) => {
  state.post = newValue;
});
</script>

<style lang="scss" scoped>
.post-add-container {
  height: 100vh;
  width: 100%;

  &__items {
    height: calc(100% - 60px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: 700;
    color: #181818;
    margin: 0 140px;

    div:first-child {
      display: flex;
      justify-content: space-evenly;
    }
  }
}
</style>
