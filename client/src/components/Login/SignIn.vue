<script setup lang="ts">
import { reactive, defineProps, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import type { LoginData } from "@/shared/interfaces";

const state = reactive<{
  email: string;
  password: string;
}>({
  email: "",
  password: "",
});

const props = defineProps<{
  status: string;
}>();

const store = useStore();
const router = useRouter();

const emit = defineEmits<{
  (e: "login", loginCredentials: LoginData): void;
  (e: "switch", value: string): void;
}>();

const switchComponent = (): void => {
  emit("switch", "create");
};

const submit = async () => {
  try {
    await store.dispatch("login", {
      email: state.email,
      password: state.password,
    });
    router.push("/ads");
  } catch (e) {
    console.error(e);
  }
};

const validatedFields = computed<boolean>(() => state.email !== "" && state.password !== "");
</script>

<template>
  <form class="sign-in" @submit.prevent="submit">
    <span class="sign-in__logo"></span>
    <div class="sign-in__title">
      <h1>Connection</h1>
    </div>
    <div class="sign-in__subtitle-main">Tu n'as pas encore de compte ?</div>
    <div
      class="sign-in__subtitle-secondary"
      @click="switchComponent()"
      @keydown="switchComponent()"
      data-cy="create-account-link"
    >
      Créer un compte
    </div>
    <main class="sign-in__inputs">
      <div class="sign-in__form-items">
        <div class="sign-in__form-group">
          <input
            type="input"
            class="sign-in__form-field"
            placeholder="Email"
            name="email"
            id="email"
            v-model="state.email"
            data-cy="email"
            required
          />
          <label for="email" class="sign-in__form-label">Email</label>
        </div>
        <div class="sign-in__form-group">
          <input
            type="password"
            name="password"
            id="password"
            class="sign-in__form-field"
            placeholder="Mot de passe"
            v-model="state.password"
            data-cy="password"
            required
          />
          <label for="password" class="sign-in__form-label">Mot de passe</label>
        </div>
      </div>
    </main>
    <div class="sign-in__form-items-error">
      <div class="sign-in__form-items--error" v-show="props.status === 'error_login'" id="generic-error">
        Adresse mail et/ou mot de passe invalide
      </div>
    </div>
    <div class="sign-in__footer">
      <button
        id="login-button"
        type="submit"
        class="btn btn-primary font-600"
        :disabled="!validatedFields"
        :class="{ 'sign-in__button-disabled': !validatedFields }"
      >
        <span v-if="props.status === 'loading'">Connection en cours...</span>
        <span v-else data-cy="login-button">Connection</span>
      </button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.sign-in {
  min-width: 277px;
  margin: 20px 10px;
  padding: 10px 0;
  width: auto;
  background: rgba(0, 0, 0, 0.9);
  padding: 6px;
  border-radius: 5px;
  box-shadow: 0px 9px 30px rgba(255, 255, 255, 0.1);
  text-align: center;
  &__logo {
    font-size: 60px;
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: #fff;
    margin: 0 auto;
    background-image: url("@/assets/images/malenia.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  &__title {
    color: var(--primary-1);
    font-weight: 600;
    padding: 10px 0;
  }
  h1 {
    font-size: 18px;
  }
  &__subtitle {
    color: #fff;
    font-weight: 600;
    font-size: 20px;
  }
  &__button-disabled {
    &:hover {
      cursor: not-allowed;
    }
  }
  &__form-group {
    position: relative;
    padding: 15px 0 0;
    margin-top: 10px;
  }
  &__form-field {
    &:required,
    &:invalid {
      box-shadow: none;
    }
    &::placeholder {
      color: transparent;
    }
    font-family: inherit;
    width: 100%;
    border: 0;
    border-bottom: 2px solid #9b9b9b;
    outline: 0;
    font-size: 12px;
    color: #fff;
    padding: 7px 0;

    background: transparent;
    transition: border-color 0.2s;

    &::placeholder {
      color: transparent;
    }
  }
  &__form-label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 12px;
    color: #fff;
  }
  &__form-items {
    &-error {
      margin: 10px 0;
      height: 40px;
    }
    &--error {
      color: var(--danger-2);
      font-weight: bold;
      font-size: 12px;
      width: auto;
      margin: auto;
    }
  }
  &__subtitle-main {
    color: #fff;
    font-weight: 600;
    padding: 10px 0;
  }
  &__subtitle-secondary {
    color: var(--primary-1);
    text-decoration: underline;
    font-weight: 600;
    margin-bottom: 40px;
    &:hover {
      cursor: pointer;
    }
  }
  .sign-in__form-field:focus {
    ~ .sign-in__form-label {
      position: absolute;
      top: 0;
      display: block;
      transition: 0.2s;
      font-size: 14px;
      color: var(--primary-1);
      font-weight: 700;
    }
    padding-bottom: 6px;
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, var(--primary-1), var(--primary-1));
    border-image-slice: 1;
  }
}
.sign-in__form-field {
  &:placeholder-shown ~ .sign-in__form-label {
    font-size: 16px;
    cursor: text;
    top: 20px;
  }
}
@media screen and (min-width: 768px) {
  .sign-in {
    margin: 0;
    padding: 30px 20px;
    width: 500px;
    h1 {
      font-size: 26px;
    }
    &__title {
      padding: 10px;
    }
    &__subtitle-main {
      font-size: 20px;
      padding: 10px;
    }
    &__subtitle-secondary {
      color: var(--primary-1);
      font-weight: 600;
      font-size: 20px;
      padding: 10px;
      margin: 0;
    }
    &__form-field {
      font-size: 22px;
    }
    &__form-label {
      font-size: 20px;
    }
    &__form-items {
      &-error {
        height: 20px;
      }
      &--error {
        width: auto;
        font-size: 16px;
      }
    }
  }
  .sign-in__form-field:focus {
    ~ .sign-in__form-label {
      font-size: 18px !important;
    }
  }

  .sign-in__form-field {
    &:placeholder-shown ~ .sign-in__form-label {
      font-size: 1.3rem;
    }
  }
}
</style>
