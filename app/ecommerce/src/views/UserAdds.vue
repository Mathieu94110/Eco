<template>
  <div id="app">
    <nav>Mes annonces</nav>
    <main>
      <Pagination
        v-if="tableData"
        :totalRecords="tableData.length"
        :perPageOptions="perPageOptions"
        @input="setTable($event)"
      />
      <Table
        v-if="tableData"
        :theData="computedTableData"
        :config="config"
        :style="{ height: '600px' }"
      />
    </main>
  </div>
</template>

<script>
import Table from "../components/Table/Table";
import Pagination from "../components/Pagination/Pagination";
import { getUserAdds } from "@/api/adds";

const perPageOptions = [20, 50, 100];
export default {
  components: {
    Table,
    Pagination,
  },
  data: function () {
    return {
      perPageOptions,
      tableData: undefined,
      pagination: { page: 1, perPage: perPageOptions[0] },
      config: [
        {
          key: "image",
          title: "Image",
          type: "image",
        },
        {
          key: "title",
          title: "Titre",
          type: "text",
        },
        {
          key: "date",
          title: "Date",
          type: "date",
        },
        {
          key: "description",
          title: "Description",
          type: "text",
        },
        {
          key: "category",
          title: "Catégorie",
          type: "text",
        },
        {
          key: "price",
          title: "Prix",
          type: "number",
        },
        {
          key: "id",
          title: "Id",
          type: "text",
        },
      ],
    };
  },
  mounted() {
    this.getAdds();
  },
  methods: {
    setTable(data) {
      console.log(data);
      this.pagination = data;
    },
    async getAdds() {
      try {
        const { data } = await getUserAdds();
        this.tableData = data.posts;
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    computedTableData() {
      if (!this.tableData) return [];
      else {
        const firstIndex = (this.pagination.page - 1) * this.pagination.perPage;
        const lastIndex = this.pagination.page * this.pagination.perPage;
        return this.tableData.slice(firstIndex, lastIndex);
      }
    },
  },
};
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
  font-weight: 400;
  margin: 0;
}
main {
  margin: 30px;
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
nav {
  height: 60px;
  background: #222;
  font-size: 32px;
  color: white;
  display: flex;
  align-items: center;
  padding-left: 20px;
}
</style>
