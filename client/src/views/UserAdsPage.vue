<script setup lang="ts">
import { reactive, inject, onMounted, computed } from "vue";
import { useStore } from "vuex";
import Table from "@/components/Table/Table.vue";
import Pagination from "@/components/Pagination/Pagination.vue";
import Toolbar from "@/components/Toolbar/Toolbar.vue";
import { getAds, deleteAd } from "@/api";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

import type {
  UserAdInterface,
  userAdsConfigInterface,
  ToastInterface,
  userAdsPaginationInterface,
} from "@/shared/interfaces";
import { userAdsConfig } from "@/constants/userAds";

const perPageOptions: number[] = [5, 10, 50];
const store = useStore();
const sideBarClosed = inject<boolean>("collapsed");
const toast = inject<ToastInterface>("toastMsg")!;
const state = reactive<{
  perPageOptions: number[];
  tableData: UserAdInterface[];
  pagination: userAdsPaginationInterface;
  isLoading: boolean;
  fullPage: boolean;
  config: userAdsConfigInterface[];
}>({
  perPageOptions,
  tableData: [],
  pagination: { page: 1, perPage: perPageOptions[0] },
  isLoading: false,
  fullPage: true,
  config: userAdsConfig,
});

const setTable = (data: userAdsPaginationInterface) => {
  state.pagination = data;
};
const getUserAds = async (): Promise<void> => {
  state.isLoading = true;
  try {
    const variable: { userFrom: string } = {
      userFrom: store.state.user.userId,
    };
    const userAds = await getAds(variable);
    if (userAds) {
      state.tableData = userAds;
      state.isLoading = false;
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteUserAd = async (ad: UserAdInterface): Promise<void> => {
  try {
    const variables = {
      _id: ad._id,
      userFrom: store.state.user.userId,
    };
    await deleteAd(variables);
    toast("L'annonce a bien été supprimée !", "success");
    state.tableData = state.tableData.filter((data: UserAdInterface) => data._id !== ad._id);
  } catch (e) {
    console.error(e);
  }
};

const computedTableData = computed<UserAdInterface[]>((): UserAdInterface[] | [] => {
  if (state.tableData.length === 0) return [];
  const firstIndex = (state.pagination.page - 1) * state.pagination.perPage;
  const lastIndex = state.pagination.page * state.pagination.perPage;
  return state.tableData.slice(firstIndex, lastIndex);
});
const isMobile = computed<boolean>(() => store?.state.windowWidth < 575);

onMounted(async () => {
  await getUserAds();
});
</script>

<template>
  <div class="user-ads">
    <Toolbar>Mes annonces</Toolbar>
    <div
      :style="{
        marginLeft: isMobile ? 'auto' : sideBarClosed ? '115px' : '300px',
      }"
      class="user-ads__content"
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
        :user-ads="computedTableData"
        :config="state.config"
        :style="{ height: computedTableData.length > 0 ? 'auto' : '100%' }"
        @delete="deleteUserAd($event)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/mixins";

.user-ads {
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
