<template>
  <div>
    <div class="flex flex-col gap-1 mb-4">
      <p class="text-xl font-medium">{{ props.title }}</p>
      <p v-if="subtitle" class="text-md font-medium text-gray-500">{{ props.subtitle }}</p>
    </div>
    <hr class="mb-5 bg-gray-400" />
    <div class="flex flex-col gap-4">
      <div v-for="row in infoRows" :key="row.title">
        <p class="text-base text-gray-500 font-medium">{{ row.title }}</p>
        <p class="text-base font-medium">{{ row.value }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface InfoRow {
  title: string
  value: string
}
interface Props {
  title: string | null
  subtitle?: string | null
  infoRows: InfoRow[] | null
}

const props = defineProps<Props>()
</script>

<style scoped></style>
