<template>
  <div class="login">
    <h1 class="login__title" v-if="mode == 'login'">Connexion</h1>
    <h1 class="login__title" v-else>Inscription</h1>
    <p class="login__subtitle" v-if="mode == 'login'">
      Tu n'as pas encore de compte ?
      <span class="login__action" @click="switchToCreateAccount()"
        >Créer un compte</span
      >
    </p>
    <p class="login__subtitle" v-else>
      Tu as déjà un compte ?
      <span class="login__action" @click="switchToLogin()">Se connecter</span>
    </p>
    <div class="login__form-items" v-if="mode == 'create'">
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
          :style="{ 'background-image': `url(${currentImage})` }"
        ></div>
      </div>
      <div class="login__form-row">
        <div class="login__form-items">
          <input
            v-model="firstName"
            class="login__form-input"
            type="text"
            placeholder="Prénom"
          />
        </div>
        <div class="login__form-items">
          <input
            v-model="lastName"
            class="login__form-input"
            type="text"
            placeholder="Nom"
          />
        </div>
      </div>
      <div class="login__form-row">
        <div class="login__form-items">
          <input
            v-model="zip"
            class="login__form-input"
            type="number"
            placeholder="Téléphone"
          />
        </div>
        <div class="login__form-items">
          <input
            v-model="email"
            class="login__form-input"
            type="text"
            placeholder="Adresse mail"
          />
        </div>
      </div>
      <div class="login__form-row">
        <div class="login__form-items">
          <input
            v-model="adress"
            class="login__form-input"
            type="text"
            placeholder="Adresse"
          />
        </div>
        <div class="login__form-items">
          <input
            v-model="zip"
            class="login__form-input"
            type="number"
            placeholder="Code Postal"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <div class="login__form-items">
        <input
          v-model="email"
          class="login__form-input"
          type="text"
          placeholder="Adresse mail"
        />
      </div>
      <div class="login__form-items">
        <input
          v-model="password"
          class="login__form-input"
          type="password"
          placeholder="Mot de passe"
        />
      </div>
    </div>
    <div
      class="form-items--error"
      v-if="mode == 'login' && status == 'error_login'"
    >
      Adresse mail et/ou mot de passe invalide
    </div>
    <div
      class="form-items--error"
      v-if="mode == 'create' && status == 'error_create'"
    >
      Adresse mail déjà utilisée
    </div>
    <div class="login__form-items">
      <button
        @click="login()"
        class="login__form-items-button"
        :class="{ 'button--disabled': !validatedFields }"
        v-if="mode == 'login'"
      >
        <span v-if="status == 'loading'">Connexion en cours...</span>
        <span v-else>Connexion</span>
      </button>
      <button
        @click="createAccount()"
        class="login__form-items-button"
        :class="{ 'button--disabled': !validatedFields }"
        v-else
      >
        <span v-if="status == 'loading'">Création en cours...</span>
        <span v-else>Créer mon compte</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Login",
  data: function () {
    return {
      mode: "login",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      currentImage: null,
    };
  },
  methods: {
    switchToCreateAccount: function () {
      this.mode = "create";
    },
    switchToLogin: function () {
      this.mode = "login";
    },

    login() {
      this.$emit("login", { email: this.email, password: this.password });
    },
    createAccount: function () {
      this.$emit("signup", {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
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
    validatedFields: function () {
      if (this.mode == "create") {
        if (
          this.email != "" &&
          this.firstName != "" &&
          this.lastName != "" &&
          this.password != ""
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.email != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      }
    },

    userId() {
      return this.$store.state.user.userId;
    },
    ...mapState(["status"]),
  },
};
</script>

<style lang="scss" scoped>
.login {
  max-width: 100%;
  width: 540px;
  background: white;
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

    &-button {
      background: #2196f3;
      color: white;
      border-radius: 8px;
      font-weight: 800;
      font-size: 15px;
      border: none;
      width: 100%;
      padding: 16px;
      transition: 0.4s background-color;

      &:hover {
        cursor: pointer;
        background: #1976d2;
      }
    }
    &--disabled {
      background: #cecece;
      color: #ececec;

      &:hover {
        cursor: not-allowed;
        background: #cecece;
      }
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
