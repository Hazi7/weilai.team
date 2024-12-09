<template>
  <teleport to="body">
    <div v-if="isOpen" class="outer" @click="closeModal">
      <div class="modal" @click.stop>
        <header class="modal-header">
          <slot name="header">
            <h2></h2>
          </slot>
          <button class="close-button" @click="closeModal">&times;</button>
        </header>
        <section class="modal-body">
          <slot></slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer"> </slot>
        </footer>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles";
@use "@/assets/styles/recruitment.scss";

.modal {
  position: relative;
  background: var(--popover);
  padding: 20px;
  border-radius: 8px;
  width: 520px;
  height: 240px;
  display: grid;
  grid-template-rows: 1fr 2fr 1fr;
  z-index: 50;
}

.modal-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5em;
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;
}

.modal-body {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 40px;
}
</style>
