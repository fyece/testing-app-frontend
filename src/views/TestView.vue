<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const testId = router.currentRoute.value.params.id
</script>

<template>
  <secton class="p-8">Test with id: {{ testId }}</secton>
</template>
