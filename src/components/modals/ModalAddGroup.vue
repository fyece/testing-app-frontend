<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import InputBase from '../inputs/InputBase.vue'
import ButtonBase from '../buttons/ButtonBase.vue'

const name = defineModel<string>('name')

const emit = defineEmits(['confirm'])

const addUser = () => {
  const group = {
    name: name.value
  }
  emit('confirm', group)
}
</script>

<template>
  <VueFinalModal
    class="confirm-modal"
    content-class="confirm-modal-content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <h1 class="text-2xl font-semibold">Создать группу</h1>

    <div class="flex flex-col gap-3 w-96">
      <InputBase label="Название" name="name" v-model="name" />
    </div>
    <ButtonBase width="full" size="md" @click="addUser">Создать</ButtonBase>
  </VueFinalModal>
</template>

<style>
.confirm-modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
}
.confirm-modal-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  background: #fff;
  border-radius: 0.5rem;
}
.confirm-modal-content > * + * {
  margin: 0.5rem 0;
}

.dark .confirm-modal-content {
  background: #000;
}
</style>
