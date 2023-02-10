<script setup lang="ts">
import { useStore } from "vuex";
import { reactive, computed } from "vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import type { UserInterface } from "@/shared/interfaces";

const state = reactive<{
  mode: string;
  currentImage: string | ArrayBuffer | null;
}>({
  mode: "create",
  currentImage: null,
});
const store = useStore();

const { handleSubmit, errors } = useForm({
  validationSchema: yup.object({
    userName: yup.string().min(4, "Le nom d'utilisateur doit contenir au moins 4 caractères").required("Le pseudo est requis"),
    firstName: yup.string().min(2, "Le prénom doit contenir au moins 2 caractères").required("Le prénom est requis"),
    lastName: yup.string().min(2, "Le nom doit contenir au moins 2 caractères").required("Le nom est requis"),
    phone: yup
      .string()
      .required("Le téléphone est requis")
      .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, "Le format est incorrect"),
    email: yup.string().required("L'émail est requis").email("L'émail indiqué est invalide"),
    address: yup.string().min(10, "L'adresse doit contenir au moins 10 caractères").required("L'adresse est requise"),
    zip: yup.string().required("Le code postal est requis").min(5, "Le code postal doit contenir au moins 5 caractères"),
    password: yup.string().min(4, "Le mot de passe doit contenir au moins 4 caractères").required("Le mot de passe est requis"),
  }),
});

const { value: userName } = useField("userName");
const { value: firstName } = useField("firstName");
const { value: lastName } = useField("lastName");
const { value: phone } = useField("phone");
const { value: email } = useField("email");
const { value: address } = useField("address");
const { value: zip } = useField("zip");
const { value: password } = useField("password");

const status = computed<string>(() => store?.state.status);

const emit = defineEmits<{
  (e: "signup", createCredentials: UserInterface): void;
  (e: "switch", value: string): void;
}>();
const switchComponent = (): void => {
  emit("switch", "login");
};

const createAccount = handleSubmit((values) => {
  const image = { image: state.currentImage };
  //On below we create a deep copy of current inputs values and we assign image to it, in order userInfos type to be accepted
  const userInfos = JSON.parse(JSON.stringify(Object.assign(image, values)));
  emit("signup", userInfos);
});

const onPickFile = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files) {
    const imageFile = target.files;
    if (!imageFile.length) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        state.currentImage = e.target.result;
      }
      return;
    };
    reader.readAsDataURL(imageFile[0]);
  }
};
</script>

<template>
  <form class="sign-up" @submit.prevent="createAccount">
    <div class="sign-up__title">
      <h1>Inscription</h1>
    </div>
    <header class="sign-up__subtitle">
      <p class="sign-up__subtitle-main">Tu as déjà un compte ?</p>
    </header>
    <nav class="sign-up__subtitle-secondary">
      <span class="sign-up__action" @click="switchComponent()" @keydown="switchComponent()">Se connecter</span>
    </nav>
    <div class="sign-up__file-input">
      <label for="image">
        <input id="image" name="image" accept="image/*" ref="fileInput" type="file" @change="onPickFile($event)" />
      </label>
    </div>

    <div class="sign-up__file-image">
      <div class="sign-up__file-image-imagePreviewed" :style="{ 'background-image': `url(${state.currentImage})` }"></div>
    </div>

    <main class="sign-up__main">
      <div class="d-flex flex-column">
        <label for="firstName">
          <input id="firstName" v-model="firstName" class="sign-up__form-input" type="text" placeholder="Prénom" />
        </label>
        <span class="sign-up__errors">{{ errors["firstName"] }}</span>
      </div>
      <div class="d-flex flex-column">
        <label for="lastName">
          <input id="lastName" v-model="lastName" class="sign-up__form-input" type="text" placeholder="Nom" />
        </label>
        <span class="sign-up__errors">{{ errors["lastName"] }}</span>
      </div>

      <div class="d-flex flex-column">
        <label for="phone">
          <input id="phone" v-model="phone" class="sign-up__form-input" type="number" placeholder="Téléphone" />
        </label>
        <span class="sign-up__errors">{{ errors["phone"] }}</span>
      </div>
      <div class="d-flex flex-column">
        <label for="email">
          <input id="email" v-model="email" class="sign-up__form-input" type="text" placeholder="Adresse mail" />
        </label>
        <span class="sign-up__errors">{{ errors["email"] }}</span>
      </div>

      <div class="d-flex flex-column">
        <label for="address">
          <input id="address" v-model="address" class="sign-up__form-input" type="text" placeholder="Adresse" />
        </label>
        <span class="sign-up__errors">{{ errors["address"] }}</span>
      </div>
      <div class="d-flex flex-column">
        <label for="zip">
          <input id="zip" v-model="zip" class="sign-up__form-input" type="number" placeholder="Code Postal" />
        </label>
        <span class="sign-up__errors">{{ errors["zip"] }}</span>
      </div>

      <div class="d-flex flex-column">
        <label for="userName">
          <input id="userName" v-model="userName" class="sign-up__form-input" type="text" placeholder="Pseudo" />
        </label>
        <span class="sign-up__errors">{{ errors["userName"] }}</span>
      </div>
      <div class="d-flex flex-column">
        <label for="password">
          <input id="password" v-model="password" class="sign-up__form-input" type="password" placeholder="Mot de passe" />
        </label>
        <span class="sign-up__errors">{{ errors["password"] }}</span>
      </div>
    </main>
    <div class="sign-up__footer">
      <button type="submit" class="btn btn-primary font-600">
        <span v-if="status === 'loading'">Création en cours...</span>
        <span v-else class="color-white">Créer mon compte</span>
      </button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.sign-up {
  height: auto;
  margin: 20px 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, minmax(25px, auto));
  grid-template-areas:
    "title"
    "subtitle-main"
    "subtitle-secondary"
    "file-input"
    "file-image"
    "main"
    "footer";

  background: var(--primary-color);
  border-radius: 16px;
  padding: 8px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  &__title {
    grid-area: title;
    text-align: center;
    color: #666;
    font-weight: 600;
    padding: 10px;
  }

  &__subtitle {
    grid-area: subtitle-main;
    color: #666;
    align-self: center;
    font-weight: 600;
    padding: 10px;

    &-main {
      text-align: center;
      color: #666;
      font-weight: 600;
      font-size: 20px;
    }
    &-secondary {
      grid-area: subtitle-secondary;

      align-self: center;
      text-align: center;
      color: #2196f3;
      font-weight: 600;
      font-size: 16px;
    }
  }

  &__button-disabled {
    background: #cecece;
    color: #ececec;
    &:hover {
      cursor: not-allowed;
      background: #cecece;
    }
  }
  &__form-input {
    padding: 8px;
    border: none;
    border-radius: 8px;
    background: #f2f2f2;
    font-weight: 500;
    font-size: 16px;
    flex: 1;
    min-width: 100px;
    color: #666;
  }
  &__action {
    text-align: center;
    color: #2196f3;
    text-decoration: underline;
    font-weight: 600;

    &:hover {
      cursor: pointer;
    }
  }
  &__file-input {
    grid-area: file-input;
    margin-top: 20px;
  }
  &__file-image {
    grid-area: file-image;
    width: 100%;
    display: flex;
    justify-content: center;
    &-imagePreviewed {
      width: 70px;
      height: 70px;
      margin: 10px 0;
      border-radius: 50%;
      display: block;
      cursor: pointer;
      background-size: cover;
      background-position: center center;
    }
  }

  &__main {
    grid-area: main;
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: minmax(50px, auto);
  }

  &__footer {
    grid-area: footer;
  }
  &__errors {
    max-width: 200px;
    color: red;
    font-weight: bold;
  }
}

@media screen and (min-width: 768px) {
  .sign-up {
    grid-template-areas:
      "title title title title title title"
      "subtitle-main subtitle-main subtitle-main subtitle-main subtitle-secondary subtitle-secondary"
      "file-input file-input file-input file-image  file-image  file-image"
      "main main main main main main "
      "footer footer footer footer footer footer";
    padding: 16px;
    &__subtitle-secondary {
      grid-area: subtitle-secondary;
      align-self: center;
      text-align: left;
      color: var(--primary-2);
      font-weight: 600;
      font-size: 20px;
      padding: 10px;
    }
    &__file-input {
      margin: 0px;
      align-self: center;
    }
    &__file-image-imagePreviewed {
      width: 100px;
      height: 100px;
      margin: 0;
    }

    &__main {
      grid-area: main;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: minmax(50px, auto);
      grid-gap: 20px;
    }
  }
}

@media screen and (min-width: 1024px) {
  .sign-up {
    &__main {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
}
</style>
