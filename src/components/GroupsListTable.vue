<template>
  <div class="flex flex-col">
    <div class="table-header flex h-20 text-gray-400 border-b">
      <div class="flex items-center p-5 w-6/12 h-full font-semibold">Название</div>
      <div class="flex items-center p-5 w-2/12 h-full font-semibold">Участников</div>
      <div class="flex items-center p-5 w-2/12 h-full font-semibold">Тестов</div>
      <div class="flex items-center p-5 w-2/12 h-full font-semibold">Средний результат</div>
    </div>
    <div class="table-content flex flex-col overflow-scroll">
      <div v-for="group in props.groups" :key="group.id" class="flex border-b">
        <div class="p-5 w-6/12 items-center text-left font-medium text-blue-500">
          <RouterLink :to="{ name: 'group-info', params: { id: group.id } }">
            {{ group.name }}
          </RouterLink>
        </div>
        <div class="p-5 w-2/12 items-center text-left font-medium">{{ group.totalUsers }}</div>
        <div class="p-5 w-2/12 items-center text-left font-medium">
          {{ group.totalTests }}
        </div>
        <div class="p-5 w-2/12 items-center text-left font-medium">
          {{ group.averageResultPercent ? `${group.averageResultPercent.toFixed(0)}%` : '-' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Group } from '@/interfaces/group.interface'

interface Props {
  groups: Group[] | null
}

const props = defineProps<Props>()
</script>

<style scoped></style>
