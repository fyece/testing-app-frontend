<template>
  <div>
    <div
      v-for="test in props.tests"
      :key="test.id"
      class="flex items-center justify-between border-b"
    >
      <div class="p-3 w-8/12 items-center text-left text-lg font-medium text-blue-500">
        <RouterLink :to="{ name: 'test-info', params: { id: test.id } }">
          {{ test.title }}
        </RouterLink>
      </div>
      <div class="p-3 w-4/12 items-center text-right font-medium">
        {{ test.resultPercent ? `Пройдено на ${test.resultPercent}%` : 'Не пройдено' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  tests: any[]
}

const props = defineProps<Props>()
</script>

<style scoped></style>
