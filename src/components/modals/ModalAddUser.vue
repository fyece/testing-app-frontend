<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import InputBase from '../inputs/InputBase.vue'
import ButtonBase from '../buttons/ButtonBase.vue'

const fullname = defineModel<string>('fullname')
const email = defineModel<string>('email')
const phoneNumber = defineModel<string>('phoneNumber')
const jobTitle = defineModel<string>('jobTitle')
const username = defineModel<string>('username')
const password = defineModel<string>('password')

const emit = defineEmits(['confirm'])

const addUser = () => {
  const user = {
    fullname: fullname.value,
    email: email.value,
    phoneNumber: phoneNumber.value,
    jobTitle: jobTitle.value,
    username: username.value,
    password: password.value
  }
  emit('confirm', user)
}
</script>

<template>
  <VueFinalModal
    class="confirm-modal"
    content-class="confirm-modal-content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <h1 class="text-2xl font-semibold">Добавить пользователя</h1>

    <div class="flex flex-col gap-3 w-96">
      <InputBase label="ФИО" name="fullname" v-model="fullname" />
      <InputBase label="Должность" name="jobTitle" v-model="jobTitle" />
      <InputBase label="Почта" name="email" v-model="email" />
      <InputBase label="Номер телефона" name="phoneNumber" v-model="phoneNumber" />
      <InputBase label="Логин" name="username" v-model="username" />
      <InputBase label="Пароль" name="password" v-model="password" />
    </div>
    <ButtonBase width="full" size="md" @click="addUser">Добавить</ButtonBase>
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
