<script setup lang="ts">
import { reactive, defineProps, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import type { LoginData } from "@/types";
import LoginFormLayout from "@/components/Layout/LoginFormLayout.vue";

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
  if (!validatedFields.value) return;
  try {
    const success = await store.dispatch("login", {
      email: state.email,
      password: state.password,
    });
    if (success) {
      router.push("/home");
    }
  } catch (err) {
    console.error("submit error on SignIn", err);
  }
};
const validatedFields = computed<boolean>(() => state.email !== "" && state.password !== "");
</script>

<template>
  <form class="login" @submit.prevent="submit">
    <span class="login__logo"></span>
    <LoginFormLayout>
      <template #title>
        <h1>Connection</h1>
      </template>
      <template #subtitle-main>
        <span>Tu n'as pas encore de compte ?</span>
      </template>
      <template #subtitle-secondary>
        <span @click="switchComponent()" @keydown="switchComponent()">Créer un compte</span>
      </template>
      <template #group>
        <div class="login__form-group">
          <input type="input" class="login__form-field" placeholder="Email" name="email" id="email"
            v-model="state.email" data-cy="email" required />
          <label for="email" class="login__form-label">Email</label>
        </div>
        <div class="login__form-group">
          <input type="password" name="password" id="password" class="login__form-field" placeholder="Mot de passe"
            v-model="state.password" data-cy="password" required />
          <label for="password" class="login__form-label">Mot de passe</label>
        </div>
      </template>
      <template #signin-error>
        <div class="login__form-items-error">
          <div class="login__form-items--error" v-show="props.status === 'error-login'" id="generic-error">
            Adresse mail et/ou mot de passe invalide
          </div>
        </div>
      </template>
      <template #login-footer>
        <button id="login-button" type="submit" class="btn btn-primary font-600" :disabled="!validatedFields">
          <span v-if="props.status === 'loading'">Connection en cours...</span>
          <span v-else data-cy="login-button">Connection</span>
        </button>
      </template>
    </LoginFormLayout>
  </form>
</template>
<style lang="scss" scoped>
.login {
  &__logo {
    background-image: url("@/assets/images/malenia-after.jpg");
  }
}
</style>
