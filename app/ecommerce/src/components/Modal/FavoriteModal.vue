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
          <div class="FavoriteModal__text">
            Souhaitez vous supprimer
            <span class="FavoriteModal__text-title"
              >" {{ favorite.title }} "</span
            >
            de vos favoris ?
          </div>
          <button class="btn btn-delete" @click="removefromFavorites(favorite)">
            <span class="mdi mdi-delete mdi-24px"></span>
            <span class="mdi mdi-delete-empty mdi-24px"></span>
            <span><i class="fa fa-trash icon" aria-hidden="true"></i></span>
          </button>
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
$delete-red: red;

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
  &__text {
    font-size: 1.2rem;
    font-weight: bold;
    color: red;
    &-title {
      color: #000;
    }
  }
}
.btn {
  display: flex;
  align-items: center;
  background: none;
  border: 1px solid lighten(gray, 24%);
  height: 48px;
  padding: 0 24px 0 16px;
  letter-spacing: 0.25px;
  border-radius: 50%;
  margin: 20px auto 0;
  cursor: pointer;
  font-weight: 600;
  &:focus {
    outline: none;
  }

  .mdi {
    margin-right: 8px;
  }
}

.btn-delete {
  font-size: 16px;
  color: #000;

  > .mdi-delete-empty {
    display: none;
  }

  &:hover {
    background-color: red;
    color: #fff;
    > .mdi-delete-empty {
      display: block;
    }

    > .mdi-delete {
      display: none;
    }
  }

  &:focus {
    box-shadow: 0 0 0 4px lighten(red, 40%);
  }
}
</style>
