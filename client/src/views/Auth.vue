<template>
  <div class="auth">
    <Login
      @login="authenticate"
      @signup="createAccount"
      :status="status"
    ></Login>
  </div>
</template>

<script setup>
import Login from "@/components/Login/Login";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const status = computed(() => store.state.status);

const authenticate = (data) => {
  store
    .dispatch("login", {
      email: data.email,
      password: data.password,
    })
    .then(
      () => {
        router.push("/profile");
      },
      function (error) {
        console.log(error);
      }
    );
};

const createAccount = (data) => {
  store
    .dispatch("createAccount", {
      userName: data.userName,
      email: data.email,
      lastName: data.lastName,
      firstName: data.firstName,
      password: data.password,
      image: data.image,
      phone: data.phone,
      address: data.address,
      zip: data.zip,
    })
    .then(
      function () {
        authenticate(data);
      },
      function (error) {
        console.log(error);
      }
    );
};
</script>

<style lang="scss" scoped>
.auth {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
