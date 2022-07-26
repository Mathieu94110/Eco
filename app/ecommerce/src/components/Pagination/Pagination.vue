<template>
  <div class="wrapper">
    <div class="pagination">
      <nav style="display: flex">
        <ul style="display: flex">
          <li @click="getPreviousPage()">Page précédente</li>
          <li
            v-for="page in totalPages()"
            :key="page.id"
            :class="isActive(page)"
          >
            <a class="page-link" href="#" @click="getDataPerPage(page)">{{
              page
            }}</a>
          </li>
          <li @click="getNextPage()">Page suivante</li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["adds"],
  data() {
    return {
      itemsPerPage: 10,
      dataPerPage: [],
      currentPage: 1,
    };
  },
  mounted() {
    this.getDataPerPage(1);
  },
  methods: {
    totalPages() {
      return Math.ceil(this.adds.length / this.itemsPerPage);
    },
    getDataPerPage(value) {
      this.currentPage = value;
      this.dataPerPage = [];
      let start = value * this.itemsPerPage - this.itemsPerPage;
      let end = value * this.itemsPerPage;
      this.dataPerPage = this.adds.slice(start, end);
      this.$emit("page-data", this.dataPerPage);
    },

    getPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
      this.getDataPerPage(this.currentPage);
    },
    getNextPage() {
      if (this.currentPage < this.totalPages()) {
        this.currentPage++;
      }
      this.getDataPerPage(this.currentPage);
    },
    isActive(page) {
      return page == this.currentPage ? "active" : "";
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  height: 100%;
  margin-left: 85px;
  width: calc(100% - 85px);
  .pagination {
    position: absolute;
    width: calc(100% - 85px);
    right: 0;
    bottom: 0px;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    nav {
      width: 100%;
      ul {
        display: flex;
        justify-content: space-between;
        width: 100%;
        li {
          padding: 10px;
          list-style-type: none;
          border: 1px solid black;
          a {
            text-decoration: none;
          }
        }
      }
    }

    .active {
      background: blue;
    }
  }
}
</style>
