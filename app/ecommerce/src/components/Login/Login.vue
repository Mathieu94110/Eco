<template>
  <component :is="isActive" @switch="switchComponent" v-bind="$attrs" />
</template>

<script setup>
// import { useStore } from "vuex";
import { reactive, computed /* defineEmits,  ref  */ } from "vue";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const state = reactive({
  mode: "create",
});

const isActive = computed(() => {
  return state.mode === "create" ? SignUp : SignIn;
});

const switchComponent = (value) => {
  state.mode = value;
};
// const store = useStore();
// const status = computed(() => store.state.status);
// const emit = defineEmits(["login", "signup"]);
// const fileInput = ref(null);

// const switchToCreateAccount = () => {
//   state.mode = "create";
// };
// const switchToLogin = () => {
//   state.mode = "login";
// };

// const login = () => {
//   emit("login", { email: state.email, password: state.password });
// };
// const createAccount = () => {
//   emit("signup", {
//     userName: state.userName,
//     firstName: state.firstName,
//     lastName: state.lastName,
//     email: state.email,
//     password: state.password,
//     image: state.currentImage,
//     phone: state.phone,
//     address: state.address,
//     zip: state.zip,
//   });
// };

// const onPickFile = () => {
//   let input = fileInput.value;
//   let file = input.files;
//   if (file && file[0]) {
//     let reader = new FileReader();
//     reader.onload = (e) => {
//       state.currentImage = e.target.result;
//     };
//     reader.readAsDataURL(file[0]);
//   }
// };

// const validatedFields = computed(() => {
//   if (state.mode == "create") {
//     if (
//       state.userName != "" &&
//       state.firstName != "" &&
//       state.lastName != "" &&
//       state.email != "" &&
//       state.password != "" &&
//       state.phone != "" &&
//       state.address != "" &&
//       state.zip != ""
//     ) {
//       return true;
//     } else {
//       return false;
//     }
//   } else {
//     if (state.email != "" && state.password != "") {
//       return true;
//     } else {
//       return false;
//     }
//   }
// });
</script>

<style></style>
