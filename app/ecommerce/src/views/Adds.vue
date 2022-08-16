<template>
  <Toolbar>Liste des annonces</Toolbar>
  <loading
    v-model:active="isLoading"
    :can-cancel="true"
    :is-full-page="fullPage"
  />
  <div
    style="height: 100%; width: 100%; display: flex; flex-wrap: wrap"
    v-if="adds"
  >
    <div v-for="item in adds" :key="item.id">
      <AddCard
        :img="item.images[0]"
        :title="item.title"
        :id="item.id"
        :description="item.description"
        :price="item.price"
        :rating="item.rating"
        :category="item.category"
        :avatar="item.thumbnail"
        :percentage="item.discountPercentage"
      />
    </div>
  </div>
</template>

<script>
import Toolbar from "../components/Toolbar/Toolbar.vue";
import AddCard from "../components/addCard/addCard.vue";
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
  },
};
</script>

<style lang="scss" scoped>
.topbar {
}
</style>
