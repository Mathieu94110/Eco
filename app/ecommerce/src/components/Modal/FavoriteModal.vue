<template>
  <div class="FavoriteModal">
    <span @click.prevent="isModalOpen = true"
      ><i class="fa fa-trash icon" aria-hidden="true"></i
    ></span>

    <Teleport to="#modal">
      <div class="FavoriteModal__bg" v-if="isModalOpen">
        <div class="FavoriteModal__modal" ref="modal">
          <button @click="isModalOpen = false" class="FavoriteModal__close-btn">
            x
          </button>
          <span>{{ favorite.title }}</span>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script>
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";

export default {
  name: "Favorite",
  setup() {
    const isModalOpen = ref(false);

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

<style lang="scss">
.FavoriteModal {
  :hover {
    color: #00fff8;
    cursor: pointer;
  }
  &__bg {
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
  &__modal {
    position: relative;
    background: white;
    padding: 50px 100px;
    border-radius: 5px;
    box-shadow: 0px 10px 5px 2px rgba(0, 0, 0, 0.1);
  }
  &__close-btn {
    position: absolute;
    right: 0;
    top: 0;
    padding: 5px;
    margin: 10px 10px 0 0;
    background: white;
    cursor: pointer;
  }
}
</style>
