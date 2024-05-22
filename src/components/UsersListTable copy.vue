<template>
  <div class="flex flex-col">
    <div class="table-header flex h-20 text-gray-400 border-b">
      <div class="flex items-center p-5 w-5/12 h-full font-semibold">Пользователь</div>
      <div class="flex items-center p-5 w-3/12 h-full font-semibold">Группа</div>
      <div class="flex items-center p-5 w-2/12 h-full font-semibold">Пройдено тестов</div>
      <div class="flex items-center p-5 w-2/12 h-full font-semibold">Средний результат</div>
    </div>
    <div class="table-content flex flex-col">
      <div v-for="user in props.users" :key="user.id" class="flex border-b">
        <div class="p-5 w-5/12 items-center text-left font-medium text-blue-500">
          <RouterLink :to="{ name: 'user-info', params: { id: user.id } }">
            {{ user?.fullname }}
          </RouterLink>
        </div>
        <div class="p-5 w-3/12 items-center text-left font-medium text-blue-500">
          <RouterLink :to="{ name: 'group-info', params: { id: user?.group?.id } }">
            {{ user?.group?.name ?? '' }}
          </RouterLink>
        </div>
        <div class="p-5 w-2/12 items-center text-left font-medium">{{ 9 }} из {{ 10 }}</div>
        <div class="p-5 w-2/12 items-center text-left font-medium">{{ 87 }}%</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/interfaces/user.interface'

interface Props {
  users: User[] | null
}

const props = defineProps<Props>()
</script>

<style scoped></style>
