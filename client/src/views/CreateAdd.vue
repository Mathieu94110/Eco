<script setup lang="ts">
import { computed, reactive, watch, ref, inject } from "vue";
import Toolbar from "@/components/Toolbar/Toolbar.vue";
import CreatedAddCard from "@/components/CreatedAddCard/CreatedAddCard.vue";
import { useStore } from "vuex";
import type { UserAddInterface } from "@/shared/interfaces";
import CreateAddCard from "../components/CreateAddCard/CreateAddCard.vue";

const state = reactive<{
  post: UserAddInterface;
  showCreatedPost: boolean;
  isAddCancel: boolean;
}>({
  post: {
    userFrom: "",
    image: "",
    title: "",
    description: "",
    price: 0,
    category: "",
  },
  showCreatedPost: false,
  isAddCancel: false
});

const toastMsg = inject("toastMsg") as any;
const sideBarClosed = inject<boolean>("collapsed");

const store = useStore();
const isAddCreated = ref<boolean>(false);

const currentUser = computed<string>(() => store?.state.user.userId);
const isMobile = computed<boolean>(() => store?.state.windowWidth < 575);

const postIsCreate = (): void => {
  state.showCreatedPost = true;
};

const createAdd = async (add: UserAddInterface) => {
  try {
    await store.dispatch("createPost", {
      userFrom: currentUser.value,
      title: add.title,
      description: add.description,
      category: add.category,
      price: add.price,
      image: add.image,
    });

    postIsCreate();
    isAddCreated.value = true;
  } catch (e: unknown) {
    toastMsg(e, "error");
  }
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

const currentPost = computed<UserAddInterface>(() => store?.state.currentPost);

watch(currentPost, (newValue: UserAddInterface): void => {
  state.post = newValue;
});
</script>

<template>
  <div class="create-add">
    <Toolbar> Poster une annonce </Toolbar>
    <div class="create-add__items" :style="{
      marginLeft: isMobile ? '0px' : sideBarClosed ? '115px' : '300px',
    }">
      <div class="create-add__items-wrapper">
        <CreateAddCard :isAddCreated="isAddCreated" :isAddCancel="state.isAddCancel"  @create-add="createAdd" @cancel-add="cancelAdd" @submit-add="submitAdd"></CreateAddCard>
        <Transition name="nested"> 
          <CreatedAddCard v-if="state.showCreatedPost" :currentPost="state.post" ref="created-add"></CreatedAddCard>
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
