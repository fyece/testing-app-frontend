<template>
  <h3 class="text-lg font-semibold">{{ index + 1 }}. Вопрос c одним правильным ответом</h3>
  <TextareaBase v-model="questionTitle" name="questionTitle" placeholder="Введите вопрос" />
  <div class="flex gap-2 justify-end items-center">
    <p class="text-sm text-gray-600 font-medium ml-1">Количество баллов</p>
    <div class="w-20">
      <InputBase v-model="questionPoints" name="questionPoints" type="number" placeholder="Баллы" />
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <div v-for="(answer, index) in answers" :key="index" class="relative flex items-center gap-2">
      <input
        class="absolute top-2 left-2 w-6 h-6 text-gray-300 bg-gray-100 border-gray-300 rounded cursor-pointer"
        type="checkbox"
        :value="answer.isCorrect"
        :checked="answer.isCorrect"
        @change.prevent="changeCorrectAnswer(index)"
      />
      <input
        :value="answer.text"
        @input="changeAnswerText(index, $event)"
        type="text"
        class="px-2 py-2 pl-10 rounded border cursor-pointer focus:outline-none"
      />
      <ButtonClose @click="deleteAnswer(index)" />
    </div>
    <button
      class="py-2 px-6 w-fit text-xs text-gray-950 font-semibold border rounded bg-white"
      @click="addAnswer"
    >
      Добавить
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import TextareaBase from './inputs/TextareaBase.vue'
import ButtonClose from './buttons/ButtonClose.vue'
import InputBase from './inputs/InputBase.vue'

interface Props {
  question: {
    title: string
    points: number
    answers: any[]
  }
  index: number
}

const props = defineProps<Props>()
const emit = defineEmits(['update'])

const question = ref<any>(props.question)

const questionTitle = defineModel<string>('questionTitle', { default: '' })
const questionPoints = defineModel<string>('questionPoints', { default: '1' })

const answers = ref<any[]>(props.question.answers)

onMounted(() => {
  questionTitle.value = question.value.title
  questionPoints.value = question.value.points
})

onUnmounted(() => {
  saveQuestion()
})

const addAnswer = () => {
  answers.value = [...answers.value, { text: '', isCorrect: false }]
}

const changeAnswerText = (index: number, event: Event) => {
  answers.value = answers.value.map((answer, i) => {
    if (index === i) {
      return { ...answer, text: (event.target as HTMLInputElement).value }
    }
    return answer
  })
}

const changeCorrectAnswer = (index: number) => {
  answers.value = answers.value.map((answer, i) => {
    if (index === i) {
      if (answer.isCorrect) {
        return { ...answer, isCorrect: false }
      }
      return { ...answer, isCorrect: true }
    }
    return { ...answer, isCorrect: false }
  })
}

const deleteAnswer = (index: number) => {
  answers.value = answers.value.filter((answer, i) => i !== index)
}

const saveQuestion = () => {
  const newQuestion = { ...question.value }
  emit('update', props.index, {
    ...newQuestion,
    title: questionTitle.value,
    points: +questionPoints.value,
    answers: answers.value
  })
}
</script>

<style scoped></style>
