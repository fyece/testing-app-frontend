<template>
  <div class="flex flex-col overflow-hidden">
    <div class="table-header flex h-20 text-gray-400 border-b">
      <div class="flex items-center p-5 w-5/12 h-full font-semibold">Пользователь</div>
      <div class="flex items-center p-5 w-3/12 h-full font-semibold">Группа</div>
      <div class="flex items-center p-5 w-2/12 h-full font-semibold">Статус</div>
      <div class="flex items-center p-5 w-2/12 h-full font-semibold">Результат</div>
    </div>
    <div class="table-content flex flex-col overflow-scroll">
      <div v-for="result in props.results" :key="result.user.id" class="flex border-b">
        <div class="p-5 w-5/12 items-center text-left font-medium text-blue-500">
          <RouterLink :to="{ name: 'user-info', params: { id: result.user.id } }">
            {{ result?.user.fullname }}
          </RouterLink>
        </div>
        <div class="p-5 w-3/12 items-center text-left font-medium text-blue-500">
          <RouterLink :to="{ name: 'group-info', params: { id: result.user?.groupId } }">
            {{ result?.user.group?.name ?? '' }}
          </RouterLink>
        </div>
        <div class="p-5 w-2/12 items-center text-left font-medium">
          {{ result.isDone ? 'Пройдено' : 'Не пройдено' }}
        </div>
        <div class="p-5 w-2/12 items-center text-left font-medium">
          {{
            result.result?.score && result.result?.totalScore
              ? Math.round(result.result?.score / result.result?.totalScore) * 100 + '%'
              : '-'
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TestResult } from '@/interfaces/test.interface'

interface Props {
  results: TestResult[] | null
}

const props = defineProps<Props>()
</script>

<style scoped></style>
