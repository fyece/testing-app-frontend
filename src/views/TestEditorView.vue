<template>
  <SideMenuTemplate>
    <template #aside>
      <div class="flex items-center justify-between mb-4">
        <ButtonDropdown size="xs">
          Добавить вопрос
          <template #dropdown>
            <ButtonDropdownItem @click="addQuestion('single')">Одиночный</ButtonDropdownItem>
            <ButtonDropdownItem @click="addQuestion('multiple')">Множественный</ButtonDropdownItem>
            <ButtonDropdownItem @click="addQuestion('text')">Текст</ButtonDropdownItem>
          </template>
        </ButtonDropdown>
        <ButtonBase size="xs" @click="saveTest()">Сохранить</ButtonBase>
      </div>
      <h5 class="text-md font-semibold mb-2 text-gray-600">Содержание</h5>
      <ul class="overflow-y-auto h-full">
        <li>
          <TestNavItem :isActive="currentQuestionIndex === -1" @click="setCurrentQuestionIndex(-1)">
            Титульник</TestNavItem
          >
        </li>
        <li v-for="(question, index) in questions" :key="question.text">
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
        :key="getCurrentQuestion(currentQuestionIndex).text + currentQuestionIndex"
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
          getCurrentQuestion(currentQuestionIndex).text +
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
import ButtonDropdown from '@/components/buttons/ButtonDropdown.vue'
import ButtonDropdownItem from '@/components/buttons/ButtonDropdownItem.vue'
import CreateQuestionText from '@/components/CreateQuestionText.vue'
import { useTestsStore } from '@/stores/test'
import router from '@/router'

const testStore = useTestsStore()

const testTitle = defineModel<string>('testTitle', { default: '' })
const testDescription = defineModel<string>('testDescription', { default: '' })

const currentQuestionIndex = ref(-1)

const questions = ref([])

const getCurrentQuestion = (index: number) => {
  return questions.value[index]
}

const setCurrentQuestionIndex = (index: number) => {
  console.log(currentQuestionIndex.value, index)
  currentQuestionIndex.value = index
}

const addQuestion = (type: 'single' | 'multiple' | 'text' = 'single') => {
  const newQuestion = {
    text: '',
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

const saveTest = async () => {
  const test = {
    name: testTitle.value,
    description: testDescription.value,
    questions: JSON.parse(JSON.stringify(questions.value))
  }
  const res = await testStore.createTest(test)
  if (res.status === 'success') {
    router.push({ name: 'tests' })
  }
}
</script>

<style scoped></style>
