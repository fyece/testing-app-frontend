<template>
  <div class="flex flex-col justify-center gap-2 p-4 h-32 w-full border-2 rounded-xl">
    <p class="h-fit text-3xl font-semibold">{{ value }}</p>
    <p class="h-fit text-base font-semibold">{{ title }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string | null | undefined
  value: string | number | null | undefined
}

const props = defineProps<Props>()
</script>

<style scoped></style>
