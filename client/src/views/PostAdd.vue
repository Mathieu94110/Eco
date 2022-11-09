<template>
  <div class="post-add-container">
    <Toolbar> Poster une annonce </Toolbar>
    <div
      class="post-add-container__items"
      :style="{
        marginLeft: isMobile < 575 ? '0px' : sideBarClosed ? '115px' : '300px',
      }"
    >
      <div class="post-add-container__items-wrapper">
        <PostCreate
          ref="post-create"
          :isAddCreated="isAddCreated"
          @create-add="createAdd"
          @submit-add="submitAdd"
          @reset-add="resetAdd"
        ></PostCreate>
        <Transition name="nested">
          <PostCreated
            v-if="state.showCreatedPost"
            :currentPost="state.post"
            ref="post-created"
          ></PostCreated>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  computed, reactive, watch, ref, inject,
} from 'vue';
import Toolbar from '@/components/Toolbar/Toolbar.vue';
import PostCreate from '@/components/Posts/PostCreate/PostCreate.vue';
import PostCreated from '@/components/Posts/PostCreated.vue';
import { useStore } from 'vuex';

const state = reactive({
  post: null,
  showCreatedPost: false,
});

const toastMsg = inject('toastMsg');
const sideBarClosed = inject('collapsed');

const store = useStore();
const isAddCreated = ref(false);

const currentUser = computed(() => store?.state.user.userId);
const isMobile = computed(() => store?.state.windowWidth < 575);

const postIsCreate = () => {
  state.showCreatedPost = true;
};

const createAdd = async (add) => {
  try {
    await store.dispatch('createPost', {
      author: currentUser.value,
      title: add.title,
      description: add.description,
      category: add.category,
      price: add.price,
      image: add.image,
    });

    postIsCreate();
    isAddCreated.value = true;
  } catch (e) {
    this.toast(e);
  }
};
const submitAdd = async () => {
  try {
    await store.dispatch('sendPost');
    await store.dispatch('resetForm', {
      author: '',
      image: '',
      title: '',
      description: '',
      price: null,
      category: '',
    });

    isAddCreated.value = false;
    state.showCreatedPost = false;
    toastMsg("L'annonce a bien été postée!", 'success');
  } catch (e) {
    console.error(e);
  }
};

const resetAdd = async () => {
  try {
    await store.dispatch('resetForm', {
      author: '',
      image: '',
      title: '',
      description: '',
      price: null,
      category: '',
    });

    isAddCreated.value = false;
    state.showCreatedPost = false;
    toastMsg("L'annonce a bien été annulée !", 'info');
  } catch (e) {
    console.error(e);
  }
};

const currentPost = computed(() => store?.state.currentPost);

watch(currentPost, (newValue) => {
  state.post = newValue;
});
</script>

<style lang="scss" scoped>
@use '../assets/scss/mixins' as m;
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
