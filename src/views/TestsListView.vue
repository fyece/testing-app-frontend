<script setup lang="ts">
import TestsListTable from '@/components/TestsListTable.vue'
import ButtonBase from '@/components/buttons/ButtonBase.vue'
import type { Test } from '@/interfaces/test.interface'
import { useTestsStore } from '@/stores/test'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

// const TESTS = [
//   {
//     id: 1,
//     title: 'Тест 1',
//     description: 'Описание теста 1',
//     questions: 3,
//     users: 10,
//     averageResultPercent: 86,
//     createdAt: '14.04.2024'
//   },
//   {
//     id: 2,
//     title: 'Тест 2',
//     description: 'Описание теста 1',
//     questions: 3,
//     users: 10,
//     averageResultPercent: 86,
//     createdAt: '14.04.2024'
//   },
//   {
//     id: 3,
//     title: 'Тест 3',
//     description: 'Описание теста 1',
//     questions: 3,
//     users: 10,
//     averageResultPercent: 86,
//     createdAt: '14.04.2024'
//   },
//   {
//     id: 4,
//     title: 'Тест 4',
//     description: 'Описание теста 1',
//     questions: 3,
//     users: 10,
//     averageResultPercent: 86,
//     createdAt: '14.04.2024'
//   }
// ]

const testStore = useTestsStore()
const router = useRouter()

const tests = ref<Test[] | null>(null)
const isLoading = ref(false)
const errorMessage = ref<string | null>(null)

onMounted(async () => {
  getTests()
})

const goToCreateTest = () => {
  router.push({ name: 'create-test' })
}

const getTests = async () => {
  isLoading.value = true
  const res = await testStore.getAllTests()
  if (res.status === 'success') {
    tests.value = res.tests ?? null
    errorMessage.value = null
  } else {
    errorMessage.value = 'Произошла ошибка при получении информации о тестах'
    tests.value = null
  }
  isLoading.value = false
}
</script>

<template>
  <section class="p-4 flex flex-col h-full rounded-xl bg-white">
    <h2 class="text-4xl mb-5 font-semibold">Тесты</h2>
    <div class="flex items-center justify-between mb-3">
      <p class="font-medium">Всего: {{ tests?.length ?? 0 }} тестов</p>
      <ButtonBase @click="goToCreateTest">Добавить тест</ButtonBase>
    </div>
    <TestsListTable :tests="tests" />
  </section>
</template>
