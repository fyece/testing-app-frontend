<template>
  <SideMenuTemplate>
    <template #aside>
      <InfoCard :title="'Команда техподдержки'" :info-rows="infoRows" />
    </template>
    <template #main>
      <header class="flex justify-between items-center">
        <h2 class="text-4xl font-medium mb-2">Список участников</h2>
        <ButtonBase @click="open()">Добавить участников</ButtonBase>
      </header>
      <GroupMembersList :users="members" />
    </template>
  </SideMenuTemplate>
</template>

<script setup lang="ts">
import GroupMembersList from '@/components/GroupMembersList.vue'
import InfoCard from '@/components/InfoCard.vue'
import SideMenuTemplate from '@/components/SideMenuTemplate.vue'
import ButtonBase from '@/components/buttons/ButtonBase.vue'
import ModalAddMember from '@/components/modals/ModalAddMember.vue'
import { computed, onMounted } from 'vue'
import { useModal } from 'vue-final-modal'
import { useRouter } from 'vue-router'

const { open, close } = useModal({
  component: ModalAddMember,
  attrs: {
    onConfirm() {
      close()
    }
  },
  slots: {
    default: ''
  }
})

const router = useRouter()
const groupId = computed(() => Number(router.currentRoute.value.params.id) ?? null)

const infoRows = [
  {
    title: 'Количество сотрудников',
    value: '32'
  },
  {
    title: 'Средний результат',
    value: '74%'
  }
]

const members = [
  {
    id: 1,
    fullName: 'Иванов Иван Иванович',
    averageResultPercent: 83,
    testsPassed: 12,
    testsTotal: 14
  },
  {
    id: 2,
    fullName: 'Петров Петр Петрович',
    averageResultPercent: 83,
    testsPassed: 12,
    testsTotal: 14
  },
  {
    id: 3,
    fullName: 'Сидоров Сидор Сидорович',
    averageResultPercent: 83,
    testsPassed: 12,
    testsTotal: 14
  }
]

onMounted(() => {
  console.log('getGroupInfo', groupId.value)
})
</script>

<style scoped></style>
