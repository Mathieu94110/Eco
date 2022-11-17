<template>
  <div class="user-adds">
    <Toolbar>Mes annonces</Toolbar>
    <div
      :style="{
        marginLeft: isMobile ? 'auto' : sideBarClosed ? '115px' : '300px',
      }"
      class="user-adds__content"
    >
      <loading
        v-model:active="state.isLoading"
        :can-cancel="true"
        :is-full-page="state.fullPage"
      />

      <Pagination
        v-if="state.tableData"
        :totalRecords="state.tableData.length"
        :perPageOptions="state.perPageOptions"
        :isMobile="isMobile"
        @input="setTable($event)"
      />
      <Table
        v-if="state.tableData"
        :userAdds="computedTableData"
        :config="state.config"
        :style="{ height: computedTableData.length > 0 ? 'auto' : '100%' }"
        @delete="deleteAdd($event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Table from '@/components/Table/Table.vue';
import Pagination from '@/components/Pagination/Pagination.vue';
import Toolbar from '@/components/Toolbar/Toolbar.vue';
import addsApi from '@/api/adds';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import {
  reactive, inject, onMounted, computed,
} from 'vue';
import { useStore } from 'vuex';

const perPageOptions = [5, 10, 50];
const store = useStore();
const sideBarClosed = inject('collapsed');
const toast = inject('toastMsg');
const state = reactive({
  perPageOptions,
  tableData: undefined,
  pagination: { page: 1, perPage: perPageOptions[0] },
  isLoading: false,
  fullPage: true,
  config: [
    {
      key: 'title',
      title: 'Titre',
    },
    {
      key: 'image',
      title: 'Image',
    },
    {
      key: 'created_at',
      title: 'Date',
    },
    {
      key: 'description',
      title: 'Description',
    },
    {
      key: 'category',
      title: 'Catégorie',
    },
    {
      key: 'price',
      title: 'Prix',
    },
    {
      key: 'actions',
      title: 'Actions',
    },
  ],
});

const setTable = (data) => {
  state.pagination = data;
};
const getAdds = async () => {
  try {
    state.isLoading = true;
    const { data } = await addsApi.getUserAdds();
    if (data.posts) {
      // In waiting to recover filtered data by user on back-end side, comming soon !
      state.tableData = data.posts.filter(
        (post) => post.author === store.state.user.userId,
      );
      state.isLoading = false;
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteAdd = (add) => {
  try {
    addsApi.deleteAdds(add._id);
    toast("L'annonce a bien été supprimée !", 'success');
    state.tableData = state.tableData.filter((item) => item._id !== add._id);
  } catch (e) {
    console.error(e.message);
  }
};

const computedTableData = computed(() => {
  if (!state.tableData) return [];

  const firstIndex = (state.pagination.page - 1) * state.pagination.perPage;
  const lastIndex = state.pagination.page * state.pagination.perPage;
  return state.tableData.slice(firstIndex, lastIndex);
});
const isMobile = computed(() => store?.state.windowWidth < 575);

onMounted(async () => {
  await getAdds();
});
</script>

<style lang="scss" scoped>
@use '../assets/scss/mixins';
.user-adds {
  font-family: Helvetica, sans-serif;
  font-weight: 400;
  margin: 0;
  &__content {
    padding: 30px;
    height: calc(100% - 60px);
    @media (max-width: 800px) {
      padding: 10px;
    }
  }
}

nav {
  height: 60px;
  background: #222;
  font-size: 32px;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  padding-left: 20px;
}
</style>
