<template>
  <section class="table-wrapper">
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
            <span v-if="!obj.type">{{ row[obj.key] }}</span>
            <span v-if="obj.title === 'Actions'">
              <router-link
                :to="{ name: 'UserAddsDetails', params: { id: row['_id'] } }"
                ><a class="table-wrapper__link">Voir l'annonce</a></router-link
              >
              <div class="table-wrapper__delete-icon">
                <span @click="showDeleteModal(row)">
                  <i class="fa fa-trash" aria-hidden="true"></i
                ></span></div
            ></span>
          </td>
        </tr>
      </tbody>
    </table>
  </section>

  <Modal v-show="isModalVisible" @close="closeModal" @delete="deleteAdd()">
    <template #header>
      <h2>Vous allez supprimer {{ selectedAdd.title }}</h2>
    </template>

    <template #body>
      <p>Crée le {{ new Date(selectedAdd.date).toLocaleDateString() }}</p>
      <p>Au prix de {{ selectedAdd.price }}</p>
      <p>Cette action est irréversible !</p>
    </template>

    <template #footer>
      <p>Oui, je souhaite supprimer l'annonce</p>
    </template>
  </Modal>
</template>

<script>
import Modal from "../Modal/Modal.vue";
import { deleteAdds } from "@/api/adds";

export default {
  props: ["theData", "config"],
  components: {
    Modal,
  },
  data() {
    return {
      isModalVisible: false,
      selectedAdd: {},
    };
  },
  methods: {
    showModal() {},
    closeModal() {
      this.isModalVisible = false;
    },
    goToDetails(id) {
      this.$router.push({
        name: "UserAddsDetails",
        params: { id: id },
      });
    },
    showDeleteModal(value) {
      this.selectedAdd = value;
      this.isModalVisible = true;
    },
    deleteAdd() {
      const addIndex = this.selectedAdd._id;
      deleteAdds(addIndex);
      this.$toastMsg("L'annonce a bien été supprimée !", "success");
      this.$emit("addDeleted", this.selectedAdd._id);
      this.closeModal();
    },
  },
};
</script>

<style lang="scss">
.table-wrapper {
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
  a {
    text-decoration: none;
    font-weight: 500;
  }
  &__delete-icon {
    padding: 0 20px;
    &:hover {
      cursor: pointer;
      color: red;
    }
  }
}
</style>
