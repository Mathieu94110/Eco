<template>
  <div style="width: 100%; height: 100%">
    <Toolbar> Mes annonces </Toolbar>
    <infinite-scroll
      @infinite-scroll="loadAdds"
      :message="message"
      :noResult="noResult"
    >
      <div
        style="
          width: 100%;
          height: 100%;
          margin: 50px;
          display: flex;
          overflow-x: wrap;
        "
      >
        <div
          v-for="item in displayedAdds"
          :key="item.id"
          style="height: 500px; width: 260px; justify-content: space-evenly"
        >
          <div
            style="
              width: 200px;
              height: 200px;
              display: block;
              cursor: pointer;
              margin: 0 auto 14px;
              background-size: cover;
              background-position: center center;
            "
          >
            <img :src="item.image" alt="item.title" style="height: 50px" />
          </div>
          <p>{{ item.title }}</p>
          <p>{{ item.description }}</p>
          <p>{{ item.category }}</p>
          <p>{{ item.price }}</p>
        </div>
      </div>
    </infinite-scroll>
    <Pagination :adds="adds" @page-data="setDataPage"></Pagination>
  </div>
</template>

<script>
import axios from "axios";
import InfiniteScroll from "infinite-loading-vue3";
import Toolbar from "@/components/Toolbar/Toolbar.vue";
import Pagination from "@/components/Pagination/Pagination.vue";

export default {
  name: "Adds",
  components: {
    InfiniteScroll,
    Toolbar,
    Pagination,
  },
  data() {
    return {
      adds: [],
      displayedAdds: [],
      noResult: false,
    };
  },
  methods: {
    async loadAdds() {
      const response = axios.get("http://localhost:3000/api/posts");
      this.adds = response;
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
