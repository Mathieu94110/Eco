<template>
  <section class="awesome-table">
    <table>
      <thead>
        <tr>
          <th v-for="(obj, ind) in config" :key="ind">
            {{ obj.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in theData" :key="index" :id="theData._id">
          <td v-for="(obj, ind) in config" :key="ind">
            <span v-if="obj.type === 'text'">{{ row[obj.key] }}</span>
            <span v-if="obj.type === 'date'"
              >{{ new Date(row[obj.key]).toLocaleDateString() }}
            </span>
            <span v-if="obj.type === 'number'">{{ row[obj.key] }}</span>
            <figure v-if="obj.type === 'image'">
              <img :src="row[obj.key]" width="auto" />
            </figure>
          </td>
          <button type="button" class="btn" @click="goToDetails(row['_id'])">
            Vf
          </button>
          <!-- <router-link
            :to="{ path: 'UserAddsDetails', params: { id: theData._id } }"
            ><a>Voir l'annonce</a></router-link
          > -->
        </tr>
      </tbody>
    </table>
  </section>
  <Modal v-show="isModalVisible" @close="closeModal" />
</template>

<script>
import Modal from "../Modal/Modal.vue";

export default {
  props: ["theData", "config"],
  components: {
    Modal,
  },
  data() {
    return {
      isModalVisible: false,
    };
  },
  mounted() {
    console.log(this.theData);
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
      this.$router.push({
        name: "UserAddsDetails",
        params: { id: this.theData.id },
      });
    },
    closeModal() {
      this.isModalVisible = false;
    },
    goToDetails(id) {
      this.$router.push({
        name: "UserAddsDetails",
        params: { id: id },
      });
    },
  },
};
</script>

<style lang="scss">
.awesome-table {
  border: 1px solid #999;
  border-radius: 4px;
  color: #333;
  overflow: auto;
  overflow-x: hidden;
  margin-top: 30px;
  figure {
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    img {
      border: 1px solid #bbb;
      border-radius: 50%;
      overflow: hidden;
      height: 60px;
      width: auto;
    }
  }
  table {
    border-collapse: collapse;
    width: 100.1%;
    th {
      position: sticky;
      top: 0;
      background: #f1f1f1;
      padding: 10px 5px;
      text-align: center;
      border-bottom: 1px solid #999;
    }

    td {
      padding: 5px 5px;
      text-align: center;
    }
  }
}
</style>
