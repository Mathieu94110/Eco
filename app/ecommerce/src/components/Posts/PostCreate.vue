<template>
  <Form
    ref="form"
    class="card"
    :validation-schema="createAddSchema"
    @submit="checkForm"
    v-slot="{ errors }"
  >
    <div>
      <div
        class="card__imagePreviewed"
        :style="{ 'background-image': `url(${currentImage})` }"
      ></div>

      <input
        id="image"
        name="image"
        accept="image/*"
        ref="fileInput"
        type="file"
        @input="onPickFile"
      />
    </div>
    <div class="card__items">
      <label for="name">Titre</label>
      <Field
        id="title"
        name="title"
        v-model="form.title"
        placeholder="Titre de l'annonce"
      />
      <span class="card__errors">{{ errors.title }}</span>
    </div>
    <div class="card__items">
      <label for="name">Description</label>
      <Field
        id="description"
        v-model="form.description"
        type="text"
        name="description"
        placeholder="Détails de l'annonce"
      />
      <span class="card__errors">{{ errors.description }}</span>
    </div>
    <div class="card__items">
      <label for="name">Catégorie</label>
      <Field name="field" as="select" v-model="selected">
        <option value="Informatique">Informatique</option>
        <option value="Téléphones, tablettes">Téléphones, tablettes</option>
        <option value="Électro">Électro</option>
        <option value="Rangements">Rangements</option>
        <option value="Vetements">Vetements</option>
        <option value="Cosmétiques">Cosmétiques</option>
        <option value="Vidéo, son">Vidéo, son</option>
        <option value="Auto, moto">Auto, moto</option>
        <option value="Autres">Autres</option>
      </Field>
    </div>
    <div class="card__items">
      <label for="name">Prix</label>

      <Field
        class="form-field"
        id="price"
        v-model="form.price"
        placeholder="Indiquez un prix"
        name="price"
        type="number"
      />
      <span class="card__errors">{{ errors.price }}</span>
    </div>

    <div class="card__buttons-wrapper" v-if="isCreate">
      <input type="submit" value="Envoyer" />
      <br />
      <button @click="reset()">Annuler</button>
    </div>
    <div class="card__buttons-wrapper" v-else>
      <button @click="createPost" value="Envoyer" :disabled="isDisabled">
        Créer
      </button>
    </div>
  </Form>
</template>

<script>
import { Form, Field } from "vee-validate";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

export default {
  name: "PostCreate",
  components: {
    Form,
    Field,
  },
  data() {
    const createAddSchema = {
      title: "required|title|minLength:2",
      description: "required|description|minLength:10",
      price: "required|minMax:1,9999",
    };
    return {
      createAddSchema,
      form: null,
      isCreate: false,
    };
  },
  created() {
    this.form = this.$store.state.currentPost;
  },
  setup() {
    const toast = (message) => {
      createToast(message);
    };
    return { toast };
  },
  methods: {
    createPost() {
      if (this.isDisabled || this.errors) {
        this.toast("Il manque des éléments pour la création de l'annonce!");
      } else {
        this.$store
          .dispatch("createPost", {
            title: this.form.title,
            description: this.form.description,
            category: this.selected,
            price: this.form.price,
            image: this.currentImage,
          })
          .then(() => {
            this.isCreate = !this.isCreate;
          })
          .catch((err) => {
            this.toast(err);
          });
      }
    },

    checkForm: function () {
      this.$store.dispatch("sendPost").then((res) => {
        this.toast("L'annonce a bien été postée!");
        this.reset();
      });
    },

    reset() {
      let formValues = this.form;
      Object.keys(formValues).forEach((key) => {
        formValues[key] = null;
      });
      this.$store.dispatch("resetForm", formValues).then(() => {
        this.isCreate = !this.isCreate;
        this.currentImage = null;
        document.getElementById("image").value = null;
        this.$emit("reset-post");
        this.toast("L'annonce a été annulée!");
      });
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
  },
  computed: {
    isDisabled: function () {
      return (
        !this.form.title ||
        !this.form.description ||
        !this.form.price ||
        this.errors
      );
    },
  },
  selected() {
    return this.form.field;
  },
  watch: {
    currentPost(newValue) {
      this.form = newValue;
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
    width: 200px;
    height: 200px;
    display: block;
    cursor: pointer;
    margin: 0 auto 14px;
    background-size: cover;
    background-position: center center;
  }
  &__items {
    margin: 10px 0px;
    height: 84px;
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
  &__errors {
    color: red;
    font-size: 14px;
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
