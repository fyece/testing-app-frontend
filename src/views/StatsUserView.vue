<script setup lang="ts">
import StatCard from '@/components/StatCard.vue'
import type { UserStats } from '@/interfaces/user.interface'
import { useUserStore } from '@/stores/user'
import { onMounted, ref } from 'vue'

const userStore = useUserStore()

const stats = ref<UserStats | null>(null)
const isLoading = ref(false)
const errorMessage = ref<string | null>(null)

onMounted(async () => {
  await getUserStats()
})

async function getUserStats() {
  isLoading.value = true
  const res = await userStore.getUserStats()

  if (res.status === 'success') {
    errorMessage.value = null
    stats.value = res.stats
  } else {
    errorMessage.value = 'Произошла ошибка при получении статистики'
  }
  isLoading.value = false
}
</script>

<template>
  <section class="p-8 flex flex-col h-full rounded-xl bg-white">
    <h2 class="text-4xl mb-5 font-semibold">Cтатистика</h2>
    <div class="flex items-center gap-8">
      <StatCard :value="stats?.testsPassed ? stats?.testsPassed : 0" title="Пройдено тестов" />
      <StatCard
        :value="
          stats?.averageResultPercent ? (stats?.averageResultPercent * 100).toFixed(0) + '%' : '-'
        "
        title="Средний результат"
      />
      <StatCard
        :value="stats?.testsTotal ? stats?.testsTotal - stats?.testsPassed : 0"
        title="Тестов не пройдено"
      />
    </div>
  </section>
</template>
