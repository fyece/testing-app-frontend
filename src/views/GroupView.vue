<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const groupId = router.currentRoute.value.params.id
</script>

<template>
  <section class="p-8">Group with id: {{ groupId }}</section>
</template>
