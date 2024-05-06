<template>
  <div class="grid place-items-center h-full">
    <div
      class="flex flex-col items-center gap-8 w-96 p-8 bg-white border border-gray-200 rounded-lg"
    >
      <h2 class="text-2xl font-semibold">Войти</h2>
      <form class="w-full flex items-center flex-col gap-5">
        <InputBase v-model="email" name="email" type="email" placeholder="Email" />
        <InputBase v-model="password" name="password" type="password" placeholder="Пароль" />
        <ButtonBase @click="login">Войти</ButtonBase>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonBase from '@/components/buttons/ButtonBase.vue'
import InputBase from '@/components/inputs/InputBase.vue'

const email = defineModel<string>('email')
const password = defineModel<string>('password')

const login = () => {
  console.log(email.value, password.value)
}
</script>

<style scoped></style>
