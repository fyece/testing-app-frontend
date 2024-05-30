<script setup lang="ts">
import StatCard from '@/components/StatCard.vue'
import SearchWithSelect from '@/components/inputs/SearchWithSelect.vue'
import SelectOptions from '@/components/inputs/SelectOptions.vue'
import { useGroupStore } from '@/stores/group'
import { ref } from 'vue'

const groupStore = useGroupStore()

const period = defineModel<string>('period', { default: 'all' })
const group = defineModel<string>('string', { default: '' })
const user = defineModel<string>('user', { default: '' })

const groupOptions = ref<any[] | null>(null)
const userOptions = ref<any[] | null>(null)

const updateFilters = () => {
  const filters = {
    period: period.value
  }
  console.log(filters)
}

const searchGroups = async () => {
  groupOptions.value = await groupStore.searchGroups(group.value)
}
const selectGroup = (group: any) => {}
</script>

<template>
  <section class="p-4 flex flex-col h-full rounded-xl bg-white">
    <h2 class="text-4xl mb-5 font-semibold">Cтатистика</h2>
    <div class="flex items-center gap-8">
      <StatCard :value="'2'" title="Пройдено тестов" />
      <StatCard :value="'74%'" title="Средний результат" />
      <StatCard :value="'2'" title="Тестов не пройдено" />
    </div>
  </section>
</template>
