<template>
  <Toolbar>Liste des annonces</Toolbar>
  <loading
    v-model:active="isLoading"
    :can-cancel="true"
    :is-full-page="fullPage"
  />
  <div
    class="adds"
    v-if="adds"
    :style="{ marginLeft: sideBarClosed ? '25px' : '230px' }"
  >
    <AddCard
      v-for="add in adds"
      :key="add.id"
      :add="add"
      @add-item="addToFavorites(add)"
    />
  </div>
</template>

<script>
import Toolbar from "../components/Toolbar/Toolbar";
import AddCard from "../components/AddCard/AddCard";
import { getFakeAdds } from "../api/adds";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "Adds",
  components: {
    Toolbar,
    AddCard,
    Loading,
  },
  data() {
    return {
      adds: null,
      noResult: false,
      message: "",
      isLoading: false,
      fullPage: true,
      sideBarClosed: this.$collapsed,
    };
  },
  mounted() {
    this.loadFakeAdds();
  },
  methods: {
    async loadFakeAdds() {
      try {
        this.isLoading = true;
        const { data } = await getFakeAdds();
        if (data.products) {
          this.adds = data.products;
          this.isLoading = false;
        } else {
          this.noResult = true;
          this.message = "Aucunes annonces trouvées !";
        }
      } catch (error) {
        this.noResult = true;
        this.message = "Erreur lors du chargement des annonces";
      }
    },
    async addToFavorites(add) {
      this.$store.dispatch("sendFavorite", add).then(() => {
        this.$toastMsg("L'annonce a été ajoutée à vos favoris !", "success");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.adds {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
