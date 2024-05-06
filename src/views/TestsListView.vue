<script setup lang="ts">
import TestsListTable from '@/components/TestsListTable.vue'
import ButtonBase from '@/components/buttons/ButtonBase.vue'
import { useRouter } from 'vue-router'

const TESTS = [
  {
    id: 1,
    title: 'Тест 1',
    description: 'Описание теста 1',
    questions: 3,
    users: 10,
    averageResultPercent: 86,
    createdAt: '14.04.2024'
  },
  {
    id: 2,
    title: 'Тест 2',
    description: 'Описание теста 1',
    questions: 3,
    users: 10,
    averageResultPercent: 86,
    createdAt: '14.04.2024'
  },
  {
    id: 3,
    title: 'Тест 3',
    description: 'Описание теста 1',
    questions: 3,
    users: 10,
    averageResultPercent: 86,
    createdAt: '14.04.2024'
  },
  {
    id: 4,
    title: 'Тест 4',
    description: 'Описание теста 1',
    questions: 3,
    users: 10,
    averageResultPercent: 86,
    createdAt: '14.04.2024'
  }
]

const router = useRouter()

const tests = TESTS

const goToCreateTest = () => {
  router.push({ name: 'create-test' })
}
</script>

<template>
  <section class="p-4 flex flex-col h-full rounded-xl bg-white">
    <h2 class="text-4xl mb-5 font-semibold">Тесты</h2>
    <div class="flex items-center justify-between mb-3">
      <p class="font-medium">Всего: {{ tests.length }} тестов</p>
      <ButtonBase @click="goToCreateTest">Добавить тест</ButtonBase>
    </div>
    <TestsListTable :tests="tests" />
  </section>
</template>
