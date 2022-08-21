<template>
  <div
    class="profile"
    :style="{ marginLeft: sideBarClosed ? '115px' : '300px' }"
  >
    <UserProfile :userInfos="user"></UserProfile>
  </div>
</template>

<script>
import UserProfile from "@/components/User/UserProfile";
import { getProfile } from "@/api/user";

export default {
  name: "profile",
  data() {
    return {
      sideBarClosed: this.$collapsed,
      user: null,
    };
  },
  components: {
    UserProfile,
  },
  mounted: function () {
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      return;
    }
    this.getUserInfos();
  },
  methods: {
    async getUserInfos() {
      const response = await getProfile(this.$store.state.user.userId);
      this.user = response.data;
    },
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
