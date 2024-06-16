<template>
  <div class="flex flex-col items-center gap-8 pt-8">
    <h2 class="text-xl w-full font-semibold">{{ question?.text }}</h2>
    <form class="flex flex-col gap-4 w-full mb-8">
      <input
        class="w-full px-4 py-2 border border-gray-300 rounded"
        type="text"
        v-model="textAnswer"
      />
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
const textAnswer = ref<string>(props.answer?.textAnswer ?? '')

function next() {
  emit('next')
}

watch(textAnswer, (newAnswer) => {
  emit('setAnswer', {
    questionId: props.question.id,
    textAnswer: newAnswer
  })
})
</script>

<style scoped></style>
