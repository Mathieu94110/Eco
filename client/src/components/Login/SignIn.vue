<script setup lang="ts">
import type { LoginData } from "@/shared/interfaces";
import { reactive, defineProps, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

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
    router.push("/profile");
  } catch (e) {
    console.error(e);
  }
};

const validatedFields = computed<boolean>(() => state.email !== "" && state.password !== "");
</script>

<template>
  <form class="sign-in" @submit.prevent="submit">
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
        <label for="email">
          <input
            id="email"
            v-model="state.email"
            class="sign-in__form-input"
            type="text"
            placeholder="Mail"
            data-cy="email"
          />
        </label>
      </div>
      <div class="sign-in__form-items">
        <label for="email">
          <input
            id="password"
            v-model="state.password"
            class="sign-in__form-input"
            type="password"
            placeholder="Mot de passe"
            data-cy="password"
          />
        </label>
      </div>
    </main>
    <div class="sign-in__form-items--error" v-if="props.status === 'error_login'">
      Adresse mail et/ou mot de passe invalide
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
        <span v-else data-cy="login-button" class="color-white">Connection</span>
      </button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.sign-in {
  margin: 20px 10px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, minmax(25px, auto));
  grid-template-areas:
    "title"
    "subtitle-main"
    "subtitle-secondary"
    "main"
    "error-message"
    "footer";

  background: var(--primary-color);
  border-radius: 16px;
  padding: 8px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  &__title {
    grid-area: title;

    text-align: center;

    color: var(--text-color);
    font-weight: 600;
    padding: 10px;
  }
  &__subtitle {
    text-align: center;
    color: var(--text-color);
    font-weight: 600;
    font-size: 20px;
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
  &__button-disabled {
    color: #ececec;
    &:hover {
      cursor: not-allowed;
    }
  }
  &__form-input {
    height: 100%;
    padding: 8px;
    border: none;
    border-radius: 8px;
    background: var(--gray-2);
    font-weight: 500;
    font-size: 16px;
    flex: 1;
    min-width: 100px;
    color: #000;
  }
  &__form-items {
    display: flex;
    margin: 16px 0px;
    &--error {
      grid-area: error-message;
      color: var(--danger-2);
      font-weight: bold;
    }
  }
  &__subtitle-main {
    grid-area: subtitle-main;
    color: var(--text-color);
    font-weight: 600;
    align-self: center;
    text-align: center;
    padding: 10px;
  }
  &__subtitle-secondary {
    grid-area: subtitle-secondary;
    align-self: center;
    text-align: center;
    color: #2196f3;
    text-decoration: underline;
    font-weight: 600;
    &:hover {
      cursor: pointer;
    }
  }
  &__inputs {
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
  .sign-in {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, minmax(30px, auto));
    grid-template-areas:
      "title title"
      "subtitle-main subtitle-secondary"
      "main main"
      "error-message error-message"
      "footer footer";
    grid-gap: 20px;
    padding: 16px;
    margin: 0;
    &__inputs {
      grid-area: main;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: minmax(30px, auto);
      grid-gap: 20px;
    }
    &__subtitle-secondary {
      grid-area: subtitle-secondary;
      align-self: center;
      text-align: left;
      color: #2196f3;
      font-weight: 600;
      font-size: 18px;
      padding: 10px;
    }
  }
}
</style>
