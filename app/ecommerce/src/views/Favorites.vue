<template>
  <Pagination :adds="adds" @page-data="setDataPage"></Pagination>
</template>

<script>
import axios from "axios";
// import DropdownMenu from "@/components/Dropdown/DropdownMenu";
import Pagination from "@/components/Pagination/Pagination.vue";

export default {
  name: "Favorites",
  components: {
    /*     DropdownMenu, */
    Pagination,
  },
  data() {
    return {
      adds: [],
      displayedAdds: [],
    };
  },
  methods: {
    async loadAdds() {
      try {
        let result = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );
        if (result) {
          this.adds.push(...result.data);
        } else {
          this.noResult = true;
          this.message = "Aucune annonce enregistrée";
        }
      } catch (err) {
        this.noResult = true;
        this.message = "Erreur lors du chargement des données";
      }
    },
    setDataPage(params) {
      this.displayedAdds = params;
    },
  },
  mounted() {
    this.loadAdds();
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
