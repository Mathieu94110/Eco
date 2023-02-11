<script setup lang="ts">
import { computed, reactive, watch, ref, inject } from "vue";
import Toolbar from "@/components/Toolbar/ToolbarComponent.vue";
import CreatedAddCard from "@/components/CreatedAddCard/CreatedAddCardComponent.vue";
import { useStore } from "vuex";
import type { UserAddInterface } from "@/shared/interfaces";
import CreateAddCard from "../components/CreateAddCard/CreateAddCardComponent.vue";
import mysteryImage from "../assets/images/mystery-image.png";

const state = reactive<{
  post: UserAddInterface;
  showCreatedPost: boolean;
  isAddCancel: boolean;
}>({
  post: {} as UserAddInterface,
  showCreatedPost: false,
  isAddCancel: false,
});

const toastMsg = inject("toastMsg") as (x: string, y: string) => void;
const sideBarClosed = inject<boolean>("collapsed");

const store = useStore();
const isAddCreated = ref<boolean>(false);
const currentUser = computed<string>(() => store?.state.user.userId);
const isMobile = computed<boolean>(() => store?.state.windowWidth < 575);

const createAdd = async (add: UserAddInterface) => {
  await store.dispatch("createPost", {
    userFrom: currentUser.value,
    title: add.title,
    description: add.description,
    category: add.category,
    price: add.price,
    image: add.image ? add.image : mysteryImage,
  });
  state.showCreatedPost = true;
  isAddCreated.value = true;
};
const submitAdd = async (): Promise<void> => {
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
    isAddCreated.value = false;
    state.showCreatedPost = false;
    toastMsg("L'annonce a bien été postée!", "success");
  } catch (e) {
    console.error(e);
  }
};

const cancelAdd = async () => {
  try {
    await store.dispatch("resetForm", {
      userFrom: "",
      image: "",
      title: "",
      description: "",
      price: null,
      category: "",
    });

    isAddCreated.value = false;
    state.showCreatedPost = false;
    state.isAddCancel = true;
    toastMsg("L'annonce a bien été annulée !", "info");
  } catch (e) {
    console.error(e);
  }
};

watch(
  () => store?.state.currentPost,
  (newValue: UserAddInterface) => {
    state.post = newValue;
  }
);
</script>

<template>
  <div class="create-add">
    <Toolbar> Poster une annonce </Toolbar>
    <div
      class="create-add__items"
      :style="{
        marginLeft: isMobile ? '0px' : sideBarClosed ? '115px' : '300px',
      }"
    >
      <div class="create-add__items-wrapper">
        <CreateAddCard :is-add-created="isAddCreated" :is-add-cancel="state.isAddCancel" @create-add="createAdd" @cancel-add="cancelAdd" @submit-add="submitAdd"></CreateAddCard>
        <Transition name="nested">
          <CreatedAddCard v-if="state.showCreatedPost" :current-post="state.post" ref="created-add"></CreatedAddCard>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/mixins" as m;

.create-add {
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
  .create-add {
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
