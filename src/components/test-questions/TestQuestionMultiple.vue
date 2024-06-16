<template>
  <div class="flex flex-col items-center gap-8 pt-8">
    <h2 class="text-xl w-full font-semibold">{{ question?.text }}</h2>
    <form class="flex flex-col gap-4 w-full">
      <div
        v-for="answer in question.answers"
        :key="answer.id"
        class="flex items-center gap-2 last:mb-8"
      >
        <input
          class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          type="checkbox"
          :id="`answer-${answer.id}`"
          :value="answer.id"
          v-model="selectedAnswerIds"
        />
        <label :for="`answer-${answer.id}`">{{ answer.text }}</label>
      </div>
    </form>
    <ButtonBase color="blue" @click="next()">{{ isLast ? 'Завершить' : 'Далее' }}</ButtonBase>
  </div>
</template>

<script setup lang="ts">
import ButtonBase from '../buttons/ButtonBase.vue'
import { ref, watch } from 'vue'

interface Props {
  question: any | null
  isLast?: boolean
  answer: {
    questionId: number
    answerIds?: number[] | null
    textAnswer?: string | null
  } | null
}

const props = defineProps<Props>()
const emit = defineEmits(['setAnswer', 'next'])
const selectedAnswerIds = ref<number[] | null>(props.answer?.answerIds ?? [])

function next() {
  emit('next')
}

watch(selectedAnswerIds, (newAnswer) => {
  if (newAnswer !== null) {
    emit('setAnswer', {
      questionId: props.question.id,
      answerIds: [...newAnswer]
    })
  }
})
</script>

<style scoped></style>
