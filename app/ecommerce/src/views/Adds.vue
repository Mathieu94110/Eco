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
import Toolbar from "../components/Toolbar/Toolbar.vue";
import AddCard from "../components/addCard/addCard.vue";
import { getFakeAdds } from "../api/adds";
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
  async created() {
    try {
      const { data } = await getFakeAdds();
      this.adds = data.products;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style lang="scss" scoped>
.topbar {
}
</style>
