<template>
  <span @click="isModalOpen = true"
    ><i class="fa fa-eye" aria-hidden="true"></i
  ></span>

  <Teleport to="#modal">
    <div class="modal-bg" v-if="isModalOpen">
      <div class="modal" ref="modal">
        <button @click="isModalOpen = false" class="close-btn">x</button>
        <span>{{ favorite.title }}</span>
      </div>
    </div>
  </Teleport>
</template>

<script>
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";

export default {
  name: "Favorite",
  setup() {
    const isModalOpen = ref(true);

    const modal = ref(null);

    onClickOutside(modal, () => (isModalOpen.value = false));

    return {
      isModalOpen,
      modal,
    };
  },
  props: {
    favorite: Object,
  },

  onMounted() {
    console.log(this.favorite);
  },
  onUnmounted() {
    this.modal = ref(null);
    this.isModalOpen = false;
  },
};
</script>

<style>
.wrapper {
  width: 100%;
  height: 100%;
}
.modal-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  position: relative;
  background: white;
  padding: 50px 100px;
  border-radius: 5px;
  box-shadow: 0px 10px 5px 2px rgba(0, 0, 0, 0.1);
}
.modal-btn {
  padding: 10px;
  background: white;
  cursor: pointer;
}
.close-btn {
  position: absolute;
  right: 0;
  top: 0;
  padding: 20px;
  background: white;
  cursor: pointer;
}
</style>
