<script setup lang="ts">
import Table from "@/components/Table/TableComponent.vue";
import Pagination from "@/components/Pagination/PaginationComponent.vue";
import Toolbar from "@/components/Toolbar/ToolbarComponent.vue";
import { getUserAdds, deleteUserAdd } from "@/api";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import { reactive, inject, onMounted, computed } from "vue";
import { useStore } from "vuex";
import type { UserAddInterface } from "@/shared/interfaces";

const perPageOptions: number[] = [5, 10, 50];
const store = useStore();
const sideBarClosed = inject<boolean>("collapsed");
const toast = inject("toastMsg") as (x: string, y: string) => void;
const state = reactive<{
  perPageOptions: number[];
  tableData: UserAddInterface[];
  pagination: { page: number; perPage: number };
  isLoading: boolean;
  fullPage: boolean;
  config: { key: string; title: string }[];
}>({
  perPageOptions,
  tableData: [],
  pagination: { page: 1, perPage: perPageOptions[0] },
  isLoading: false,
  fullPage: true,
  config: [
    {
      key: "title",
      title: "Titre",
    },
    {
      key: "image",
      title: "Image",
    },
    {
      key: "created_at",
      title: "Date",
    },
    {
      key: "description",
      title: "Description",
    },
    {
      key: "category",
      title: "Catégorie",
    },
    {
      key: "price",
      title: "Prix",
    },
    {
      key: "actions",
      title: "Actions",
    },
  ],
});

const setTable = (data: { page: number; perPage: number }) => {
  state.pagination = data;
};
const getAdds = async (): Promise<void> => {
  state.isLoading = true;
  try {
    const variable: { userFrom: string } = {
      userFrom: store.state.user.userId,
    };
    const userAdds = await getUserAdds(variable);
    if (userAdds) {
      state.tableData = userAdds;
      state.isLoading = false;
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteAdd = async (add: UserAddInterface): Promise<void> => {
  try {
    const variables = {
      _id: add._id,
      userFrom: store.state.user.userId,
    };
    await deleteUserAdd(variables);
    toast("L'annonce a bien été supprimée !", "success");
    state.tableData = state.tableData.filter((data: UserAddInterface) => data._id !== add._id);
  } catch (e) {
    console.error(e);
  }
};

const computedTableData = computed<UserAddInterface[]>((): UserAddInterface[] | [] => {
  if (state.tableData.length === 0) return [];
  const firstIndex = (state.pagination.page - 1) * state.pagination.perPage;
  const lastIndex = state.pagination.page * state.pagination.perPage;
  return state.tableData.slice(firstIndex, lastIndex);
});
const isMobile = computed<boolean>(() => store?.state.windowWidth < 575);

onMounted(async () => {
  await getAdds();
});
</script>

<template>
  <div class="user-adds">
    <Toolbar>Mes annonces</Toolbar>
    <div
      :style="{
        marginLeft: isMobile ? 'auto' : sideBarClosed ? '115px' : '300px',
      }"
      class="user-adds__content"
    >
      <loading v-model:active="state.isLoading" :can-cancel="true" :is-full-page="state.fullPage" />

      <Pagination
        v-if="state.tableData"
        :total-records="state.tableData.length"
        :per-page-options="state.perPageOptions"
        :is-mobile="isMobile"
        @input="setTable($event)"
      />
      <Table
        v-if="state.tableData"
        :user-adds="computedTableData"
        :config="state.config"
        :style="{ height: computedTableData.length > 0 ? 'auto' : '100%' }"
        @delete="deleteAdd($event)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/mixins";

.user-adds {
  font-family: Helvetica, sans-serif;
  font-weight: 400;
  margin: 0;

  &__content {
    padding: 30px;
    height: calc(100vh - 60px);

    @include mixins.xs {
      padding: 10px;
      font-size: 0.7rem;
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
