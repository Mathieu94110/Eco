<template>
  <div class="add-details">
    <div class="add-details__go-back">
      <input type="button" @click="goBack()" value="Retour" />
    </div>
    <Card :add="userAdd" />
  </div>
</template>

<script>
import { getPostId } from "@/api/adds";
import Card from "@/components/Card/Card";
export default {
  data() {
    return {
      userAdd: undefined,
      loading: false,
      selection: 1,
    };
  },
  components: {
    Card,
  },
  async mounted() {
    const response = await getPostId(this.$route.params.id);
    this.userAdd = response.data;
  },
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss">
.add-details {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  &__go-back {
    width: 100px;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    left: 0;
    top: 0;

    input {
      background-image: linear-gradient(#42a1ec, #0070c9);
      border: 1px solid #0077cc;
      border-radius: 4px;
      color: #ffffff;
      cursor: pointer;
      font-size: 17px;
      font-weight: 400;
      letter-spacing: -0.022em;
      min-width: 30px;
      padding: 4px 15px;
      text-align: center;
      &:hover {
        background-image: linear-gradient(#51a9ee, #147bcd);
        border-color: #169cfc;
        text-decoration: none;
      }
    }
  }
}
</style>
