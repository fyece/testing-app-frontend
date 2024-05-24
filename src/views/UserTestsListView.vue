<script setup lang="ts">
import TestsResutsTable from '@/components/TestsResutsTable.vue'
import type { UserTest } from '@/interfaces/test.interface'
import { useTestsStore } from '@/stores/test'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const testStore = useTestsStore()
const router = useRouter()

const tests = ref<UserTest[] | null>(null)
const isLoading = ref(false)
const errorMessage = ref<string | null>(null)

onMounted(async () => {
  getUserTests()
})

const getUserTests = async () => {
  isLoading.value = true
  const res = await testStore.getAllUserTests()

  if (res.status === 'success') {
    errorMessage.value = null
    tests.value = res.tests ?? null
  } else {
    errorMessage.value = 'Произошла ошибка при получении информации о пользователе'
    tests.value = null
  }
  isLoading.value = false
}
</script>

<template>
  <section class="p-4 flex flex-col h-full rounded-xl bg-white">
    <h2 class="text-4xl mb-5 font-semibold">Тестирования</h2>
    <div class="flex items-center justify-between mb-3"></div>
    <TestsResutsTable :tests="tests" />
  </section>
</template>
