<template>
  <div class="add-details">
    <!-- <div class="add-details__card">hello</div> -->
    <v-card :loading="loading" class="mx-auto my-12" max-width="374">
      <!-- <template slot="progress">
          <v-progress-linear
            color="deep-purple"
            height="10"
            indeterminate
          ></v-progress-linear>
        </template> -->

      <v-img
        height="250"
        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
      ></v-img>

      <v-card-title>Cafe Badilico</v-card-title>

      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-rating
            :value="4.5"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>

          <div class="grey--text ms-4">4.5 (413)</div>
        </v-row>

        <div class="my-4 text-subtitle-1">$ • Italian, Cafe</div>

        <div>
          Small plates, salads & sandwiches - an intimate setting with 12 indoor
          seats plus patio seating.
        </div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title>Tonight's availability</v-card-title>

      <v-card-text>
        <v-chip-group
          v-model="selection"
          active-class="deep-purple accent-4 white--text"
          column
        >
          <v-chip>5:30PM</v-chip>

          <v-chip>7:30PM</v-chip>

          <v-chip>8:00PM</v-chip>

          <v-chip>9:00PM</v-chip>
        </v-chip-group>
      </v-card-text>

      <v-card-actions>
        <v-btn color="deep-purple lighten-2" text @click="reserve">
          Reserve
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { getPostId } from "@/api/adds";

export default {
  data() {
    return {
      userAdd: undefined,
      loading: false,
      selection: 1,
    };
  },
  components: {},
  async mounted() {
    const response = await getPostId(this.$route.params.id);
    this.userAdd = response.data;
    console.log(this.userAdd);
  },
  methods: {
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
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

<style lang="scss">
.add-details {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__card {
    height: 600px;
    width: 500px;
    padding: 30px 20px;
  }
}
</style>
