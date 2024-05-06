<template>
  <SideMenuTemplate>
    <template #aside>
      <div class="flex items-center justify-between mb-4">
        <ButtonBase size="xs" @click="addQuestion('single')">Добавить вопрос</ButtonBase>
        <ButtonBase size="xs" @click="saveTest()">Сохранить</ButtonBase>
      </div>
      <h5 class="text-md font-semibold mb-2 text-gray-600">Содержание</h5>
      <ul class="overflow-y-auto h-full">
        <li>
          <TestNavItem :isActive="currentQuestionIndex === -1" @click="setCurrentQuestionIndex(-1)">
            Титульник</TestNavItem
          >
        </li>
        <li v-for="(question, index) in questions" :key="question.title">
          <TestNavItem
            :item="question"
            :isDeletable="true"
            :isActive="currentQuestionIndex === index"
            @click="setCurrentQuestionIndex(index)"
            @delete="deleteQuestion(index)"
            class="px-3 py-2 w-full rounded-lg bg-white text-gray-700 cursor-pointer hover:bg-gray-100"
            >{{ `Вопрос ${index + 1}` }}</TestNavItem
          >
        </li>
      </ul>
    </template>
    <template #main>
      <TestTitlist
        v-if="currentQuestionIndex === -1"
        v-model:testTitle="testTitle"
        v-model:testDescription="testDescription"
      />

      <CreateQuestionSingle
        v-else-if="
          getCurrentQuestion(currentQuestionIndex) &&
          getCurrentQuestion(currentQuestionIndex).type === 'single'
        "
        :key="currentQuestionIndex"
        :index="currentQuestionIndex"
        :question="getCurrentQuestion(currentQuestionIndex)"
        @update="updateQuestion"
      />
      <CreateQuestionMultiple
        v-else-if="
          getCurrentQuestion(currentQuestionIndex) &&
          getCurrentQuestion(currentQuestionIndex).type === 'multiple'
        "
        :index="currentQuestionIndex"
        :key="getCurrentQuestion(currentQuestionIndex).title + currentQuestionIndex"
        :question="getCurrentQuestion(currentQuestionIndex)"
        @update="updateQuestion"
      />
      <CreateQuestionText
        v-else-if="
          getCurrentQuestion(currentQuestionIndex) &&
          getCurrentQuestion(currentQuestionIndex).type === 'text'
        "
        :index="currentQuestionIndex"
        :key="
          getCurrentQuestion(currentQuestionIndex).title +
          getCurrentQuestion(currentQuestionIndex).type
        "
        :question="getCurrentQuestion(currentQuestionIndex)"
        @update="updateQuestion"
      >
        тест с вводом ответа
      </CreateQuestionText>
    </template>
  </SideMenuTemplate>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CreateQuestionMultiple from '@/components/CreateQuestionMultiple.vue'
import CreateQuestionSingle from '@/components/CreateQuestionSingle.vue'
import SideMenuTemplate from '@/components/SideMenuTemplate.vue'
import TestNavItem from '@/components/TestNavItem.vue'
import TestTitlist from '@/components/TestTitlist.vue'
import ButtonBase from '@/components/buttons/ButtonBase.vue'
import CreateQuestionText from '@/components/CreateQuestionText.vue'

const testTitle = defineModel<string>('testTitle', { default: 'какое то название' })
const testDescription = defineModel<string>('testDescription', { default: 'какое то описание' })

const currentQuestionIndex = ref(-1)

const questions = ref([
  {
    title: '',
    points: 1,
    type: 'single',
    answers: []
  },
  {
    title: '',
    points: 1,
    type: 'multiple',
    answers: []
  },
  {
    title: '',
    points: 1,
    type: 'multiple',
    answers: []
  },
  {
    title: '',
    points: 1,
    type: 'text',
    answers: []
  }
])

const getCurrentQuestion = (index: number) => {
  return questions.value[index]
}

const setCurrentQuestionIndex = (index: number) => {
  console.log(currentQuestionIndex.value, index)
  currentQuestionIndex.value = index
}

const addQuestion = (type: 'single' | 'multiple' | 'text' = 'single') => {
  const newQuestion = {
    title: '',
    type: type,
    points: 1,
    answers: []
  }
  questions.value = [...questions.value, newQuestion]
}

const updateQuestion = (index: number, question: any) => {
  questions.value[index] = question
}

const deleteQuestion = (indexToRemove: number) => {
  console.log(`indexToRemove ${indexToRemove}, array last index ${questions.value.length - 1}`)
  if (indexToRemove === questions.value.length - 1) {
    questions.value.pop()
  } else {
    questions.value.splice(indexToRemove, 1)
  }
}

const saveTest = () => {
  const test = {
    title: testTitle.value,
    description: testDescription.value,
    questions: JSON.parse(JSON.stringify(questions.value))
  }

  console.log('TEST SAVED ', test)
}
</script>

<style scoped></style>
