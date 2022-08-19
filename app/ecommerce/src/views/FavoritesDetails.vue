<template>
  <div class="favorites-details">
    <div
      class="favorites-details__header"
      :style="!currentState && { 'margin-bottom': '60px' }"
    >
      <input
        class="go-back-btn"
        type="button"
        @click="goBack()"
        value="Retour"
      />
    </div>
    <div class="adds" v-if="favoriteInfos">
      <AddCard :add="favoriteInfos" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddCard from "../components/AddCard/AddCard";
export default {
  data() {
    return {
      favoriteInfos: null,
    };
  },
  mounted() {
    if (this.getFavoriteDetails) {
      this.favoriteInfos = this.getFavoriteDetails;
    }
    console.log(this.favoriteInfos);
  },
  computed: {
    ...mapGetters(["getFavoriteDetails"]),
  },
  components: {
    AddCard,
  },
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss">
.favorites-details {
  width: 100%;
  padding: 0 80px;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__header {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    left: 0;
    top: 0;
    padding: 0 20px;

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
      height: 40px;
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
