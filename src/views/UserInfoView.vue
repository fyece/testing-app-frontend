<template>
  <SideMenuTemplate>
    <template #aside>
      <InfoCard
        :title="'Иванов Иван Иванович'"
        :subtitle="'Страрший научный сотрудник'"
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
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userId = computed(() => Number(router.currentRoute.value.params.id) ?? null)

const infoRows = [
  {
    title: 'Группа',
    value: 'Цех 1'
  },
  {
    title: 'Почта',
    value: 'someemail@gmail.com'
  },
  {
    title: 'Телефон',
    value: '+79358238510'
  }
]

const tests = [
  {
    id: 1,
    title: 'Тест 1',
    resultPercent: null
  },
  {
    id: 2,
    title: 'Тест 2',
    resultPercent: 86
  },
  {
    id: 3,
    title: 'Тест 1',
    resultPercent: 100
  }
]

onMounted(() => {
  console.log('getUserInfo', userId.value)
})
</script>

<style scoped></style>
