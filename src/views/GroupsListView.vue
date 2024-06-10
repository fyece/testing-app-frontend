<template>
  <section class="p-4 flex flex-col h-full rounded-xl bg-white">
    <h2 class="text-4xl mb-5 font-semibold">Группы</h2>
    <div class="flex items-center justify-between mb-3">
      <p class="font-medium">Всего: {{ groups?.length ?? 0 }} групп</p>
      <ButtonBase @click="openAddGroupModal">Добавить группу</ButtonBase>
    </div>
    <GroupsListTable :groups="groups" />
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import GroupsListTable from '@/components/GroupsListTable.vue'
import ButtonBase from '@/components/buttons/ButtonBase.vue'
import ModalAddGroup from '@/components/modals/ModalAddGroup.vue'
import type { CreateGroupDto, Group } from '@/interfaces/group.interface'
import { useModal } from 'vue-final-modal'
import { useGroupStore } from '@/stores/group'

const groupStore = useGroupStore()
const groups = ref<Group[] | null>(null)
const isLoading = ref(false)
const errorMessage = ref<string | null>(null)

const { open, close } = useModal({
  component: ModalAddGroup,
  attrs: {
    onConfirm(newGroup: CreateGroupDto) {
      close()
      addGroup(newGroup)
    }
  },
  slots: {
    default: ''
  }
})

onMounted(async () => {
  getAllGroups()
})

const openAddGroupModal = () => {
  open()
}

const getAllGroups = async () => {
  isLoading.value = true
  const res = await groupStore.getAllGroups()
  if (res.status === 'success' && res.groups) {
    groups.value = res?.groups
    errorMessage.value = null
  } else {
    groups.value = null
    errorMessage.value = 'Произошла ошибка при получении списка групп'
  }

  isLoading.value = false
}
const addGroup = async (group: CreateGroupDto) => {
  const res = await groupStore.createGroup(group)

  if (res.status === 'success') {
    await getAllGroups()
  }
}
</script>

<style scoped></style>
