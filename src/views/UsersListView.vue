<template>
  <section class="p-4 flex flex-col h-full rounded-xl bg-white">
    <h2 class="text-4xl mb-5 font-semibold">Пользователи</h2>
    <div class="flex items-center justify-between mb-3">
      <p class="font-medium">Всего: {{ users.length }} пользователей</p>
      <ButtonBase @click="openAddUserModal">Добавить сотрудника</ButtonBase>
    </div>
    <UsersListTableCopy :users="users" />
  </section>
</template>

<script setup lang="ts">
import UsersListTableCopy from '@/components/UsersListTable copy.vue'
import ButtonBase from '@/components/buttons/ButtonBase.vue'
import ModalAddUser from '@/components/modals/ModalAddUser.vue'
import { useModal } from 'vue-final-modal'

const USERS = [
  {
    id: 1,
    fullName: 'Иванов Иван Иванович',
    group: {
      id: 1,
      name: 'Группа 1'
    },
    testsPassed: 5,
    testsTotal: 10,
    averageResultPercent: 86
  },
  {
    id: 1,
    fullName: 'Сергеев Сергей Сергеевич',
    group: {
      id: 2,
      name: 'Группа 2'
    },
    testsPassed: 6,
    testsTotal: 7,
    averageResultPercent: 75
  }
]

const users = USERS

const { open, close } = useModal({
  component: ModalAddUser,
  attrs: {
    onConfirm(newUser: any) {
      close()
      addUser(newUser)
    }
  },
  slots: {
    default: ''
  }
})

const openAddUserModal = () => {
  open()
}

const addUser = (user: any) => {
  console.log(user)
  // TODO: userStore.createUser()
}
</script>

<style scoped></style>
