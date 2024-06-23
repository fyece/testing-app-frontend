<template>
  <div class="flex flex-col w-full p-4 rounded-xl border-2">
    <h1 class="text-lg font-semibold mb-4">{{ title }}</h1>
    <div v-if="shownGroups" class="flex flex-col">
      <div
        v-for="group in shownGroups"
        :key="group.id"
        class="flex items-center justify-between h-12 border-b last:border-0"
      >
        <p class="font-medium text-blue-500">
          <RouterLink :to="`/groups/${group.id}`">
            {{ group.name }}
          </RouterLink>
        </p>
        <p class="font-medium w-[176px]">Средний результат {{ group.averageResultPercent }}%</p>
      </div>
    </div>
    <div v-else class="flex items-center justify-center h-12 text-gray-500">Нет данных</div>
  </div>
</template>

<script setup lang="ts">
import type { Group } from '@/interfaces/group.interface'
import { computed } from 'vue'

interface Props {
  title: string
  groups: Group[] | null
}

const props = defineProps<Props>()
const shownGroups = computed(
  () =>
    props.groups
      ?.filter((group) => group.averageResultPercent)
      .sort((a, b) => b.averageResultPercent! - a.averageResultPercent!)
      .slice(0, 4) ?? null
)
</script>

<style scoped></style>
