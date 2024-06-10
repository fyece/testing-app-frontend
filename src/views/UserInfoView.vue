<template>
  <SideMenuTemplate>
    <template #aside>
      <InfoCard
        :title="user?.fullname ?? ''"
        :subtitle="user?.jobTitle ?? ''"
        :infoRows="infoRows"
      />
    </template>
    <template #main>
      <h2 class="text-4xl font-medium mb-2">Результаты тестов</h2>
      <TestsResutsTable :tests="tests" />
    </template>
  </SideMenuTemplate>
</template>

<script setup lang="ts">
import InfoCard from '@/components/InfoCard.vue'
import SideMenuTemplate from '@/components/SideMenuTemplate.vue'
import TestsResutsTable from '@/components/TestsResutsTable.vue'
import type { UserTest } from '@/interfaces/test.interface'
import type { User } from '@/interfaces/user.interface'
import { useUserStore } from '@/stores/user'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

interface InfoRow {
  title: string
  value: string
}

const userStore = useUserStore()
const router = useRouter()
const userId = computed(() => Number(router.currentRoute.value.params.id) ?? null)
const user = ref<User | null>(null)
const infoRows = ref<InfoRow[] | null>(null)
const tests = ref<UserTest[] | null>(null)

const isLoading = ref(false)
const errorMessage = ref<string | null>(null)

onMounted(async () => {
  getUserInfo()
  getUserTests()
})

const getUserInfo = async () => {
  isLoading.value = true
  const res = await userStore.getUserById(userId.value)

  if (res.status === 'success' && res.user) {
    errorMessage.value = null
    user.value = res.user
    infoRows.value = [
      {
        title: 'Группа',
        value: res.user.group?.name ?? '-'
      },
      {
        title: 'Email',
        value: res.user.email
      },
      {
        title: 'Телефон',
        value: res.user.phoneNumber ?? 'не указан'
      }
    ]
  } else {
    errorMessage.value = 'Произошла ошибка при получении информации о пользователе'
    user.value = null
    infoRows.value = null
  }
  isLoading.value = false
}

const getUserTests = async () => {
  isLoading.value = true
  const res = await userStore.getAllUserTests(userId.value)
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

<style scoped></style>
