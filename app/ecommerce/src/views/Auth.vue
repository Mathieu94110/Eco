<template>
  <div class="auth">
    <Login @login="authenticate" @signup="createAccount"></Login>
  </div>
</template>

<script>
import Login from "@/components/Login/Login";
import { mapState } from "vuex";

export default {
  name: "Auth",
  components: {
    Login,
  },
  methods: {
    authenticate(data) {
      const self = this;
      this.$store
        .dispatch("login", {
          email: data.email,
          password: data.password,
        })
        .then(
          () => {
            self.$router.push("/profile");
          },
          function (error) {
            console.log(error);
          }
        );
    },
    createAccount(data) {
      const self = this;
      this.$store
        .dispatch("createAccount", {
          email: data.email,
          lastName: data.lastName,
          firstName: data.firstName,
          password: data.password,
        })
        .then(
          function () {
            self.authenticate(data);
          },
          function (error) {
            console.log(error);
          }
        );
    },
  },
  computed: {
    userId() {
      return this.$store.state.user.userId;
    },
    ...mapState(["status"]),
  },
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
