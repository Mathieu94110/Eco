<script setup lang="ts">
import { reactive, onMounted, computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import type { FakeAdInterface } from "@/types/interfaces";
import { addToFavorites, removeFromFavorites } from "@/api";
import toast from "@/mixins/toast";

const router = useRouter();
const store = useStore();
const state = reactive<{
  adInfos: FakeAdInterface | null;
}>({
  adInfos: null,
});

const adDetails = computed<FakeAdInterface>(() => store?.getters.getAdDetails);
const favorites = computed<FakeAdInterface[]>(() => store?.getters.getFavorites);

const userId = store?.state.user._id;
const isFavorited = ref<boolean>(false);

const toggleOnFavorites = async (ad: any): Promise<void> => {
  if (isFavorited.value) {
    const variables = {
      id: ad.id,
      userFrom: userId,
    };
    const oldFavorites = store?.state.currentFavorites;
    await removeFromFavorites(variables);

    const newFavorites = oldFavorites.filter((favorite: FakeAdInterface) => favorite.id !== ad.id);
    await store.dispatch("userFavorites", newFavorites);
    toast("L'annonce a été retirée de vos favoris !", "success");
  } else {
    const userFavorite = { ...ad, userFrom: userId };
    try {
      await addToFavorites(userFavorite);
      await store.dispatch("userFavorites", [...favorites.value, { ...ad }]);
      toast("L'annonce a été ajoutée à vos favoris !", "success");
    } catch (e) {
      console.error(e);
    }
  }
};

const goBack = (): void => {
  router.back();
};

onMounted(() => {
  if (adDetails.value) {
    state.adInfos = adDetails.value;
  }
});

watch(
  () => favorites.value,
  () => {
    isFavorited.value = favorites.value.some((favorite: FakeAdInterface) => favorite.id === adDetails.value.id);
  },
  { immediate: true },
);
</script>

<template>
  <div class="ad-details">
    <div class="ad-details__header">
      <button class="btn btn-primary" @click="goBack()">Retour</button>
    </div>
    <div class="ad-details__content">
      <div class="ad-details__layout">
        <div class="ad-details__single">
          <div class="ad-details__img" v-if="state.adInfos">
            <img :src="state.adInfos.images[0]" alt="{{state.adInfos.title}}" />
          </div>
          <div class="ad-details__right">
            <h1 class="ad-details__title">{{ state.adInfos?.title }}</h1>
            <p class="ad-details__items"><span>Catégorie:</span> {{ state.adInfos?.category }}</p>
            <p class="ad-details__items"><span>Description:</span> {{ state.adInfos?.description }}</p>
            <p class="ad-details__items"><span>Remise:</span> {{ state.adInfos?.discountPercentage }} %</p>
            <p class="ad-details__items"><span>Marque:</span> {{ state.adInfos?.brand }}</p>
            <p class="ad-details__items"><span>Prix:</span> {{ state.adInfos?.price }} €</p>

            <div class="ad-details__buttons">
              <button class="ad-details__toggle-button" @click="toggleOnFavorites(adDetails)">
                <span v-if="isFavorited">Retirer des favoris</span>
                <span v-else>Ajouter aux favoris</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "../assets/scss/mixins" as m;
.ad-details {
  width: 100%;
  padding: 0 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @include m.xs {
    align-items: start;
  }
  @include m.xs-xl {
    padding: 0 20px;
  }
  &__header {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    left: 0;
    top: 0;
    padding: 0 20px;
    @include m.xs {
      width: 60%;
      padding: 0 10px;
      height: 64px;
    }
    input {
      background-image: linear-gradient(#42a1ec, #0070c9);
      border: 1px solid var(----primary-2);
      border-radius: 4px;
      color: var(--primary-color);
      cursor: pointer;
      font-size: 17px;
      font-weight: 400;
      letter-spacing: -0.022em;
      min-width: 30px;
      padding: 4px 15px;
      height: 40px;
      text-align: center;
      &:hover {
        background-image: linear-gradient(#51a9ee, #147bcd);
        border-color: var(----primary-2);
        text-decoration: none;
      }
    }
  }
  &__content {
    margin: 20px 0;
    @include m.md {
      margin: 75px 0;
    }
  }
  &__layout {
    max-width: calc(100% - 20px);
    margin: 0 auto;
    padding: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    &:hover {
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }

    @include m.md {
      max-width: 1200px;
    }
  }
  &__single {
    display: flex;
    flex-direction: column;
    @include m.md {
      flex-direction: row;
    }
  }
  &__img {
    width: 100%;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @include m.md {
      width: 600px;
      height: 600px;
    }
    @include m.xs {
      height: 200px;
    }
    img {
      width: 70%;
      height: 70%;
      display: block;
      @include m.xs-xl {
        width: auto;
        height: 250px;
      }
    }
  }
  &__right {
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    position: relative;
    @include m.md {
      padding: 0 35px;
    }
  }
  &__title {
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 20px;
    color: #000;
    font-weight: 600;
    @include m.md {
      font-size: 24px;
      line-height: 32px;
    }
  }
  &__items {
    font-size: 24px;
    line-height: 32px;
    margin-bottom: 20px;
    color: #000;
    > span {
      color: var(--primary-2);
      font-weight: 500;
    }
    @include m.xs-xl {
      font-size: 14px;
    }
  }
  &__buttons {
    display: flex;
    @include m.md {
      margin-top: 30px;
      justify-content: center;
    }
    @include m.xs-xl {
      justify-content: center;
    }
  }
  &__toggle-button {
    background: var(--danger-1);
    border: 1px solid var(----primary-2);
    border-radius: 4px;
    color: var(--primary-color);
    cursor: pointer;
    font-size: 17px;
    font-weight: 400;
    letter-spacing: -0.022em;
    min-width: 30px;
    padding: 4px 15px;
    height: 40px;
    text-align: center;
    position: absolute;
    bottom: 20px;
    @include m.xs-xl {
      font-size: 14px;
      padding: 2px 4px;
      position: static;
    }
  }
}
</style>
