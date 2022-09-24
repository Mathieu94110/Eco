<template>
  <span @click.prevent="isModalOpen = true"
    ><i class="fa fa-trash icon" aria-hidden="true"></i
  ></span>

  <Teleport to="#modal">
    <Transition name="modal-fade">
      <div class="modal" v-if="isModalOpen">
        <div ref="modal" class="modal__modal">
          <header class="modal__header">
            <div class="modal__title">
              <slot name="header"></slot>
            </div>
            <button
              type="button"
              class="modal__close-btn"
              @click.prevent="isModalOpen = false"
            >
              x
            </button>
          </header>

          <main class="modal__body">
            <slot name="body"></slot>
          </main>

          <footer class="modal__footer">
            <slot name="footer">
              <button class="btn btn-danger" type="button" @click="deleteAdd">
                <span class="color-white font-600">Supprimer</span>
              </button>
            </slot>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";
import { ref, defineProps, defineEmits } from "vue";
const props = defineProps(["add"]);
const emit = defineEmits(["delete"]);

const isModalOpen = ref(false);
const modal = ref(null);

onClickOutside(modal, () => (isModalOpen.value = false));

const deleteAdd = () => {
  emit("delete", props.add);
  isModalOpen.value = false;
};
</script>
<style lang="scss" scoped>
@use "../../assets/scss/mixins";

.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  &__modal {
    border: 2px solid var(--danger-1);
    background: var(--primary-color);
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    text-align: center;
    border-radius: 10px;
    width: 80%;
    @include mixins.sm {
      width: 500px;
      margin: 0 auto;
    }
  }
  &__header {
    position: relative;
    justify-content: space-between;
    padding: 15px;
    display: flex;
    @include mixins.xs {
      padding-right: 30px;
    }
  }
  &__title {
    width: 100%;
    text-align: center;
  }
  &__close-btn {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: var(--danger-1);
    background: transparent;
    &:hover {
      cursor: pointer;
    }
  }

  &__body {
    font-size: 16px;
    font-weight: 600;
    color: var(--gray-3);
  }
  &__footer {
    flex-direction: column;
    justify-content: flex-end;
    padding: 15px;
    display: flex;
  }
}

.icon {
  :hover {
    cursor: pointer;
  }
}
//Transition
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
