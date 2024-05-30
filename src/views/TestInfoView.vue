<template>
  <section class="p-4 flex flex-col h-full rounded-xl bg-white">
    <section class="flex flex-col mb-8">
      <h2 class="text-2xl mb-3 font-semibold">{{ test?.name }}</h2>
      <p class="font-medium text-gray-500 mb-4">{{ test?.description }}</p>
      <div class="flex gap-4 mb-4">
        <StatCard :value="test?.questions?.length" title="Вопросов" />
        <StatCard :value="'74%'" title="Средний результат" />
      </div>
    </section>
    <h2 class="text-2xl mb-5 font-semibold">Результаты</h2>
    <div class="flex items-center justify-between mb-3">
      <p class="font-medium">Всего назначено: {{ testResults?.length ?? 0 }} пользователей</p>
      <ButtonBase @click="openAddUserModal">Назначить пользователя</ButtonBase>
    </div>
    <TestResultsTable :results="testResults" />
  </section>
</template>

<script setup lang="ts">
import UsersListTableCopy from '@/components/UsersListTable copy.vue'
import ButtonBase from '@/components/buttons/ButtonBase.vue'
import ModalAddUser from '@/components/modals/ModalAddUser.vue'
import StatCard from '@/components/StatCard.vue'
import type { User } from '@/interfaces/user.interface'
import { useTestsStore } from '@/stores/test'
import { useUserStore } from '@/stores/user'
import { computed, onMounted, ref } from 'vue'
import { useModal } from 'vue-final-modal'
import type { Test, TestResult } from '@/interfaces/test.interface'
import { useRoute } from 'vue-router'
import TestResultsTable from '@/components/TestResultsTable.vue'
import ModalAddToTest from '@/components/modals/ModalAddToTest.vue'

const route = useRoute()
const userStore = useUserStore()
const testStore = useTestsStore()
const testId = computed(() => Number(route.params.id) ?? null)

const testResults = ref<TestResult[] | null>(null)
const test = ref<Test | null>(null)
const isLoading = ref(false)
const errorMessage = ref<string | null>(null)

const { open, close } = useModal({
  component: ModalAddToTest,
  attrs: {
    onConfirm(newUser: any) {
      close()
      addUser(newUser)
    }
  },
  slots: {
    default: ''
  }
})

onMounted(async () => {
  getTestUsers()
  getTestInfo()
})

const getTestUsers = async () => {
  isLoading.value = true
  const res = await testStore.getAllTestResultsByTestId(testId.value)
  if (res.status === 'success') {
    errorMessage.value = null
    testResults.value = res.results ?? null
  } else {
    errorMessage.value = 'Произошла ошибка при получении списка пользователей'
    testResults.value = null
  }

  isLoading.value = false
}

const getTestInfo = async () => {
  isLoading.value = true
  const res = await testStore.getTestById(testId.value)
  if (res.status === 'success') {
    errorMessage.value = null
    test.value = res.test ?? null
  } else {
    errorMessage.value = 'Произошла ошибка при получении информации о тесте'
    test.value = null
  }
}

const openAddUserModal = () => {
  open()
}

const addUser = (user: any) => {
  console.log(user)
  // TODO: userStore.createUser()
}
</script>

<style scoped></style>
