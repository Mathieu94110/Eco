<template>
  <div class="post-add-container">
    <Toolbar> Poster une annonce </Toolbar>
    <div class="post-add-container__items">
      <div>
        <PostCreate @reset-post="resetPost"></PostCreate>

        <PostCreated :currentPost="post"></PostCreated>
      </div>
    </div>
  </div>
</template>

<script>
import Toolbar from "../components/Toolbar/Toolbar.vue";
import PostCreate from "../components/Posts/PostCreate.vue";
import PostCreated from "../components/Posts/PostCreated.vue";
import { mapState } from "vuex";

export default {
  name: "PostAdd",
  components: {
    Toolbar,
    PostCreate,
    PostCreated,
  },
  data() {
    return {
      post: null,
      showCreatedPost: true,
    };
  },
  methods: {
    resetPost() {
      this.showCreatedPost = false;
    },
    checkPost(value) {
      return value["title"] !== null ? (this.post = value) : (this.post = null);
    },
  },
  computed: {
    ...mapState({
      currentPost: (state) => state.currentPost,
    }),
  },
  watch: {
    currentPost(newValue) {
      this.checkPost(newValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.post-add-container {
  height: 100vh;
  width: 100%;

  &__items {
    width: 100%;
    height: calc(100% - 60px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: 700;
    color: #181818;
    margin: 0 140px;

    div:first-child {
      display: flex;
      margin: 0 200px;
      justify-content: space-between;
    }
  }
}
</style>
