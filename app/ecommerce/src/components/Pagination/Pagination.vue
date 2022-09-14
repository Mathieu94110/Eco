<template>
  <div v-if="totalRecords > 0">
    <div class="pagination-container">
      <button class="fal" @click="changePage(0)">&lt;&lt;</button>

      <button class="fal" @click="changePage(-1)">&lt;</button>
      <span class="inner-pagination-content">
        Page {{ page }} sur {{ pages }}
      </span>
      <button class="fal" @click="changePage(1)">></button>
      <button class="fal" @click="changePage(pages)">>></button>
      <span class="pagination-seperator">|</span>
      Nombre de résultats:
      <span
        class="showing"
        :class="perPage === amount && 'active'"
        v-for="(amount, index) in perPageOptions"
        :key="index"
        @click="setPerPage(amount)"
        >{{ amount }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ["totalRecords", "perPageOptions"],
  data: function () {
    return {
      page: 1,
      perPage: this.perPageOptions[0],
    };
  },
  computed: {
    pages() {
      const remainder = this.totalRecords % this.perPage;
      if (remainder > 0) {
        return Math.floor(this.totalRecords / this.perPage) + 1;
      } else {
        return this.totalRecords / this.perPage;
      }
    },
  },
  methods: {
    setPerPage(amount) {
      this.perPage = amount;
      this.$emit("input", { page: this.page, perPage: amount });
    },
    changePage(val) {
      switch (val) {
        case 0:
          this.page = 1;
          break;
        case -1:
          this.page = this.page > 1 ? this.page - 1 : this.page;
          break;
        case 1:
          this.page = this.page < this.pages ? this.page + 1 : this.page;
          break;
        case this.pages:
          this.page = this.pages;
          break;
      }
      this.$emit("input", { page: this.page, perPage: this.perPage });
    },
  },
};
</script>

<style lang="scss">
.pagination-container {
  min-width: 400px;
  max-width: 600px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  color: #444;
  font-weight: 400;
  font-size: 18px;
  margin-right: 20px;
  .inner-pagination-content {
    display: flex;
    margin: 0px 10px;
  }
  .pagination-seperator,
  .showing {
    font-size: 16px;
    font-weight: 300;
    color: #888;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 10px;
  }
  .showing {
    margin: 0px 5px;
    font-weight: 400;
    font-size: 18px;
    cursor: pointer;
    &.active {
      color: #2997ff;
    }
  }
}
.fal {
  color: #fff;
  padding: 10px;
  background: #2997ff;
  cursor: pointer;
  border: 1px solid #000;
}
</style>
