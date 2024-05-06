<template>
  <TextareaBase v-model="testTitle" name="title" placeholder="Название теста" />
  <TextareaBase v-model="testDescription" name="description" placeholder="Описание" rows="3" />
</template>

<script setup lang="ts">
import TextareaBase from './inputs/TextareaBase.vue'

const testTitle = defineModel<string>('testTitle')
const testDescription = defineModel<string>('testDescription')
</script>

<style scoped></style>
