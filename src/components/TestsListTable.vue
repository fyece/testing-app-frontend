<template>
  <div class="flex flex-col overflow-hidden">
    <div class="table-header flex h-20 text-gray-400 border-b">
      <div class="flex items-center p-5 w-6/12 h-full font-semibold">Название</div>
      <div class="flex items-center p-5 w-2/12 h-full font-semibold">Участников</div>
      <div class="flex items-center p-5 w-2/12 h-full font-semibold">Средний результат</div>
      <div class="flex items-center p-5 w-2/12 h-full font-semibold">Дата создания</div>
    </div>
    <div class="table-content flex flex-col overflow-scroll">
      <div v-for="test in props.tests" :key="test.id" class="flex border-b">
        <div class="p-5 w-6/12 items-center text-left font-medium text-blue-500">
          <RouterLink :to="{ name: 'test-info', params: { id: test.id } }">
            {{ test.name }}
          </RouterLink>
        </div>
        <div class="p-5 w-2/12 items-center text-left font-medium">{{ test.totalUsers }}</div>
        <div class="p-5 w-2/12 items-center text-left font-medium">
          {{ `${test.averageResultPercent ? `${test.averageResultPercent.toFixed(0)}%` : '-'}` }}
        </div>
        <div class="p-5 w-2/12 items-center text-left font-medium">
          {{ formatDate(test.createdAt) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Test } from '@/interfaces/test.interface'
import { formatDate } from '@/utils'

interface Props {
  tests: Test[] | null
}

const props = defineProps<Props>()
</script>

<style scoped></style>
