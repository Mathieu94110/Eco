<script setup lang="ts">
import { useStore } from "vuex";
import { reactive } from "vue";
import { toTypedSchema } from "@vee-validate/zod";
import type { UserForm } from "@/shared/interfaces";
import { useForm } from "vee-validate";
import * as yup from "yup";

const state = reactive<{
  mode: string;
}>({
  mode: "create",
});

const props = defineProps<{
  status: string;
}>();

const emit = defineEmits<{
  (e: "switch", value: string): void;
}>();
const switchComponent = (): void => {
  emit("switch", "login");
};

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    pseudo: yup.string().required("Le pseudo est requis").min(4, "Le pseudo est trop court"),
    email: yup.string().email("L'email n'est pas valide").required("L'email est requis"),
    password: yup.string().required("Le mot de passe est requis").min(6, "Le mot de passe est trop court"),
  }),
});

const onSubmit = handleSubmit(async (values) => {
  alert(JSON.stringify(values, null, 3));
  //   try {
  //     const response = await store.dispatch("createAccount", formValue);
  //     if (response.status === 400) {
  //       store.commit("setStatus", "client-error");
  //       setTimeout(() => {
  //         store.commit("setStatus", "");
  //       }, 2000);
  //     } else if (response.status === 500) {
  //       store.commit("setStatus", "error-signup");
  //       setTimeout(() => {
  //         store.commit("setStatus", "");
  //       }, 2000);
  //     } else {
  //       emit("switch", "login");
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
});
const [pseudo, pseudoAttrs] = defineField("pseudo");
const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");
</script>

<template>
  <form class="login" @submit="onSubmit">
    <span class="login__logo"></span>
    <div class="login__title">
      <h1>Inscription</h1>
    </div>
    <h2 class="login__subtitle-main">Vous avez déjà un compte ?</h2>
    <div
      class="login__subtitle-secondary"
      @click="switchComponent()"
      @keydown="switchComponent()"
      data-cy="create-account-link"
    >
      Se connecter
    </div>
    <main class="login__form-items">
      <div class="login__form-group">
        <input
          type="text"
          class="login__form-field"
          placeholder="Pseudo"
          v-model="pseudo"
          v-bind="pseudoAttrs"
          required
        />
        <label for="userName" class="login__form-label">Pseudo</label>
        <div class="login__form-items-error">
          <div class="login__form-items--error" v-show="errors.pseudo" id="generic-error">
            {{ errors.pseudo }}
          </div>
        </div>
      </div>
      <div class="login__form-group">
        <input
          type="email"
          class="login__form-field"
          placeholder="Email"
          v-model="email"
          v-bind="emailAttrs"
          data-cy="email"
          required
        />
        <label for="email" class="login__form-label">Email</label>
        <div class="login__form-items-error">
          <div class="login__form-items--error" v-show="errors.email" id="generic-error">
            {{ errors.email }}
          </div>
        </div>
      </div>
      <div class="login__form-group">
        <input
          type="password"
          class="login__form-field"
          placeholder="Mot de passe"
          v-model="password"
          v-bind="passwordAttrs"
          data-cy="password"
          required
        />
        <label for="password" class="login__form-label">Mot de passe</label>
        <div class="login__form-items-error">
          <div class="login__form-items--error" v-show="errors.password" id="generic-error">
            {{ errors.password }}
          </div>
        </div>
      </div>
    </main>
    <div class="login__footer">
      <button id="login-button" type="submit" class="btn btn-primary font-600">
        <span v-if="props.status === 'loading'">Inscription...</span>
        <span v-else data-cy="login-button">Inscription</span>
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
