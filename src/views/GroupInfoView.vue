<template>
  <SideMenuTemplate>
    <template #aside>
      <InfoCard :title="group?.name ?? null" :info-rows="infoRows" />
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
import type { Group } from '@/interfaces/group.interface'
import { useGroupStore } from '@/stores/group'
import { computed, onMounted, ref } from 'vue'
import { useModal } from 'vue-final-modal'
import { useRouter } from 'vue-router'

interface InfoRow {
  title: string
  value: string
}

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

const groupStore = useGroupStore()
const router = useRouter()
const groupId = computed(() => Number(router.currentRoute.value.params.id) ?? null)
const group = ref<Group | null>(null)
const infoRows = ref<InfoRow[] | null>(null)

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

const isLoading = ref(false)
const errorMessage = ref<string | null>(null)

onMounted(async () => {
  getGroupInfo()
})

const getGroupInfo = async () => {
  isLoading.value = true
  const res = await groupStore.getGroupById(groupId.value)

  if (res.status === 'success' && res.group) {
    errorMessage.value = null
    group.value = res.group
    infoRows.value = [
      {
        title: 'Количество сотрудников',
        value: res.group.totalUsers.toString()
      },
      {
        title: 'Средний результат',
        value: res.group.averageResultPercent
          ? res.group.averageResultPercent.toString() + '%'
          : '-'
      }
    ]
  } else {
    errorMessage.value = 'Произошла ошибка при получении информации о группе'
    group.value = null
    infoRows.value = null
  }
}

isLoading.value = false
</script>

<style scoped></style>
