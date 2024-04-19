<template>
  <div class="p-4 flex gap-5 h-full">
    <section class="p-2 w-56 rounded-xl bg-white">
      <ButtonBase class="mb-4" width="full" color="gray" size="xs" @click="addQuestion"
        >Добавить вопрос</ButtonBase
      >
      <h5 class="text-md font-semibold mb-2 text-gray-600">Содержание</h5>
      <ul>
        <li>
          <div class="px-3 py-2 w-full rounded-lg bg-white text-gray-700 hover:bg-gray-100">
            Титульник
          </div>
        </li>
        <li>
          <div class="px-3 py-2 w-full rounded-lg bg-white text-gray-700 hover:bg-gray-100">
            Вопрос 1
          </div>
        </li>
      </ul>
    </section>
    <section class="p-2 flex flex-col gap-4 rounded-xl w-full rounded-x bg-white">
      <TextareaBase v-model="title" name="title" placeholder="Название теста" />
      <TextareaBase v-model="description" name="description" placeholder="Описание" rows="3" />
    </section>
  </div>
</template>

<script setup lang="ts">
import ButtonBase from '@/components/buttons/ButtonBase.vue'
import TextareaBase from '@/components/inputs/TextareaBase.vue'

const title = defineModel<string>('title')
const description = defineModel<string>('description')

const addQuestion = () => {
  console.log('add question')
}
</script>

<style scoped></style>
