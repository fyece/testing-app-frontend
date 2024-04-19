<template>
  <div class="grid place-items-center h-full">
    <div
      class="flex flex-col items-center gap-8 w-96 p-8 bg-white border border-gray-200 rounded-lg"
    >
      <h2 class="text-2xl font-semibold">Регистрация</h2>
      <form class="w-full flex flex-col gap-5">
        <InputBase v-model="fullName" name="fullName" type="text" placeholder="Имя Фамилия" />
        <InputBase v-model="email" name="email" type="email" placeholder="Email" />
        <InputBase v-model="password" name="password" type="password" placeholder="Пароль" />
        <ButtonBase @click="signUp">Зарегистрироваться</ButtonBase>
      </form>
      <span class="text-md text-center text-gray-500">
        Уже есть аккаунт?
        <RouterLink to="/login" class="text-blue-500 font-semibold">Войти</RouterLink>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonBase from '@/components/buttons/ButtonBase.vue'
import InputBase from '@/components/inputs/InputBase.vue'

const fullName = defineModel<string>('fullName')
const email = defineModel<string>('email')
const password = defineModel<string>('password')

const signUp = () => {
  console.log(fullName.value, email.value, password.value)
}
</script>

<style scoped></style>
