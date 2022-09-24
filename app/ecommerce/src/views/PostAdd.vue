<template>
  <div class="post-add-container">
    <Toolbar> Poster une annonce </Toolbar>
    <div
      class="post-add-container__items"
      :style="{
        marginLeft: isMobile ? 'auto' : sideBarClosed ? '115px' : '300px',
      }"
    >
      <div class="post-add-container__items-wrapper">
        <PostCreate
          :isAddCreated="isAddCreated"
          @create-add="createAdd"
          @submit-add="submitAdd"
          @reset-add="resetAdd"
        ></PostCreate>
        <Transition name="nested">
          <PostCreated
            v-if="state.showCreatedPost"
            :currentPost="state.post"
          ></PostCreated>
        </Transition>
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
const isAddCreated = ref(false);

const currentUser = computed(() => {
  return store.state.user.userId;
});
const isMobile = computed(() => {
  return store.state.windowWidth < 575;
});

function createAdd(add) {
  store
    .dispatch("createPost", {
      author: currentUser.value,
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
        author: "",
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
      author: "",
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
@use "../assets/scss/mixins" as m;
.post-add-container {
  align-items: center;
  display: block;

  &__items {
    display: block;
    margin: 0;
    height: 100%;
    color: #181818;
    font-weight: 700;
    div:first-child {
      display: block;
    }
    &-wrapper {
      display: block;
      height: 100%;
    }
  }
}

@include m.md {
  .post-add-container {
    height: 100%;
    width: 100%;
    align-items: center;
    &__items {
      height: calc(100% - 60px);
      div:first-child {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
      }
    }
  }
}
//Transition
.nested-enter-active,
.nested-leave-active {
  transition: all 0.4s ease-in-out;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>
