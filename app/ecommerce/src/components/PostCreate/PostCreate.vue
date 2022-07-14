<template>
  <div class="card">
    <form
      class="postAddForm"
      @submit="checkForm"
      method="post"
      style="
         {
          width: 344px;
        }
      "
    >
      <v-img src="../../assets/logo.png" height="200px" width="200px"></v-img>

      <p>
        <label for="name">Titre</label>
        <input
          id="title"
          v-model="title"
          type="text"
          name="title"
          placeholder="Titre de l'annonce"
        />
      </p>

      <p>
        <label for="name">Détails</label>
        <textarea
          id="details"
          v-model="details"
          type="text"
          name="details"
          placeholder="Détails de l'annonce"
        ></textarea>
      </p>

      <div>
        <button
          style="
             {
              background: purple;
            }
          "
        >
          Ajouter
        </button>

        <br />

        <input type="submit" value="Envoyer" />
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "PostCreate",
  data() {
    return {
      errors: [],
      posts: [],
      postsUpdated: [],
      title: "",
      details: "",
    };
  },
  methods: {
    checkForm: function (e) {
      e.preventDefault();

      this.errors = [];

      if (this.title === "") {
        this.errors.push("Le nom de l'article");
      } else {
        this.$store
          .dispatch("createPost", {
            title: this.title,
            details: this.details,
          })
          .then(async (res) => {
            if (res.status === 201) {
              axios
                .get("http://localhost:3000/api/posts")
                .map((postData) => {
                  return postData.posts.map((post) => {
                    return {
                      title: post.title,
                      details: post.content,
                      id: post._id,
                    };
                  });
                })

                .then((transformedPosts) => {
                  this.posts = transformedPosts;
                  this.postsUpdated.next([...this.posts]);
                });
            } else if (res.status === 400) {
              let errorResponse = await res.json();
              this.errors.push(errorResponse.error);
            }
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.postAddForm {
  width: 300px;
  height: 300px;
  background: beige;
}
</style>
