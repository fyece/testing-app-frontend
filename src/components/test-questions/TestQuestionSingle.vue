<template>
  <div class="flex flex-col items-center gap-8 pt-8">
    <h2 class="text-xl w-full font-semibold">{{ question?.text }}</h2>
    <form class="flex flex-col gap-4 w-full">
      <div
        class="flex items-center gap-2 last:mb-8"
        v-for="answer in question?.answers"
        :key="answer.id"
      >
        <input
          :id="`answer-${answer.id}`"
          class="w-6 h-6"
          type="radio"
          v-model="selectedAnswerId"
          :checked="answer.answerIds?.[0] === answer.id"
        />
        <label>{{ answer.text }}</label>
      </div>
      <ButtonBase color="blue" @click="submit()">{{ isLast ? 'Завершить' : 'Далее' }}</ButtonBase>
    </form>
  </div>
</template>

<script setup lang="ts">
import ButtonBase from '../buttons/ButtonBase.vue'
import { computed, ref } from 'vue'

interface Props {
  question: any | null
  isLast?: boolean
}

interface UserQuestionAnswer {
  questionId: number
  answerIds: number[] | null
  textAnswer: string | null
}

const props = defineProps<Props>()
const emit = defineEmits(['submit'])

const selectedAnswerId = ref<number | null>(null)

const answer = computed(() => {
  return {
    questionId: props.question?.id,
    answerIds: [selectedAnswerId],
    textAnswer: null
  }
})
// const answer = ref<UserQuestionAnswer>({
//   questionId: props.question?.id,
//   answerIds: [],
//   textAnswer: null
// })

// function setAnswer(id: number) {
//   console.log(answer.value)
//   answer.value = {
//     ...answer.value,
//     answerIds: [id]
//   }
// }

function submit() {
  console.log(answer.value.answerIds[0])
  emit('submit', answer.value)
}
</script>

<style scoped></style>
