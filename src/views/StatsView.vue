<script setup lang="ts">
import RaitingGroupTable from '@/components/RaitingGroupTable.vue'
import RaitingUserTable from '@/components/RaitingUserTable.vue'
import StatCard from '@/components/StatCard.vue'
import type { Group } from '@/interfaces/group.interface'
import type { TestResult } from '@/interfaces/test.interface'
import type { User } from '@/interfaces/user.interface'
import { useGroupStore } from '@/stores/group'
import { useTestsStore } from '@/stores/test'
import { useUserStore } from '@/stores/user'
import { computed, onMounted, ref } from 'vue'

const groupStore = useGroupStore()
const userStore = useUserStore()
const testStore = useTestsStore()

const groups = ref<Group[] | null>(null)
const users = ref<User[] | null>(null)
const usersTests = ref<TestResult[] | null>(null)

const testsPassed = computed(() => {
  if (usersTests.value) {
    return usersTests.value?.filter((test) => test.isDone).length
  }
  return 0
})

const testsTotal = computed(() => {
  if (usersTests.value) {
    return usersTests.value?.length
  }
  return 0
})

const averageResultPercent = computed(() => {
  const results = usersTests.value?.map((test) => test.result) ?? []
  const resultsScore = results.reduce((sum, result) => sum + (result?.score ?? 0), 0)
  const resultsTotalScore = results.reduce((sum, result) => sum + (result?.totalScore ?? 0), 0)
  if (results.length) {
    return Number(((resultsScore / resultsTotalScore) * 100).toFixed(0))
  }
  return 0
})

onMounted(async () => {
  getUsersTests()
  getGroups()
  getUsers()
})

const getUsersTests = async () => {
  const res = await testStore.getAllTestsResults()
  if (res.status === 'success') {
    usersTests.value = res.results ?? []
  }
}

const getGroups = async () => {
  const res = await groupStore.getAllGroups()
  if (res.status === 'success') {
    groups.value = res.groups ?? []
  }
}

const getUsers = async () => {
  const res = await userStore.getAllUsers()
  if (res.status === 'success') {
    users.value = res.users ?? []
  }
}
</script>

<template>
  <section class="p-8 flex flex-col h-full rounded-xl bg-white">
    <h2 class="text-4xl mb-5 font-semibold">Cтатистика</h2>

    <div class="flex gap-16 mb-8">
      <StatCard title="Пройдено тестов" :value="testsPassed" />
      <StatCard title="Средний результат" :value="`${averageResultPercent}%`" />
      <StatCard title="Тестов не пройдено" :value="testsTotal - testsPassed" />
    </div>

    <div class="flex gap-12">
      <RaitingUserTable title="Лучшие работники" :users="users" />
      <RaitingGroupTable title="Лучшие группы" :groups="groups" />
    </div>
  </section>
</template>
