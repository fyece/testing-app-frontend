<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal'
import AppTemplate from './components/AppTemplate.vue'
import { useAuthStore } from './stores/auth'
import { useRouter } from 'vue-router'
import { onBeforeMount } from 'vue'

const auth = useAuthStore()
const router = useRouter()

onBeforeMount(() => {
  getProfile()
})

const getProfile = async () => {
  const res = await auth.getProfile()
  if (res?.status === 'failed') {
    router.push({ name: 'login' })
  }
}
</script>

<template>
  <AppTemplate />
  <ModalsContainer />
</template>

<style scoped></style>
