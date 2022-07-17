<template>
  <div class="profile">
    <UserProfile v-bind="user"></UserProfile>
  </div>
</template>

<script>
import UserProfile from "@/components/User/UserProfile";
import { mapState } from "vuex";

export default {
  name: "profile",
  components: {
    UserProfile,
  },
  mounted: function () {
    console.log("Todo=", this.user);
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      return;
    }
    this.$store.dispatch('getProfile');
  },
  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },
};
</script>

<style scoped>
.profile {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
