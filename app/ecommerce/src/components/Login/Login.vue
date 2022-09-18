<template>
  <div class="login">
    <h1 class="login__title" v-if="state.mode == 'login'">Connexion</h1>
    <h1 class="login__title" v-else>Inscription</h1>
    <p class="login__subtitle" v-if="state.mode == 'login'">
      Tu n'as pas encore de compte ?
      <span class="login__action" @click="switchToCreateAccount()"
        >Créer un compte</span
      >
    </p>
    <p class="login__subtitle" v-else>
      Tu as déjà un compte ?
      <span class="login__action" @click="switchToLogin()">Se connecter</span>
    </p>
    <div class="login__form-items" v-if="state.mode == 'create'">
      <div class="login__form-avatar">
        <input
          id="image"
          name="image"
          accept="image/*"
          ref="fileInput"
          type="file"
          @input="onPickFile"
        />
        <div
          class="login__form-avatar-imagePreviewed"
          :style="{ 'background-image': `url(${state.currentImage})` }"
        ></div>
      </div>
      <div class="login__form-row">
        <div class="login__form-items">
          <input
            v-model="state.firstName"
            class="login__form-input"
            type="text"
            placeholder="Prénom"
          />
        </div>
        <div class="login__form-items">
          <input
            v-model="state.lastName"
            class="login__form-input"
            type="text"
            placeholder="Nom"
          />
        </div>
      </div>
      <div class="login__form-row">
        <div class="login__form-items">
          <input
            v-model="state.phone"
            class="login__form-input"
            type="number"
            placeholder="Téléphone"
          />
        </div>
        <div class="login__form-items">
          <input
            v-model="state.email"
            class="login__form-input"
            type="text"
            placeholder="Adresse mail"
          />
        </div>
      </div>
      <div class="login__form-row">
        <div class="login__form-items">
          <input
            v-model="state.address"
            class="login__form-input"
            type="text"
            placeholder="Adresse"
          />
        </div>
        <div class="login__form-items">
          <input
            v-model="state.zip"
            class="login__form-input"
            type="number"
            placeholder="Code Postal"
          />
        </div>
      </div>
      <div class="login__form-row">
        <div class="login__form-items">
          <input
            v-model="state.userName"
            class="login__form-input"
            type="text"
            placeholder="Pseudo"
          />
        </div>
        <div class="login__form-items">
          <input
            v-model="state.password"
            class="login__form-input"
            type="password"
            placeholder="Mot de passe"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <div class="login__form-items">
        <input
          v-model="state.email"
          class="login__form-input"
          type="text"
          placeholder="Adresse mail"
        />
      </div>
      <div class="login__form-items">
        <input
          v-model="state.password"
          class="login__form-input"
          type="password"
          placeholder="Mot de passe"
        />
      </div>
    </div>
    <div
      class="form-items--error"
      v-if="state.mode == 'login' && status == 'error_login'"
    >
      Adresse mail et/ou mot de passe invalide
    </div>
    <div
      class="form-items--error"
      v-if="state.mode == 'create' && status == 'error_create'"
    >
      Adresse mail déjà utilisée
    </div>
    <div class="login__form-items">
      <button
        @click="login()"
        class="btn btn-primary"
        :class="{ 'login__button-disabled': !validatedFields }"
        v-if="state.mode == 'login'"
      >
        <span v-if="status == 'loading'">Connexion en cours...</span>
        <span v-else>Connexion</span>
      </button>
      <button
        @click="createAccount()"
        class="btn btn-primary"
        :class="{ 'login__button-disabled': !validatedFields }"
        v-else
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
  mode: "login",
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
const emit = defineEmits(["login", "signup"]);
const fileInput = ref(null);

const switchToCreateAccount = () => {
  state.mode = "create";
};
const switchToLogin = () => {
  state.mode = "login";
};

const login = () => {
  emit("login", { email: state.email, password: state.password });
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
  if (state.mode == "create") {
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
  } else {
    if (state.email != "" && state.password != "") {
      return true;
    } else {
      return false;
    }
  }
});
</script>

<style lang="scss" scoped>
.login {
  max-width: 100%;
  width: 540px;
  background: var(--primary-color);
  border-radius: 16px;
  padding: 32px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  &__title {
    text-align: center;
    font-weight: 800;
  }
  &__subtitle {
    text-align: center;
    color: #666;
    font-weight: 500;
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
  &__form-avatar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-imagePreviewed {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      display: block;
      cursor: pointer;
      background-size: cover;
      background-position: center center;
    }
  }
  &__form-row {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  &__form-items {
    display: flex;
    margin: 16px 0px;
    gap: 16px;
    flex-wrap: wrap;
    display: flex;
    justify-content: space-between;
    &--error {
      color: red;
      font-weight: bold;
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
    width: 220px;
    color: black;
  }
}
</style>
