<template>
  <div class="table">
    <div v-if="props.userAdds.length > 0" class="table__content">
      <div v-if="!isTabletOrMobile">
        <table>
          <thead>
            <tr>
              <th v-for="(obj, ind) in props.config" :key="ind">
                {{ obj.title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, index) in props.userAdds"
              :key="index"
              :id="props.userAdds._id"
            >
              <td v-for="(obj, ind) in props.config" :key="ind">
                <span v-if="obj.type === 'text'">{{ row[obj.key] }}</span>
                <span v-if="obj.type === 'date'"
                  >{{ new Date(row[obj.key]).toLocaleDateString() }}
                </span>
                <span v-if="obj.type === 'number'">{{ row[obj.key] }}</span>
                <figure v-if="obj.type === 'image'">
                  <img :src="row[obj.key]" width="auto" />
                </figure>
                <span v-if="!obj.type">{{ row[obj.key] }}</span>
                <div
                  class="d-flex justify-center"
                  v-if="obj.title === 'Actions'"
                >
                  <router-link
                    :to="{
                      name: 'UserAddsDetails',
                      params: { id: row['_id'] },
                    }"
                    ><i class="fa fa-eye" aria-hidden="true"></i
                  ></router-link>
                  <div class="table__delete-icon">
                    <span @click="showDeleteModal(row)">
                      <i class="fa fa-trash" aria-hidden="true"></i
                    ></span>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <table class="table__responsive">
          <tr v-for="(obj, ind) in props.config" :key="ind">
            <th class="table__responsive-title">
              {{ obj.title }}
            </th>
            <th
              class="table__responsive-cell"
              v-for="(row, index) in props.userAdds"
              :key="index"
              :id="props.userAdds._id"
            >
              <span
                class="table__responsive-cell-content"
                v-if="obj.type === 'text'"
                >{{ row[obj.key] }}</span
              >
              <span v-if="obj.type === 'date'"
                >{{ new Date(row[obj.key]).toLocaleDateString() }}
              </span>
              <span v-if="obj.type === 'number'">{{ row[obj.key] }}</span>
              <figure v-if="obj.type === 'image'">
                <img :src="row[obj.key]" width="auto" />
              </figure>
              <span v-if="!obj.type">{{ row[obj.key] }}</span>
              <div
                :class="[
                  isTabletOrMobile
                    ? 'table__responsive-cell-action'
                    : 'table__cell-action',
                ]"
                v-if="obj.title === 'Actions'"
              >
                <router-link
                  :to="{
                    name: 'UserAddsDetails',
                    params: { id: row['_id'] },
                  }"
                  ><i class="fa fa-eye" aria-hidden="true"></i
                ></router-link>
                <div>
                  <span @click="showDeleteModal(row)">
                    <i class="fa fa-trash" aria-hidden="true"></i
                  ></span>
                </div>
              </div>
            </th>
          </tr>
        </table>
      </div>
    </div>
    <div v-else class="table__empty-wrapper center">
      <div class="table__empty-content p-20">
        <h2>Vous n'avez aucune annonce en ligne</h2>
      </div>
    </div>
    <Modal
      v-show="state.isModalVisible"
      @close="closeModal"
      @delete="deleteAdd()"
    >
      <template #header>
        <h2>Vous allez supprimer {{ state.selectedAdd.title }}</h2>
      </template>

      <template #body>
        <p>
          Crée le {{ new Date(state.selectedAdd.date).toLocaleDateString() }}
        </p>
        <p>Au prix de {{ state.selectedAdd.price }}</p>
        <p>Cette action est irréversible !</p>
      </template>

      <template #footer>
        <p>Oui, je souhaite supprimer l'annonce</p>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { reactive, computed, defineEmits, defineProps, inject } from "vue";
import { useStore } from "vuex";
import Modal from "../Modal/Modal.vue";
import { deleteAdds } from "@/api/adds";

const state = reactive({
  isModalVisible: false,
  selectedAdd: {},
});

const props = defineProps(["userAdds", "config"]);
const emit = defineEmits("addDeleted");
const store = useStore();
const toast = inject("toastMsg");

const closeModal = () => {
  state.isModalVisible = false;
};

const showDeleteModal = (value) => {
  state.selectedAdd = value;
  state.isModalVisible = true;
};

const deleteAdd = () => {
  const addIndex = state.selectedAdd._id;
  deleteAdds(addIndex);
  toast("L'annonce a bien été supprimée !", "success");
  emit("addDeleted", state.selectedAdd._id);
  closeModal();
};
const isTabletOrMobile = computed(() => {
  return store.state.windowWidth < 800;
});
</script>

<style lang="scss">
@use "../../assets/scss/mixins";

.table {
  &__content {
    border: 1px solid #999;
    border-radius: 4px;
    color: #333;
    overflow: auto;
    overflow: hidden;
    margin-top: 30px;
    figure {
      margin-block-start: 0;
      margin-block-end: 0;
      margin-inline-start: 0;
      margin-inline-end: 0;
      img {
        border: 1px solid #bbb;
        border-radius: 50%;
        height: 60px;
        width: 60px;
        @media (max-width: 800px) {
          height: 40px;
          width: 40px;
        }
      }
    }
    table {
      border-collapse: collapse;
      border: 1px solid #4f95ff;
      width: 100%;
      tr {
        @media (min-width: 800px) {
          &:nth-child(odd) {
            background: var(--gray-2);
          }
        }

        th {
          position: sticky;
          top: 0;
          @media (min-width: 800px) {
            background: #4f95ff;
          }
          width: 50px;
          padding: 10px 5px;
          text-align: center;
          border-bottom: 1px solid #999;
        }

        td {
          padding: 5px 5px;
          text-align: center;

          span {
            font-weight: 400px;
            font-size: 16px;
          }
        }
      }
      &__cell-action {
        display: flex;
        justify-content: center;
      }
    }
    a {
      text-decoration: none;
      font-weight: 500;
    }
  }
  &__delete-icon {
    padding: 0 20px;
    &:hover {
      cursor: pointer;
      color: red;
    }
  }
  &__empty-wrapper {
    width: 100%;
    height: calc(100% - 60px);
  }
  &__empty {
    width: 320px;
    border: 1px solid #000;
    border-radius: 5px;
  }
  &__responsive {
    table-layout: fixed;
    width: 100%;
    &-title {
      height: 100px;
      padding: 0;
      background-color: #4f95ff;
      font-size: 16px;
      @include mixins.xs {
        font-size: 10px;
        word-wrap: break-word;
      }
    }
    &-cell {
      height: 100px;
      padding: 5px;
      word-wrap: break-word;
      width: 15%;
      font-size: 14px;
      &:nth-child(odd) {
        background: var(--gray-2);
      }

      @include mixins.xs {
        font-size: 10px;
        padding: 0 2px;
      }

      &-content {
        word-wrap: break-word;
        font-size: 14px;
        @include mixins.xs {
          font-size: 10px;
        }
      }
      &-action {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    }
  }
}
</style>
