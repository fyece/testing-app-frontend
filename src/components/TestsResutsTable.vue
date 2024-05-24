<template>
  <div>
    <div
      v-for="test in props.tests"
      :key="test.id"
      class="flex items-center justify-between border-b"
    >
      <div class="p-3 w-8/12 items-center text-left text-lg font-medium text-blue-500">
        <RouterLink :to="{ name: 'test-info', params: { id: test.id } }">
          {{ test.name }}
        </RouterLink>
      </div>
      <div class="p-3 w-4/12 items-center text-right font-medium">
        {{
          test.isDone && test.result
            ? `Пройдено на ${test.result?.score / test.result?.totalScore}%`
            : 'Не пройдено'
        }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserTest } from '@/interfaces/test.interface'

interface Props {
  tests: UserTest[] | null
}

const props = defineProps<Props>()
</script>

<style scoped></style>
