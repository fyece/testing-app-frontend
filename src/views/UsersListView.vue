<template>
  <section class="p-4 flex flex-col h-full rounded-xl bg-white">
    <h2 class="text-4xl mb-5 font-semibold">Пользователи</h2>
    <div class="flex items-center justify-between mb-3">
      <p class="font-medium">Всего: {{ users?.length ?? 0 }} пользователей</p>
      <ButtonBase @click="openAddUserModal">Добавить сотрудника</ButtonBase>
    </div>
    <UsersListTableCopy :users="users" />
  </section>
</template>

<script setup lang="ts">
import UsersListTableCopy from '@/components/UsersListTable copy.vue'
import ButtonBase from '@/components/buttons/ButtonBase.vue'
import ModalAddUser from '@/components/modals/ModalAddUser.vue'
import type { User } from '@/interfaces/user.interface'
import { useUserStore } from '@/stores/user'
import { onMounted, ref } from 'vue'
import { useModal } from 'vue-final-modal'

const user = useUserStore()

const users = ref<User[] | null>(null)
const isLoading = ref(false)
const errorMessage = ref<string | null>(null)

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

onMounted(() => {
  getUsers()
})

const getUsers = async () => {
  isLoading.value = true
  const res = await user.getAllUsers()
  if (res.status === 'success') {
    errorMessage.value = null
    users.value = res.users ?? null
  } else {
    errorMessage.value = 'Произошла ошибка при получении списка пользователей'
    users.value = null
  }

  isLoading.value = false
}

const openAddUserModal = () => {
  open()
}

const addUser = (user: any) => {
  console.log(user)
  // TODO: userStore.createUser()
}
</script>

<style scoped></style>
