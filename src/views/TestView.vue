<script setup lang="ts">
import SideMenuTemplate from '@/components/SideMenuTemplate.vue'
import TestNavItem from '@/components/TestNavItem.vue'
import ButtonBase from '@/components/buttons/ButtonBase.vue'
import TestQuestionMultiple from '@/components/test-questions/TestQuestionMultiple.vue'
import TestQuestionSingle from '@/components/test-questions/TestQuestionSingle.vue'
import TestQuestionText from '@/components/test-questions/TestQuestionText.vue'
import type { Test } from '@/interfaces/test.interface'
import { useTestsStore } from '@/stores/test'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

interface SubmitTestDto {
  testId: number
  answers: UserAnswer[]
}

interface UserAnswer {
  questionId: number
  answerIds?: number[] | null
  textAnswer?: string | null
}

const router = useRouter()
const testId = computed(() => Number(router.currentRoute.value.params.id))
const testStore = useTestsStore()
const isLoading = ref(false)
const errorMessage = ref<string | null>(null)

const currentQuestionIndex = ref<number>(-1)
const currentQuestion = computed(() => test.value?.questions?.[currentQuestionIndex.value])
const lastQuestionIndex = computed(() =>
  test.value?.questions?.length ? test.value?.questions?.length - 1 : -1
)

const test = ref<Test | null>(null)
const userAnswers = ref<SubmitTestDto>({
  testId: testId.value,
  answers: []
})

onMounted(async () => {
  getTest()
})

const getTest = async () => {
  isLoading.value = true
  const res = await testStore.getTestById(testId.value)
  if (res.status === 'success') {
    errorMessage.value = null
    test.value = res.test ?? null
  } else {
    errorMessage.value = 'Произошла ошибка при получении теста'
  }
  isLoading.value = false
}

function setCurrentQuestionIndex(index: number) {
  // console.log(`set ${index}`, `current ${currentQuestionIndex.value}`)
  currentQuestionIndex.value = index
  // console.log(`id ${index}`, `now current ${currentQuestionIndex.value}`)
}

function setAnswer(userAnswer: UserAnswer) {
  let newUserAnswers = []
  if (userAnswers.value.answers.find((answer) => answer.questionId === userAnswer.questionId)) {
    newUserAnswers = userAnswers.value.answers.map((answer) => {
      if (answer.questionId === userAnswer.questionId) {
        return userAnswer
      }
      return answer
    })
  } else {
    newUserAnswers = [...userAnswers.value.answers, userAnswer]
  }
  userAnswers.value = {
    ...userAnswers.value,
    answers: newUserAnswers
  }
  console.log('test: ', JSON.parse(JSON.stringify(userAnswers.value)))
}
function next() {
  if (currentQuestionIndex.value < lastQuestionIndex.value) {
    currentQuestionIndex.value++
  } else {
    submitTest()
  }
}

async function submitTest() {
  console.log(JSON.parse(JSON.stringify(userAnswers.value)))
  if (userAnswers.value) {
    const res = await testStore.submitTest(userAnswers.value)
    if (res.status === 'success') {
      router.push('/results/' + testId.value)
    } else {
      errorMessage.value = 'Произошла ошибка при отправке теста'
    }
  }
}
</script>

<template>
  <SideMenuTemplate>
    <template #aside>
      <div class="flex items-center justify-between mb-4">
        <ButtonBase size="xs" @click="submitTest()">Завершить</ButtonBase>
      </div>
      <h5 class="text-md font-semibold mb-2 text-gray-600">Вопросы</h5>
      <ul class="overflow-y-auto h-full">
        <li v-for="(question, index) in test?.questions" :key="question.id">
          <TestNavItem
            :isActive="currentQuestionIndex === index"
            @click="setCurrentQuestionIndex(index)"
            >{{ `Вопрос ${index + 1}` }}</TestNavItem
          >
        </li>
      </ul>
    </template>
    <template #main>
      <div v-if="currentQuestionIndex === -1">Начальная страница</div>

      <TestQuestionSingle
        v-if="currentQuestion?.type === 'single'"
        :question="currentQuestion"
        :isLast="currentQuestionIndex === lastQuestionIndex"
        :answer="
          userAnswers?.answers?.find((answer) => answer.questionId === currentQuestion?.id) ?? null
        "
        @setAnswer="setAnswer"
        @next="next"
      />
      <TestQuestionMultiple
        v-if="currentQuestion?.type === 'multiple'"
        :question="currentQuestion"
        :isLast="currentQuestionIndex === lastQuestionIndex"
        :answer="
          userAnswers?.answers?.find((answer) => answer.questionId === currentQuestion?.id) ?? null
        "
        @setAnswer="setAnswer"
        @next="next"
      />
      <TestQuestionText
        v-if="currentQuestion?.type === 'text'"
        :question="currentQuestion"
        :isLast="currentQuestionIndex === lastQuestionIndex"
        :answer="
          userAnswers?.answers?.find((answer) => answer.questionId === currentQuestion?.id) ?? null
        "
        @setAnswer="setAnswer"
        @next="next"
      />
    </template>
  </SideMenuTemplate>
</template>
