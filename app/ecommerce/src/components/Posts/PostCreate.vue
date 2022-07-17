<template>
  <div class="card">
    <form class="card__post-form" @submit="checkForm" method="post">
      <button class="btn btn-info" @click="onPickFile">
        Ajoutez une image
      </button>
      <input
        type="file"
        style="display: none"
        ref="fileInput"
        accept="image/*"
        @change="onFilePicked"
      />

      <div
        style="
          height: 40px;
          margin: 20px 0px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        "
      >
        <label for="name">Titre</label>
        <input
          class="form-field"
          id="title"
          v-model="title"
          type="text"
          name="title"
          placeholder="Titre de l'annonce"
        />
      </div>

      <div
        style="
          height: 60px;
          margin: 20px 0px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        "
      >
        <label for="name">Détails</label>
        <textarea
          class="form-field"
          id="details"
          v-model="details"
          type="text"
          name="details"
          placeholder="Détails de l'annonce"
        ></textarea>
      </div>

      <div class="card__buttons-wrapper" v-if="isCreate">
        <input class="card__buttons" type="submit" value="Envoyer" />
        <br />
        <button class="card__buttons" @click="cancelPost">Annuler</button>
      </div>
      <div class="card__buttons-wrapper" v-else>
        <button class="card__buttons" type="submit" value="Envoyer">
          Créer
        </button>
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
      posts: [],
      postsUpdated: [],
      title: "",
      details: "",
      isCreate: false,
      image: null,
    };
  },
  methods: {
    checkForm: function (e) {
      e.preventDefault();
      this.$store
        .dispatch("createPost", {
          title: this.title,
          details: this.details,
        })
        .then(async (res) => {
          this.isCreate = !this.isCreate;
          if (res.status === 201) {
            let response = axios.get("http://localhost:3000/api/posts");
            console.log("getPosts =", response);
          }
        });
    },
    cancelPost() {
      this.isCreate = !this.isCreate;
      this.$emit("resetPost");
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      // let filename = files[0].name;
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    },
  },
  mounted() {
    console.log(this.missingFields);
  },
  computed: {
    missingFields() {
      return (
        this.title === "" ||
        this.details === "" ||
        (this.title === "" && this.details === "")
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: 700;
  color: #181818;
  &__post-form {
    width: 300px;
    margin: 20px;
    padding: 20px;
    font-size: 20px;
    text-align: center;
    text-shadow: 0px 2px 2px #bbbbbb;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    border-radius: 5%;
  }
  &__buttons-wrapper {
    display: flex;
    justify-content: space-evenly;
  }
  &__buttons {
    align-items: center;
    background-color: #fff;
    border: 2px solid #000;
    box-sizing: border-box;
    color: #000;
    cursor: pointer;
    display: inline-flex;
    fill: #000;
    font-family: Inter, sans-serif;
    font-size: 16px;
    font-weight: 600;
    height: 30px;
    justify-content: center;
    letter-spacing: -0.8px;
    line-height: 24px;
    min-width: 60px;
    outline: 0;
    padding: 0 4px;
    text-align: center;
    text-decoration: none;
    transition: all 0.3s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;

    &:focus {
      color: #171e29;
    }

    &:hover {
      border-color: #06f;
      color: #06f;
      fill: #06f;
    }

    &:active {
      border-color: #06f;
      color: #06f;
      fill: #06f;
    }
  }
  .form-field {
    display: block;
    width: 100%;
    padding: 8px 16px;
    line-height: 25px;
    font-size: 14px;
    font-weight: 500;
    font-family: inherit;
    border-radius: 6px;
    -webkit-appearance: none;
    color: var(--input-color);
    border: 1px solid var(--input-border);
    background: var(--input-background);
    transition: border 0.3s ease;
    &::placeholder {
      color: var(--input-placeholder);
    }
    &:focus {
      outline: none;
      border-color: var(--input-border-focus);
    }
  }
}
</style>
