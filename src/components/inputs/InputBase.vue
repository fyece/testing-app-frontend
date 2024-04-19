<template>
  <label
    v-if="label"
    :for="name"
    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >{{ label }}</label
  >
  <input
    v-model="model"
    :type="type"
    :id="name"
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    :placeholder="placeholder"
    :required="required"
  />
</template>

<script setup lang="ts">
interface Props {
  name: string
  label?: string
  type?: string
  placeholder?: string
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false
})

const model = defineModel<string>()
</script>

<style scoped></style>
