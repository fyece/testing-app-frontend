<script setup lang="ts">
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
      <div class="w-48">
        <SelectOptions v-model="period" name="period" @change="updateFilters">
          <option value="all" selected>Все время</option>
          <option value="day">За сегодня</option>
          <option value="week">За неделю</option>
        </SelectOptions>
      </div>
      <div class="w-56">
        <SearchWithSelect
          v-model="group"
          placeholder="Выберите группу"
          name="search"
          :showOptions="!!groupOptions"
          @search="searchGroups"
        >
          <li
            class="py-2 px-2 cursor-pointer hover:bg-gray-100"
            v-for="option in groupOptions"
            :key="option"
            @click="selectGroup(option)"
          >
            <p class="text-gray-900">{{ option.fullname }}</p>
            <p class="text-gray-600 text-sm">{{ option.jobTitle }}</p>
          </li>
        </SearchWithSelect>
      </div>
    </div>
  </section>
</template>
