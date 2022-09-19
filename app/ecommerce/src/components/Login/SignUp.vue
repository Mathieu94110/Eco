<template>
  <div class="sign-up">
    <div class="sign-up__title">
      <h1>Inscription</h1>
    </div>
    <header class="sign-up__subtitle">
      <p class="sign-up__subtitle-main">Tu as déjà un compte ?</p>
    </header>
    <nav class="sign-up__subtitle-secondary">
      <span class="sign-up__action" @click="switchComponent()"
        >Se connecter</span
      >
    </nav>
    <div class="sign-up__file-input">
      <input
        id="image"
        name="image"
        accept="image/*"
        ref="fileInput"
        type="file"
        @input="onPickFile"
      />
    </div>

    <div class="sign-up__file-image">
      <div
        class="sign-up__file-image-imagePreviewed"
        :style="{ 'background-image': `url(${state.currentImage})` }"
      ></div>
    </div>

    <main class="sign-up__main">
      <div>
        <input
          v-model="state.firstName"
          class="sign-up__form-input"
          type="text"
          placeholder="Prénom"
        />
      </div>
      <div>
        <input
          v-model="state.lastName"
          class="sign-up__form-input"
          type="text"
          placeholder="Nom"
        />
      </div>

      <div>
        <input
          v-model="state.phone"
          class="sign-up__form-input"
          type="number"
          placeholder="Téléphone"
        />
      </div>
      <div>
        <input
          v-model="state.email"
          class="sign-up__form-input"
          type="text"
          placeholder="Adresse mail"
        />
      </div>

      <div>
        <input
          v-model="state.address"
          class="sign-up__form-input"
          type="text"
          placeholder="Adresse"
        />
      </div>
      <div>
        <input
          v-model="state.zip"
          class="sign-up__form-input"
          type="number"
          placeholder="Code Postal"
        />
      </div>

      <div>
        <input
          v-model="state.userName"
          class="sign-up__form-input"
          type="text"
          placeholder="Pseudo"
        />
      </div>
      <div>
        <input
          v-model="state.password"
          class="sign-up__form-input"
          type="password"
          placeholder="Mot de passe"
        />
      </div>
    </main>

    <div class="sign-up__form-input--error" v-if="status == 'error_create'">
      Adresse mail déjà utilisée
    </div>
    <div class="sign-up__footer">
      <button
        @click="createAccount()"
        class="btn btn-primary"
        :class="{ 'sign-up__button-disabled': !validatedFields }"
      >
        <span v-if="status == 'loading'">Création en cours...</span>
        <span v-else>Créer mon compte</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { reactive, defineEmits, computed, ref } from "vue";

const state = reactive({
  mode: "create",
  currentImage: null,
  userName: "",
  firstName: "",
  lastName: "",
  phone: null,
  email: "",
  address: "",
  zip: null,
  password: "",
});
const store = useStore();
const status = computed(() => store.state.status);
const emit = defineEmits(["switch", "signup"]);
const fileInput = ref(null);

const switchComponent = () => {
  emit("switch", "login");
};

const createAccount = () => {
  emit("signup", {
    userName: state.userName,
    firstName: state.firstName,
    lastName: state.lastName,
    email: state.email,
    password: state.password,
    image: state.currentImage,
    phone: state.phone,
    address: state.address,
    zip: state.zip,
  });
};

const onPickFile = () => {
  let input = fileInput.value;
  let file = input.files;
  if (file && file[0]) {
    let reader = new FileReader();
    reader.onload = (e) => {
      state.currentImage = e.target.result;
    };
    reader.readAsDataURL(file[0]);
  }
};

const validatedFields = computed(() => {
  if (
    state.userName != "" &&
    state.firstName != "" &&
    state.lastName != "" &&
    state.email != "" &&
    state.password != "" &&
    state.phone != "" &&
    state.address != "" &&
    state.zip != ""
  ) {
    return true;
  } else {
    return false;
  }
});
</script>

<style lang="scss" scoped>
.sign-up {
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

    &--error {
      color: red;
      font-weight: bold;
    }
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
}

@media screen and (min-width: 768px) {
  .sign-up {
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(4, minmax(50px, auto));
    grid-template-areas:
      "title title title title title title"
      "subtitle-main subtitle-main subtitle-main subtitle-main subtitle-secondary subtitle-secondary"
      "file-input file-input file-input file-image  file-image  file-image"
      "main main main main main main "
      "footer footer footer footer footer footer";
    grid-gap: 20px;
    padding: 16px;
    &__subtitle-secondary {
      grid-area: subtitle-secondary;
      align-self: center;
      text-align: left;
      color: #2196f3;
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
