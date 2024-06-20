<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import ButtonBase from '../buttons/ButtonBase.vue'
import SearchWithSelect from '../inputs/SearchWithSelect.vue'
import { onMounted, ref } from 'vue'
import ButtonClose from '../buttons/ButtonClose.vue'
import { useGroupStore } from '@/stores/group'
import type { Group } from '@/interfaces/group.interface'

const groupStore = useGroupStore()

const search = defineModel<string>('search', { default: '' })
const groupsToAdd = ref<Set<any>>(new Set())
const options = ref<Group[]>([])
const groups = ref<Group[]>([])
const emit = defineEmits(['confirm'])

onMounted(async () => {
  await getGroups()
})

const searchGroups = (searchString: string) => {
  options.value = groups.value.filter((group) => {
    return (
      group.name.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()) &&
      !groupsToAdd.value.has(group)
    )
  })
}

const selectGroup = (option: any) => {
  groupsToAdd.value.add(option)
  search.value = ''
}

const getGroups = async () => {
  const res = await groupStore.getAllGroups()
  if (res.status === 'success') {
    groups.value = res.groups ?? []
  }
}

const addGroups = () => {
  const newGroups = JSON.parse(JSON.stringify(Array.from(groupsToAdd.value)))
  emit('confirm', newGroups)
}
</script>

<template>
  <VueFinalModal
    class="confirm-modal"
    content-class="confirm-modal-content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <h1 class="text-2xl font-semibold">Добавить группы</h1>

    <div class="flex flex-col gap-3 w-96">
      <SearchWithSelect
        v-model="search"
        label="Поиск групп"
        placeholder="Введите название группы"
        name="search"
        :showOptions="options.length > 0"
        @search="searchGroups"
      >
        <li
          class="py-2 px-2 cursor-pointer hover:bg-gray-100"
          v-for="option in options"
          :key="option"
          @click="selectGroup(option)"
        >
          <p class="text-gray-900">{{ option.name }}</p>
          <p class="text-gray-600 text-sm">Участников: {{ option.totalUsers }}</p>
        </li>
      </SearchWithSelect>
      <div>
        <h3 class="text-base font-semibold mb-2">
          Выбранные группы
          <span class="text-gray-500 font-semibold">{{ groupsToAdd.size }}</span>
        </h3>
        <ul class="max-h-64 overflow-y-auto">
          <li
            class="flex items-center gap-2 py-2 px-3 cursor-pointer hover:bg-gray-100 rounded-md"
            v-for="group in groupsToAdd"
            :key="group.name"
          >
            <div class="w-full">
              <p class="text-sm">{{ group.name }}</p>
              <p class="text-xs text-gray-600">Участников: {{ group.totalUsers }}</p>
            </div>
            <ButtonClose @click="groupsToAdd.delete(group)" />
          </li>
        </ul>
      </div>
    </div>
    <ButtonBase width="full" size="md" @click="addGroups">Добавить</ButtonBase>
  </VueFinalModal>
</template>

<style>
.confirm-modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
}
.confirm-modal-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  background: #fff;
  border-radius: 0.5rem;
}
.confirm-modal-content > * + * {
  margin: 0.5rem 0;
}

.dark .confirm-modal-content {
  background: #000;
}
</style>
