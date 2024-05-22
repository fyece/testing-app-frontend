<template>
  <div class="grid place-items-center h-full">
    <div
      class="flex flex-col items-center gap-8 w-96 p-8 bg-white border border-gray-200 rounded-lg"
    >
      <h2 class="text-2xl font-semibold">Войти</h2>
      <form class="w-full flex items-center flex-col gap-5">
        <InputBase v-model="email" name="email" type="email" placeholder="Email" />
        <InputBase v-model="password" name="password" type="password" placeholder="Пароль" />
        <span v-if="errorMessage" class="text-red-500">{{ errorMessage }}</span>
        <ButtonBase @click="login">Войти</ButtonBase>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonBase from '@/components/buttons/ButtonBase.vue'
import InputBase from '@/components/inputs/InputBase.vue'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const email = defineModel<string>('email', { default: '' })
const password = defineModel<string>('password', { default: '' })

const isLoading = ref(false)
const errorMessage = ref<string | null>(null)

const login = async () => {
  isLoading.value = true
  const res = await auth.login(email.value, password.value)
  if (res.status === 'success') {
    errorMessage.value = null
    router.push({ name: 'home' })
  } else {
    errorMessage.value = res.message ?? 'Ошибка входа в аккаунт'
  }
  isLoading.value = false
}
</script>

<style scoped></style>
