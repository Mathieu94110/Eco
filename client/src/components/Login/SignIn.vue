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
  <form class="login" @submit.prevent="submit">
    <span class="login__logo"></span>
    <div class="login__title">
      <h1>Connection</h1>
    </div>
    <h2 class="login__subtitle-main">Tu n'as pas encore de compte ?</h2>
    <div
      class="login__subtitle-secondary"
      @click="switchComponent()"
      @keydown="switchComponent()"
      data-cy="create-account-link"
    >
      Créer un compte
    </div>
    <main class="login__form-items">
      <div class="login__form-group">
        <input
          type="input"
          class="login__form-field"
          placeholder="Email"
          name="email"
          id="email"
          v-model="state.email"
          data-cy="email"
          required
        />
        <label for="email" class="login__form-label">Email</label>
      </div>
      <div class="login__form-group">
        <input
          type="password"
          name="password"
          id="password"
          class="login__form-field"
          placeholder="Mot de passe"
          v-model="state.password"
          data-cy="password"
          required
        />
        <label for="password" class="login__form-label">Mot de passe</label>
      </div>
    </main>
    <div class="login__form-items-error">
      <div class="login__form-items--error" v-show="props.status === 'error_login'" id="generic-error">
        Adresse mail et/ou mot de passe invalide
      </div>
    </div>
    <div class="login__footer">
      <button
        id="login-button"
        type="submit"
        class="btn btn-primary font-600"
        :disabled="!validatedFields"
        :class="{ 'login__button-disabled': !validatedFields }"
      >
        <span v-if="props.status === 'loading'">Connection en cours...</span>
        <span v-else data-cy="login-button">Connection</span>
      </button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.login {
  &__logo {
    background-image: url("@/assets/images/malenia-two.jpg");
  }
}
</style>
