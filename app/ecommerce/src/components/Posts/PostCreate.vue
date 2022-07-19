<template>
  <form class="card" @submit="checkForm" method="post">
    <div>
      <div
        class="card__imagePreviewed"
        :style="{ 'background-image': `url(${currentImage})` }"
      ></div>
      <input ref="fileInput" type="file" @input="onPickFile" />
    </div>
    <div class="card__items">
      <label for="name">Titre</label>
      <input
        id="title"
        v-model="title"
        type="text"
        name="title"
        placeholder="Titre de l'annonce"
      />
    </div>

    <div class="card__items">
      <label for="name">Description</label>
      <textarea
        id="description"
        v-model="description"
        type="text"
        name="description"
        placeholder="Détails de l'annonce"
      ></textarea>
    </div>
    <div class="card__items">
      <label for="name">Prix</label>
      <input
        class="form-field"
        id="price"
        v-model="price"
        type="text"
        name="price"
        placeholder="Indiquez un prix"
      />
    </div>

    <div class="card__buttons-wrapper" v-if="isCreate">
      <input type="submit" value="Envoyer" />
      <br />
      <button @click="cancelPost">Annuler</button>
    </div>
    <div class="card__buttons-wrapper" v-else>
      <button @click="createPost" value="Envoyer">Créer</button>
    </div>
  </form>
</template>

<script>
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

export default {
  name: "PostCreate",
  data() {
    return {
      posts: [],
      postsUpdated: [],
      title: "",
      description: "",
      price: 0,
      isCreate: false,
      currentImage: null,
    };
  },
  setup() {
    const toast = (message) => {
      createToast(message);
    };
    return { toast };
  },
  methods: {
    createPost() {
      this.$store
        .dispatch("createPost", {
          image: this.currentImage,
          title: this.title,
          description: this.description,
          price: this.price,
        })
        .then(() => {
          this.isCreate = !this.isCreate;
        })
        .catch((err) => {
          this.toast(err);
        });
    },

    checkForm: function (e) {
      e.preventDefault();
      this.$store.dispatch("sendPost").then((res) => {
        console.log(res);
        this.toast("L'annonce a bien été postée!");
        this.cancelPost();
      });
    },
    cancelPost() {
      this.isCreate = !this.isCreate;
      this.currentImage = null;
      this.title = "";
      this.description = "";
      this.price = 0;
      this.$emit("resetPost");
      this.toast("L'annonce a été annulée!");
    },
    onPickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.currentImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
      }
    },
    mounted() {
      console.log(this.missingFields);
    },
    computed: {
      missingFields() {
        return (
          this.title === "" ||
          this.details === "" ||
          this.price === "" ||
          this.price === 0 ||
          this.currentImage === null
        );
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  height: 100%;
  width: 320px;
  padding: 20px;
  font-size: 20px;
  text-align: center;
  text-shadow: 0px 2px 2px #bbbbbb;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  border-radius: 20px;
  border: #616161 1px solid;

  &__imagePreviewed {
    width: 250px;
    height: 250px;
    display: block;
    cursor: pointer;
    margin: 0 auto 14px;
    background-size: cover;
    background-position: center center;
  }
  &__items {
    margin: 20px 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    input,
    textarea {
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
    textarea {
      margin-top: 10px;
      height: 60px;
    }
  }
  &__buttons-wrapper {
    display: flex;
    justify-content: space-evenly;

    input,
    button {
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
  }
}
</style>
