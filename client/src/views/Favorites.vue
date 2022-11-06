<template>
  <Toolbar>Mes favoris</Toolbar>

  <div
    :style="{
      marginLeft: isMobile ? 'auto' : sideBarClosed ? '115px' : '300px',
    }"
  >
    <TransitionGroup name='list' tag='ul' class='favorites'>
      <FavoriteCard
        v-for='add in state.favorites'
        :key='add.id'
        :add='add'
        @send-favorite='sendFavoriteDetails($event)'
        @delete='deleteAdd($event)'
      />
    </TransitionGroup>
  </div>
</template>

<script setup>

import {
  reactive, onMounted, computed, inject,
} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Toolbar from '@/components/Toolbar/Toolbar.vue';
import FavoriteCard from '@/components/Card/FavoriteCard.vue';
import addsApi from '../api/adds';

const state = reactive({
  favorites: [],
  isLoading: false,
});
const sideBarClosed = inject('collapsed');
const toast = inject('toastMsg');

const store = useStore();
const router = useRouter();

const isMobile = computed(() => store?.state.windowWidth < 575);

const getUserFavorites = async () => {
  try {
    state.isLoading = true;
    const { data } = await addsApi.getFavorites();
    if (data.posts) {
      // In waiting to recover filtered data by user on back-end side, comming soon !
      state.favorites = data.posts.filter(
        (post) => post.author === store.state.user.userId,
      );
      state.isLoading = false;
    }
  } catch (error) {
    console.log(error);
  }
};
const sendFavoriteDetails = (add) => {
  store
    .dispatch('sendFavoriteDetails', {
      favorite: add,
    })
    .then(() => {
      router.push({
        name: 'FavoritesDetails',
        params: { add: add.title },
      });
    });
};
const deleteAdd = (add) => {
  addsApi.deleteFavorite(add._id);
  toast('L\'annonce a bien été supprimée !', 'success');
  state.favorites = state.favorites.filter(
    (favorite) => favorite._id !== add._id,
  );
};

onMounted(() => {
  console.log(addsApi);
  getUserFavorites();
});

</script>

<style lang='scss' scoped>
@use '../assets/scss/mixins';
.favorites {
  height: calc(100% - 60px);
  padding: 20px 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  @include mixins.xs {
    justify-content: center;
  }
}
//Transition
.list-enter-active {
  animation: bounce-in 0.5s;
}
.list-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
