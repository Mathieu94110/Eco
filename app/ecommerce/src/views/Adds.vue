<template>
  <Toolbar>Liste des annonces</Toolbar>
  <div
    style="height: 100%; width: 100%; display: flex; flex-wrap: wrap"
    v_if="adds.length > 1"
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
import axios from "axios";
import Toolbar from "../components/Toolbar/Toolbar.vue";
import AddCard from "../components/addCard/addCard.vue";

export default {
  name: "Adds",
  components: {
    Toolbar,
    AddCard,
  },
  data() {
    return {
      adds: [],
    };
  },
  methods: {},
  created() {
    try {
      axios
        .get("https://dummyjson.com/products")
        .then((res) => (console.log(res), (this.adds = res.data.products)));
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.topbar {
}
</style>
