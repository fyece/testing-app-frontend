<template>
  <label v-if="label" :for="name" class="block mb-2 text-sm font-medium">{{ label }}</label>
  <textarea
    v-model="model"
    :id="name"
    :rows="rows"
    class="block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 resize-none focus:ring-blue-500 focus:border-blue-500"
    :placeholder="placeholder"
  ></textarea>
</template>

<script setup lang="ts">
interface Props {
  name: string
  label?: string
  placeholder?: string
  rows?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  rows: 1
})

const model = defineModel<string>()
</script>

<style scoped></style>
