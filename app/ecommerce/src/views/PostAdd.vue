<template>
  <div class="post-add-container">
    <Toolbar> Poster une annonce </Toolbar>
    <div
      class="post-add-container__items"
      :style="{ marginLeft: sideBarClosed ? '115px' : '300px' }"
    >
      <div>
        <PostCreate @reset-post="resetPost"></PostCreate>

        <PostCreated
          v-if="state.showCreatedPost"
          :currentPost="state.post"
        ></PostCreated>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, watch } from "vue";
import Toolbar from "../components/Toolbar/Toolbar.vue";
import PostCreate from "../components/Posts/PostCreate/PostCreate.vue";
import PostCreated from "../components/Posts/PostCreated.vue";
import { inject } from "vue";
import { useStore } from "vuex";

const state = reactive({
  post: null,
  showCreatedPost: true,
});
const sideBarClosed = inject("collapsed");
const store = useStore();

function resetPost() {
  state.showCreatedPost = false;
}
function checkPost(value) {
  return value["title"] !== null ? (state.post = value) : (state.post = null);
}

const currentPost = computed(() => store.state.currentPost);

watch(currentPost, (newValue) => {
  checkPost(newValue);
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
