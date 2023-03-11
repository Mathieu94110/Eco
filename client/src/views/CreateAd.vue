<script setup lang="ts">
import { computed, reactive, watch, ref, inject } from "vue";
import Toolbar from "@/components/Toolbar/Toolbar.vue";
import { useStore } from "vuex";
import createdAdCard from "@/components/CreatedAdCard/CreatedAdCard.vue";
import CreateAdCard from "../components/CreateAdCard/CreateAdCard.vue";
import type { UserAdInterface, ToastInterface } from "@/shared/interfaces";
import mysteryImage from "../assets/images/mystery-image.png";

const state = reactive<{
  post: UserAdInterface;
  showCreatedPost: boolean;
  isAdCancel: boolean;
}>({
  post: {} as UserAdInterface,
  showCreatedPost: false,
  isAdCancel: false,
});

const toastMsg = inject<ToastInterface>("toastMsg")!;
const sideBarClosed = inject<boolean>("collapsed");

const store = useStore();
const isAdCreated = ref<boolean>(false);
const userId = store?.state.user._id;
const isMobile = computed<boolean>(() => store?.state.windowWidth < 575);

const createAd = async (ad: UserAdInterface) => {
  await store.dispatch("createPost", {
    userFrom: userId,
    title: ad.title,
    description: ad.description,
    category: ad.category,
    price: ad.price,
    image: ad.image ? ad.image : mysteryImage,
  });
  state.showCreatedPost = true;
  isAdCreated.value = true;
};
const submitAd = async (): Promise<void> => {
  try {
    await store.dispatch("sendPost");
    await store.dispatch("resetForm", {
      userFrom: "",
      image: "",
      title: "",
      description: "",
      price: null,
      category: "",
    });
    isAdCreated.value = false;
    state.showCreatedPost = false;
    toastMsg("L'annonce a bien été postée!", "success");
  } catch (e) {
    console.error(e);
  }
};

const cancelAd = async () => {
  try {
    await store.dispatch("resetForm", {
      userFrom: "",
      image: "",
      title: "",
      description: "",
      price: null,
      category: "",
    });

    isAdCreated.value = false;
    state.showCreatedPost = false;
    state.isAdCancel = true;
    toastMsg("L'annonce a bien été annulée !", "info");
  } catch (e) {
    console.error(e);
  }
};

watch(
  () => store?.state.currentPost,
  (newValue: UserAdInterface) => {
    state.post = newValue;
  },
);
</script>

<template>
  <div class="create-ad">
    <Toolbar> Poster une annonce </Toolbar>
    <div
      class="create-ad__items"
      :style="{
        marginLeft: isMobile ? '0px' : sideBarClosed ? '115px' : '300px',
      }"
    >
      <div class="create-ad__items-wrapper">
        <CreateAdCard
          :is-ad-created="isAdCreated"
          :is-ad-cancel="state.isAdCancel"
          @create-ad="createAd"
          @cancel-ad="cancelAd"
          @submit-ad="submitAd"
          ref="create-ad"
        ></CreateAdCard>
        <Transition name="nested">
          <createdAdCard v-if="state.showCreatedPost" :current-post="state.post" ref="created-ad"></createdAdCard>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/mixins" as m;

.create-ad {
  align-items: center;
  display: block;
  &__items {
    display: block;
    margin: 0;
    height: 100%;
    color: #181818;
    font-weight: 700;

    div:first-child {
      display: block;
    }

    &-wrapper {
      display: block;
      height: 100%;
    }
  }
}

@include m.lg {
  .create-ad {
    height: 100%;
    width: 100%;
    align-items: center;

    &__items {
      height: calc(100% - 60px);

      div:first-child {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
      }
    }
  }
}

//Transition
.nested-enter-active,
.nested-leave-active {
  transition: all 0.4s ease-in-out;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>
