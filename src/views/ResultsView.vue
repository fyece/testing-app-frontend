<script setup lang="ts">
import type { Result } from '@/interfaces/test.interface'
import { userResultService } from '@/stores/result'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const resultService = userResultService()

const testId = computed(() => Number(route.params.id) ?? null)

const result = ref<Result | null>(null)
const errorMessage = ref<string | null>(null)
const isLoading = ref(false)

onMounted(async () => {
  await getResultById(testId.value)
})

async function getResultById(testId: number) {
  isLoading.value = true
  await resultService.getResultByTestId(testId).then((data) => {
    if (data.status === 'success') {
      result.value = data.result
      errorMessage.value = null
    } else {
      errorMessage.value = 'Произошла ошибка при получении результата'
    }
    isLoading.value = false
  })
}

function goToTestList() {
  router.push({ name: 'home' })
}
</script>

<template>
  <section class="p-4 flex flex-col items-center h-full rounded-xl bg-white">
    <h2 class="text-4xl mb-5 font-semibold">Результаты тестирования</h2>
    <div v-if="result" class="flex flex-col gap-8 items-center">
      <div class="flex gap-4">
        <div class="flex items-center bg-gray-100 py-2 px-4 rounded-md">
          <span class="inline-block mr-2 text-gray-500">Пользователь: </span>
          <span class="inline-block text-gray-500 font-semibold">{{ result?.user.fullname }}</span>
        </div>
        <div class="flex items-center bg-gray-100 py-2 px-4 rounded-md">
          <span class="inline-block mr-2 text-gray-500">Тест: </span>
          <span class="inline-block text-gray-500 font-semibold">{{ result?.test.name }}</span>
        </div>
      </div>
      <div class="flex gap-4">
        <div class="flex flex-col gap-2 justify-center border p-6 w-56 h-36 rounded-md">
          <p class="text-md font-medium text-gray-500">Статус</p>
          <p class="text-3xl font-semibold text-gray-900">Пройден</p>
        </div>
        <div class="flex flex-col gap-2 justify-center border p-6 w-56 h-36 rounded-md">
          <p class="text-md font-medium text-gray-500">Набрано балов</p>
          <p class="text-3xl font-semibold text-gray-900">
            {{ result?.score }} / {{ result?.totalScore }}
          </p>
        </div>
        <div class="flex flex-col gap-2 justify-center border p-6 w-56 h-36 rounded-md">
          <p class="text-md font-medium text-gray-500">Результат</p>
          <p class="text-3xl font-semibold text-gray-900">
            {{
              result?.totalScore
                ? ((result?.score / result?.totalScore) * 100).toFixed(0) + '%'
                : '-'
            }}
          </p>
        </div>
      </div>
      <div>
        <button
          @click="goToTestList()"
          class="h-10 py-2 px-12 bg-slate-50 border rounded-md font-semibold text-gray-700"
        >
          Вернуться к тестам
        </button>
      </div>
    </div>
  </section>
</template>
