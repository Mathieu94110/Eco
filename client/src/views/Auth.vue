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
import Login from '@/components/Login/Login.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const status = computed(() => store?.state.status);

const authenticate = async (data) => {
  try {
    await store.dispatch('login', {
      email: data.email,
      password: data.password,
    });
    router.push('/profile');
  } catch (e) {
    console.error(e);
  }
};

const createAccount = async (data) => {
  try {
    await store.dispatch('createAccount', {
      userName: data.userName,
      email: data.email,
      lastName: data.lastName,
      firstName: data.firstName,
      password: data.password,
      image: data.image,
      phone: data.phone,
      address: data.address,
      zip: data.zip,
    });
    authenticate(data);
  } catch (e) {
    console.error(e);
  }
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
