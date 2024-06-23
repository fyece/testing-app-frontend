<template>
  <div class="flex flex-col w-full p-4 rounded-xl border-2">
    <h1 class="text-lg font-semibold mb-4">{{ title }}</h1>
    <div v-if="shownUsers" class="flex flex-col">
      <div
        v-for="user in shownUsers"
        :key="user.id"
        class="flex items-center justify-between h-12 border-b last:border-0"
      >
        <p class="font-medium text-blue-500">
          <RouterLink :to="`/users/${user.id}`">
            {{ user.fullname }}
          </RouterLink>
        </p>
        <p class="font-medium w-[176px]">Средний результат {{ user.averageResultPercent }}%</p>
      </div>
    </div>
    <div v-else class="flex items-center justify-center h-12 text-gray-500">Нет данных</div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/interfaces/user.interface'
import { computed } from 'vue'

interface Props {
  title: string
  users: User[] | null
}

const props = defineProps<Props>()
const shownUsers = computed(
  () =>
    props.users
      ?.filter((user) => user.averageResultPercent)
      .sort((a, b) => b.averageResultPercent! - a.averageResultPercent!)
      .slice(0, 4) ?? null
)
</script>

<style scoped></style>
