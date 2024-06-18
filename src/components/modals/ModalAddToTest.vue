<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import ButtonBase from '../buttons/ButtonBase.vue'
import SearchWithSelect from '../inputs/SearchWithSelect.vue'
import { computed, onMounted, ref } from 'vue'
import ButtonClose from '../buttons/ButtonClose.vue'
import { useUserStore } from '@/stores/user'
import type { User } from '@/interfaces/user.interface'
import { useTestsStore } from '@/stores/test'

const userStore = useUserStore()
const testStore = useTestsStore()
const results = computed(() => testStore.currentResults)

const search = defineModel<string>('search', { default: '' })
const members = ref<Set<any>>(new Set())
const options = ref<any>([])
const users = ref<User[]>([])
const emit = defineEmits(['confirm'])

onMounted(async () => {
  await getUsers()
})

const searchUsers = (searchString: string) => {
  options.value = users.value.filter((user) => {
    return (
      user.fullname.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()) &&
      !members.value.has(user) &&
      !results.value?.some((result) => result.userId === user.id)
    )
  })
}

const selectUser = (option: any) => {
  members.value.add(option)
  search.value = ''
}

const getUsers = async () => {
  const res = await userStore.getAllUsers()
  if (res.status === 'success') {
    users.value = res.users ?? []
  }
}

const addMembers = () => {
  const newMembers = JSON.parse(JSON.stringify(Array.from(members.value)))
  console.log('members', newMembers)
  emit('confirm', newMembers)
}
</script>

<template>
  <VueFinalModal
    class="confirm-modal"
    content-class="confirm-modal-content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <h1 class="text-2xl font-semibold">Добавить участников</h1>

    <div class="flex flex-col gap-3 w-96">
      <SearchWithSelect
        v-model="search"
        label="Поиск пользователя"
        placeholder="Введите ФИО"
        name="search"
        :showOptions="options.length > 0"
        @search="searchUsers"
      >
        <li
          class="py-2 px-2 cursor-pointer hover:bg-gray-100"
          v-for="option in options"
          :key="option"
          @click="selectUser(option)"
        >
          <p class="text-gray-900">{{ option.fullname }}</p>
          <p class="text-gray-600 text-sm">{{ option.jobTitle }}</p>
        </li>
      </SearchWithSelect>
      <div>
        <h3 class="text-base font-semibold mb-2">
          Выбранные пользователи
          <span class="text-gray-500 font-semibold"> {{ members.size }}</span>
        </h3>
        <ul class="max-h-64 overflow-y-auto">
          <li
            class="flex items-center gap-2 py-2 px-3 cursor-pointer hover:bg-gray-100 rounded-md"
            v-for="member in members"
            :key="member.fullname"
          >
            <div class="w-full">
              <p class="text-sm">{{ member.fullname }}</p>
              <p class="text-xs text-gray-600">{{ member.jobTitle }}</p>
            </div>
            <ButtonClose @click="members.delete(member)" />
          </li>
        </ul>
      </div>
    </div>
    <ButtonBase width="full" size="md" @click="addMembers">Добавить</ButtonBase>
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
