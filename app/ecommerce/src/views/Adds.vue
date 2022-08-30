<template>
  <Toolbar>Liste des annonces</Toolbar>
  <loading
    v-model:active="state.isLoading"
    :can-cancel="true"
    :is-full-page="state.fullPage"
  />
  <div
    class="adds"
    v-if="state.adds"
    :style="{ marginLeft: sideBarClosed ? '25px' : '230px' }"
  >
    <AddCard
      v-for="add in state.adds"
      :key="add.id"
      :add="add"
      @add-item="addToFavorites(add)"
    />
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import AddCard from "../components/AddCard/AddCard";
import Toolbar from "../components/Toolbar/Toolbar";
import { useStore } from "vuex";
import { getFakeAdds } from "../api/adds";
import "vue-loading-overlay/dist/vue-loading.css";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { inject } from "vue";

const state = reactive({
  adds: null,
  noResult: false,
  message: "",
  isLoading: false,
  fullPage: true,
});

onMounted(() => {
  loadFakeAdds();
});

const store = useStore();

const toast = inject("toastMsg");
const sideBarClosed = inject("collapsed");

async function loadFakeAdds() {
  try {
    state.isLoading = true;
    const { data } = await getFakeAdds();
    if (data.products) {
      state.adds = data.products;
      state.isLoading = false;
    } else {
      state.noResult = true;
      state.message = "Aucunes annonces trouvées !";
    }
  } catch (error) {
    state.noResult = true;
    state.message = "Erreur lors du chargement des annonces";
  }
}

function addToFavorites(add) {
  store.dispatch("sendFavorite", add).then(() => {
    toast("L'annonce a été ajoutée à vos favoris !", "success");
  });
}
</script>

<style lang="scss" scoped>
.adds {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
