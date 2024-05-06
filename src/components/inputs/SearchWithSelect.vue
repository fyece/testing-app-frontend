<template>
  <div class="relative w-full flex flex-col gap-1">
    <label v-if="label" :for="name" class="text-sm font-medium text-gray-900">{{ label }}</label>
    <input
      ref="searchInput"
      v-model="search"
      type="string"
      :id="name"
      class="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
      :placeholder="placeholder"
      @input="emit('search', search)"
      @focus="onFocus"
      @blur="onBlur"
    />
    <div
      v-if="showOptions && search"
      class="absolute top-[72px] left-0 w-full rounded-lg border border-gray-300 bg-white max-h-48 overflow-y-auto"
    >
      <ul>
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

interface Props {
  name: string
  label?: string
  placeholder?: string
  showOptions: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showOptions: false
})
const emit = defineEmits(['search'])

const search = defineModel<string>()
const inputState = reactive({
  onFocus: false,
  onBlur: true
})

const onFocus = () => {
  inputState.onFocus = true
  inputState.onBlur = false
}

const onBlur = () => {
  inputState.onFocus = false
  inputState.onBlur = true
}
</script>

<style scoped></style>
