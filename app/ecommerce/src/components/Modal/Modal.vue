<template>
  <span @click.prevent="isModalOpen = true"
    ><i class="fa fa-trash icon" aria-hidden="true"></i
  ></span>

  <Teleport to="#modal">
    <Transition name="modal-fade">
      <div class="modal-backdrop" v-if="isModalOpen">
        <div ref="modal" class="modal">
          <header class="modal-header">
            <slot name="header"></slot>
            <button
              type="button"
              class="close-btn"
              @click.prevent="isModalOpen = false"
            >
              x
            </button>
          </header>

          <main class="modal-body">
            <slot name="body"></slot>
          </main>

          <footer class="modal-footer">
            <slot name="footer">
              <button
                type="button"
                class="btn-open-modal"
                @click="$emit('delete', add)"
              >
                Supprimer
              </button>
            </slot>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
import { onClickOutside } from "@vueuse/core";
import { ref, watch } from "vue";
export default {
  props: {
    add: Object,
    toggle: Boolean,
  },
  setup(props) {
    const isModalOpen = ref(false);

    const modal = ref(null);

    onClickOutside(modal, () => (isModalOpen.value = false));

    watch(props.toggle, (newValue) => {
      console.log(newValue);
      isModalOpen.value = newValue;
    });

    return {
      isModalOpen,
      modal,
    };
  },
};
</script>
<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 80%;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid rgb(227, 231, 233);
  color: blue;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid rgb(227, 231, 233);
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.close-btn {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: red;
  background: transparent;
}

.btn-open-modal {
  color: white;
  background: green;
  border: 1px solid green;
  border-radius: 4px;
  margin: 20px auto;
  padding: 5px;
  width: 40%;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
