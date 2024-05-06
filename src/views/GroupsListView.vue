<template>
  <section class="p-4 flex flex-col h-full rounded-xl bg-white">
    <h2 class="text-4xl mb-5 font-semibold">Группы</h2>
    <div class="flex items-center justify-between mb-3">
      <p class="font-medium">Всего: {{ groups.length }} групп</p>
      <ButtonBase @click="openAddGroupModal">Добавить группу</ButtonBase>
    </div>
    <GroupsListTable :groups="groups" />
  </section>
</template>

<script setup lang="ts">
import GroupsListTable from '@/components/GroupsListTable.vue'
import ButtonBase from '@/components/buttons/ButtonBase.vue'
import ModalAddGroup from '@/components/modals/ModalAddGroup.vue'
import { useModal } from 'vue-final-modal'

const GROUPS = [
  {
    id: 1,
    name: 'Группа 1',
    totalUsers: 10,
    totalTests: 5,
    averageResultPercent: 86
  }
]

const groups = GROUPS

const { open, close } = useModal({
  component: ModalAddGroup,
  attrs: {
    onConfirm(newGroup: any) {
      close()
      addGroup(newGroup)
    }
  },
  slots: {
    default: ''
  }
})

const openAddGroupModal = () => {
  open()
}
const addGroup = (group: any) => {
  console.log(group)
  // TODO groupService.addGroup(group)
}
</script>

<style scoped></style>
