<template>
  <div class="post-add-container">
    <Toolbar> Poster une annonce </Toolbar>
    <div>
      <PostCreate></PostCreate>
    </div>
  </div>
</template>

<script>
import Toolbar from "../components/Toolbar/Toolbar.vue";
import PostCreate from "../components/PostCreate/PostCreate.vue";
export default {
  name: "PostAdd",
  components: {
    Toolbar,
    PostCreate,
  },
  mounted: function () {},
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.post-add-container {
  height: 100%;
  width: 100%;
}
</style>
