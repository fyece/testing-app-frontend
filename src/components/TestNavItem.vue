<template>
  <div
    class="flex gap-2 items-center px-4 py-4 w-full rounded-lg bg-white text-gray-700 font-medium cursor-pointer hover:bg-gray-100"
    :class="{ 'bg-gray-300': isActive }"
    @mouseenter="showDeleteButton"
    @mouseleave="hideDeleteButton"
  >
    <p class="inline-block w-full">
      <slot></slot>
    </p>
    <ButtonDelete v-if="isDeleteButton" @click="deleteItem" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ButtonDelete from './buttons/ButtonDelete.vue'

interface Props {
  isDeletable?: boolean
  isActive?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isDeletable: false
})
const isDeleteButton = ref(false)
const emit = defineEmits(['delete'])

const deleteItem = () => {
  emit('delete')
}

const showDeleteButton = () => {
  if (props.isDeletable) {
    isDeleteButton.value = true
  }
}

const hideDeleteButton = () => {
  isDeleteButton.value = false
}
</script>

<style scoped></style>
