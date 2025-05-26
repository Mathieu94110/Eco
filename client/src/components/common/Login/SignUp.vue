<script setup lang="ts">
import { useStore } from "vuex";
import { reactive } from "vue";
import LoginFormLayout from "@/components/Layout/LoginFormLayout.vue";
import type { UserForm } from "@/types";
import { useForm } from "vee-validate";
import * as yup from "yup";

const state = reactive<{
  mode: string;
}>({
  mode: "create",
});
const store = useStore();
const props = defineProps<{
  status: string;
}>();

const emit = defineEmits<{
  (e: "switch", value: string): void;
}>();
const switchComponent = (): void => {
  emit("switch", "login");
};

const { errors, handleSubmit, defineField } = useForm(
  {
    validationSchema: yup.object({
      pseudo: yup.string().required("Le pseudo est requis").min(4, "Le pseudo est trop court"),
      email: yup.string().email("L'email n'est pas valide").required("L'email est requis"),
      password: yup.string().required("Le mot de passe est requis").min(6, "Le mot de passe est trop court"),
    }),
  }
);

const onSubmit = handleSubmit(async (values: UserForm) => {
  try {
    const response = await store.dispatch("createAccount", values);
    if (response.status === 400) {
      store.commit("setStatus", "error-client-signup");
    } else if (response.status === 500) {
      store.commit("setStatus", "error-server-signup");
    } else if (response.error && !response.status) {
      store.commit("setStatus", response.error);
    } else {
      store.commit("setStatus", "");
      emit("switch", "login");
    }
  } catch (e) {
    console.error(e);
  }
});
const [pseudo, pseudoAttrs] = defineField("pseudo");
const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");
</script>

<template>
  <form class="login" @submit="onSubmit">
    <span class="login__logo"></span>
    <LoginFormLayout>
      <template #title>
        <h1>Inscription</h1>
      </template>
      <template #subtitle-main>
        <span>Vous avez déjà un compte ?</span>
      </template>
      <template #subtitle-secondary>
        <div @click="switchComponent()" @keydown="switchComponent()" data-cy="create-account-link">
          <span>Se connecter</span>
        </div>
      </template>
      <template #group>
        <div class="login__form-group">
          <input type="text" class="login__form-field" placeholder="Pseudo" v-model="pseudo" v-bind="pseudoAttrs"
            name="pseudo" required />
          <label for="userName" class="login__form-label">Pseudo</label>
          <div class="login__form-items-error">
            <div class="login__form-items--error" v-show="errors.pseudo" id="generic-error">
              {{ errors.pseudo }}
            </div>
          </div>
        </div>
        <div class="login__form-group">
          <input type="email" class="login__form-field" placeholder="Email" v-model="email" v-bind="emailAttrs"
            name="email" data-cy="email" required />
          <label for="email" class="login__form-label">Email</label>
          <div class="login__form-items-error">
            <div class="login__form-items--error" v-show="errors.email" id="generic-error">
              {{ errors.email }}
            </div>
          </div>
        </div>
        <div class="login__form-group">
          <input type="password" class="login__form-field" placeholder="Mot de passe" v-model="password" name="password"
            v-bind="passwordAttrs" data-cy="password" required />
          <label for="password" class="login__form-label">Mot de passe</label>
          <div class="login__form-items-error">
            <div class="login__form-items--error" v-show="errors.password" id="generic-error">
              {{ errors.password }}
            </div>
            <div class="login__form-items--error" v-show="props.status === 'Adresse mail déjà utilisée'"
              id="generic-error">
              {{ props.status }}
            </div>
          </div>
        </div>
      </template>
      <template #login-footer>
        <button id="login-button" type="submit" class="btn btn-primary font-600">
          <span v-if="props.status === 'loading'">Inscription...</span>
          <span v-else data-cy="login-button">Inscription</span>
        </button>
      </template>
    </LoginFormLayout>
  </form>
</template>

<style lang="scss" scoped>
.login {
  &__logo {
    background-image: url("@/assets/images/malenia-before.jpg");
  }
}
</style>
