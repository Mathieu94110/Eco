<script setup lang="ts">
import { useStore } from "vuex";
import { reactive } from "vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import type { UserForm } from "@/shared/interfaces";

const state = reactive<{
  mode: string;
}>({
  mode: "create",
});

const props = defineProps<{
  status: string;
}>();

const store = useStore();

const { handleSubmit, errors } = useForm({
  validationSchema: yup.object({
    userName: yup
      .string()
      .min(4, "Le nom d'utilisateur doit contenir au moins 4 caractères")
      .required("Le pseudo est requis"),
    firstName: yup.string().min(2, "Le prénom doit contenir au moins 2 caractères").required("Le prénom est requis"),
    lastName: yup.string().min(2, "Le nom doit contenir au moins 2 caractères").required("Le nom est requis"),
    phone: yup
      .string()
      .required("Le téléphone est requis")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Le format est incorrect",
      ),
    email: yup.string().required("L'émail est requis").email("L'émail indiqué est invalide"),
    address: yup.string().min(10, "L'adresse doit contenir au moins 10 caractères").required("L'adresse est requise"),
    zip: yup
      .string()
      .required("Le code postal est requis")
      .min(5, "Le code postal doit contenir au moins 5 caractères"),
    password: yup
      .string()
      .min(4, "Le mot de passe doit contenir au moins 4 caractères")
      .required("Le mot de passe est requis"),
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

const emit = defineEmits<{
  (e: "switch", value: string): void;
}>();
const switchComponent = (): void => {
  emit("switch", "login");
};

const submit = handleSubmit(async (formValue: UserForm) => {
  try {
    const response = await store.dispatch("createAccount", formValue);
    if (response.status === 400) {
      store.commit("setStatus", "client-error");
      setTimeout(() => {
        store.commit("setStatus", "");
      }, 2000);
    } else if (response.status === 500) {
      store.commit("setStatus", "error-signup");
      setTimeout(() => {
        store.commit("setStatus", "");
      }, 2000);
    } else {
      emit("switch", "login");
    }
  } catch (e) {
    console.error(e);
  }
});
</script>

<template>
  <form class="sign-up" @submit.prevent="submit">
    <div class="sign-up__title">
      <h1>Inscription</h1>
    </div>
    <header class="sign-up__subtitle">
      <p class="sign-up__subtitle-main">Tu as déjà un compte ?</p>
    </header>
    <nav class="sign-up__subtitle-secondary">
      <span class="sign-up__action" @click="switchComponent()" @keydown="switchComponent()">Se connecter</span>
    </nav>
    <main class="sign-up__main">
      <div class="sign-up__form-items">
        <label for="firstName">
          <input id="firstName" v-model="firstName" class="sign-up__form-input" type="text" placeholder="Prénom" />
        </label>
        <span class="sign-up__errors">{{ errors["firstName"] }}</span>
      </div>
      <div class="sign-up__form-items">
        <label for="lastName">
          <input id="lastName" v-model="lastName" class="sign-up__form-input" type="text" placeholder="Nom" />
        </label>
        <span class="sign-up__errors">{{ errors["lastName"] }}</span>
      </div>

      <div class="sign-up__form-items">
        <label for="phone">
          <input id="phone" v-model="phone" class="sign-up__form-input" type="number" placeholder="Téléphone" />
        </label>
        <span class="sign-up__errors">{{ errors["phone"] }}</span>
      </div>
      <div class="sign-up__form-items">
        <label for="email">
          <input id="email" v-model="email" class="sign-up__form-input" type="text" placeholder="Email" />
        </label>
        <span class="sign-up__errors" data-cy="signup-error-email">{{ errors["email"] }}</span>
      </div>

      <div class="sign-up__form-items">
        <label for="address">
          <input id="address" v-model="address" class="sign-up__form-input" type="text" placeholder="Adresse" />
        </label>
        <span class="sign-up__errors">{{ errors["address"] }}</span>
      </div>
      <div class="sign-up__form-items">
        <label for="zip">
          <input id="zip" v-model="zip" class="sign-up__form-input" type="number" placeholder="Code postal" />
        </label>
        <span class="sign-up__errors">{{ errors["zip"] }}</span>
      </div>

      <div class="sign-up__form-items">
        <label for="userName">
          <input id="userName" v-model="userName" class="sign-up__form-input" type="text" placeholder="Pseudo" />
        </label>
        <span class="sign-up__errors">{{ errors["userName"] }}</span>
      </div>
      <div class="sign-up__form-items">
        <label for="password">
          <input
            id="password"
            v-model="password"
            class="sign-up__form-input"
            type="password"
            placeholder="Mot de passe"
          />
        </label>
        <span class="sign-up__errors" data-cy="signup-error-password">{{ errors["password"] }}</span>
      </div>
    </main>
    <div class="sign-up__footer">
      <button type="submit" class="btn btn-primary font-600">
        <span v-if="status === 'loading'">Création en cours...</span>
        <span v-else class="color-white">Créer mon compte</span>
      </button>
      <span
        v-if="props.status === 'error-signup'"
        class="sign-up__errors sign-up__creation-errors"
        data-cy="user-exist-error"
      >
        Ce compte est déjà utilisé</span
      >
      <span v-if="props.status === 'client-error'" class="sign-up__errors sign-up__creation-errors"
        >Problème survenu lors de la requete</span
      >
    </div>
  </form>
</template>

<style lang="scss" scoped>
@use "../../assets/scss/mixins" as m;
.sign-up {
  height: auto;
  min-width: 277px;
  margin: 20px 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    "title"
    "subtitle-main"
    "subtitle-secondary"
    "main"
    "footer";
  background: var(--primary-color);
  border-radius: 16px;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  h1 {
    font-size: 18px;
  }
  &__title {
    grid-area: title;
    text-align: center;
    color: var(--text-color);
    font-weight: 600;
    padding: 10px;
  }

  &__subtitle {
    grid-area: subtitle-main;
    align-self: center;
    font-weight: 600;
    padding: 10px;

    &-main {
      text-align: center;
      color: var(--text-color);
      font-weight: 600;
    }
    &-secondary {
      grid-area: subtitle-secondary;
      margin-bottom: 20px;
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
  &__form-items {
    display: flex;
    flex-direction: column;
    height: auto;
    align-items: center;
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

  &__main {
    grid-area: main;
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: minmax(50px, auto);
  }

  &__footer {
    grid-area: footer;
    display: flex;
    flex-direction: column;
  }
  &__errors {
    max-width: 200px;
    margin: 10px 0;
    color: var(--danger-2);
    font-weight: bold;
    font-size: 14px;
  }
  &__creation-errors {
    grid-area: error-message;
    color: var(--danger-2);
    font-weight: bold;
    font-size: 14px;
    width: 211px;
    text-align: center;
    margin: 10px auto 0;
  }
}

@include m.md {
  .sign-up {
    grid-template-areas:
      "title title title title title title"
      "subtitle-main subtitle-main subtitle-main subtitle-main subtitle-secondary subtitle-secondary"
      "main main main main main main "
      "footer footer footer footer footer footer";
    grid-template-rows: repeat(6, minmax(25px, auto));
    padding: 20px;
    h1 {
      font-size: 26px;
    }
    &__subtitle-main {
      font-size: 20px;
    }
    &__subtitle-secondary {
      grid-area: subtitle-secondary;
      align-self: center;
      text-align: left;
      color: var(--primary-2);
      font-weight: 600;
      font-size: 20px;
      padding: 10px;
      margin: 0;
    }
    &__form-items {
      &:nth-child(7),
      &:nth-child(8) {
        height: 117px;
      }

      &:nth-child(-n + 6) {
        height: 96px;
      }
    }
    &__main {
      margin-top: 50px;
      grid-area: main;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: minmax(50px, auto);
      grid-gap: 10px 20px;
      font-size: 20px;
    }

    &__footer {
      flex-direction: row;
    }
    &__errors {
      max-width: 200px;
      margin-bottom: 10px;
    }
    &__creation-errors {
      margin-left: 20px;
      text-align: left;
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
