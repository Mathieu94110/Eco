<script setup lang="ts">
import { reactive, watch, ref, inject } from "vue";
import { useStore } from "vuex";
import CreatedAdCard from "@/components/CreatedAdCard/CreatedAdCard.vue";
import CreateAdCard from "@/components/CreateAdCard/CreateAdCard.vue";
import type { UserAdInterface, ToastInterface } from "@/types";
import mysteryImage from "@/assets/images/mystery-image.png";

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
const store = useStore();
const isAdCreated = ref<boolean>(false);
const userId = store?.state.user._id;

const createAd = async (ad: UserAdInterface) => {
  await store.dispatch("createPost", {
    userFrom: userId,
    title: ad.title,
    description: ad.description,
    category: ad.category,
    price: ad.price,
    image: ad.image || mysteryImage,
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
  }
);
</script>

<template>
  <div class="create-ad">
    <div class="create-ad__container">
      <CreateAdCard class="create-ad__form" :is-ad-created="isAdCreated" :is-ad-cancel="state.isAdCancel"
        @create-ad="createAd" @cancel-ad="cancelAd" @submit-ad="submitAd" />
      <Transition name="create-ad-fade">
        <CreatedAdCard v-if="state.showCreatedPost" class="create-ad__preview" :current-post="state.post" />
      </Transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/mixins" as m;

.create-ad {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &__container {
    width: 100%;
    display: flex;
    flex-direction: column;

    @include m.lg {
      flex-direction: row;
      justify-content: space-evenly;
      align-items: flex-start;
      height: calc(100vh - 60px);
    }
  }

  &__form {
    flex: 1;
  }

  &__preview {
    flex: 1;
    margin-top: 20px;

    @include m.lg {
      margin-top: 0;
    }
  }
}

.create-ad-fade-enter-active,
.create-ad-fade-leave-active {
  transition: all 0.4s ease-in-out;
}

.create-ad-fade-enter-from,
.create-ad-fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
