<template>
  <div class="FavoriteModal">
    <span @click.prevent="isModalOpen = true"
      ><i class="fa fa-trash icon" aria-hidden="true"></i
    ></span>

    <Teleport to="#modal">
      <div class="FavoriteModal__bg" v-if="isModalOpen">
        <div class="FavoriteModal__modal" ref="modal">
          <div class="FavoriteModal__close-btn">
            <span
              class="FavoriteModal__close-btn-btn"
              @click.prevent="isModalOpen = false"
              >X</span
            >
          </div>
          <div class="FavoriteModal__text">
            Souhaitez vous supprimer
            <span class="FavoriteModal__text-title">
              {{ favorite.title }}
            </span>
            de vos favoris ?
          </div>
          <button
            class="btn btn-delete"
            @click="this.$emit('deleteAdd', favorite)"
          >
            <span style="width: 100%"
              ><i class="fa fa-trash icon" aria-hidden="true"></i
            ></span>
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
    toggle: Boolean,
  },
  watch: {
    toggle(newValue) {
      this.isModalOpen = newValue;
    },
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
    max-width: 320px;
    position: relative;
    background: white;
    padding: 10px 10px 10px 20px;
    border-radius: 5px;
    box-shadow: 0px 10px 5px 2px rgba(0, 0, 0, 0.1);
  }
  &__close-btn {
    display: flex;
    justify-content: flex-end;
    &-btn {
      height: 30px;
      width: 30px;
      text-align: end;
      font-weight: 600;
      text-align: center;
      &:hover {
        cursor: pointer;
        font-size: 1.2rem;
        transition-delay: 0.2s;
      }
    }
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
  padding: 0 17px 0 17px;
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
