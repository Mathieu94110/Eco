<template>
  <div class="post-add-container">
    <Toolbar> Poster une annonce </Toolbar>
    <div class="post-add-container__items">
      <PostCreate @reset-post="resetPost"></PostCreate>

      <div class="card" v-show="currentPost">
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
    };
  },
  methods: {
    resetPost() {
      this.post = null;
    },
  },
  computed: {
    ...mapState({
      currentPost: (state) => state.currentPost,
    }),
  },
  watch: {
    currentPost(newValue) {
      this.post = JSON.parse(newValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.post-add-container {
  height: 100vh;
  width: 100%;

  &__items {
    height: 100%;
    display: flex;
    margin: 0 140px;
  }
}
</style>
