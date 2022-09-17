<template>
  <div class="FavoriteModal">
    <span @click.prevent="isModalOpen = true"
      ><i class="fa fa-trash icon" aria-hidden="true"></i
    ></span>

    <Teleport to="#modal">
      <div class="FavoriteModal__bg" v-if="isModalOpen">
        <div class="FavoriteModal__modal" ref="modal">
          <div class="mb-20 d-flex justify-end">
            <button
              class="btn btn-primary"
              @click.prevent="isModalOpen = false"
            >
              X
            </button>
          </div>
          <div class="FavoriteModal__text">
            Souhaitez vous supprimer
            <span class="FavoriteModal__text-title">
              {{ favorite.title }}
            </span>
            de vos favoris ?
          </div>
          <div class="d-flex justify-center mt-20">
            <button
              class="btn btn-danger"
              @click="this.$emit('deleteAdd', favorite)"
            >
              <span><i class="fa fa-trash icon" aria-hidden="true"></i></span>
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script>
import { onClickOutside } from "@vueuse/core";
import { ref, watch } from "vue";

export default {
  props: {
    favorite: Object,
    toggle: Boolean,
  },
  setup(props) {
    const isModalOpen = ref(false);

    const modal = ref(null);

    onClickOutside(modal, () => (isModalOpen.value = false));

    watch(props.toggle, (newValue) => {
      isModalOpen.value = newValue;
    });

    return {
      isModalOpen,
      modal,
    };
  },
};
</script>

<style lang="scss">
.FavoriteModal {
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
    background: var(--gray-1);
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 10px 5px 2px rgba(0, 0, 0, 0.1);
  }
  &__text {
    font-size: 1.2rem;
    font-weight: bold;
    color: #000;
    &-title {
      color: red;
    }
  }
}
</style>
