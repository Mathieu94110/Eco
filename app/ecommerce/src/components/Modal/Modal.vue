<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
          <div class="row">
            <slot name="header"></slot>
            <button type="button" class="btn-close" @click="close">x</button>
          </div>
        </header>

        <section class="modal-body">
          <slot name="body"></slot>
        </section>

        <footer class="modal-footer">
          <button type="button" class="btn-red" @click="$emit('delete')">
            <slot name="footer">Fermer </slot>
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import { defineEmits } from "vue";

const emit = defineEmits("close");
export default {
  setup() {
    const close = () => {
      emit("close");
    };

    return {
      close,
    };
  },
};
</script>

<style lang="scss">
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
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
  :hover {
    cursor: pointer;
  }
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  justify-content: space-between;

  .row {
    display: flex;
    align-items: center;
  }
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
  font-weight: 600;
}

.btn-close {
  padding-left: 20px;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn-red {
  color: white;
  padding: 20px;
  font-weight: 600;
  font-size: 16px;
  background: #e81704;
  border: 1px solid#e81704;
  border-radius: 2px;
}
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
