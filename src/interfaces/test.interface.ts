import type { Group } from './group.interface'
import type { User } from './user.interface'

export interface CreateTest {
  name: string
  description: string
  questions: CreateQuestion[]
}

export interface CreateQuestion {
  text: string
  type: 'single' | 'multiple' | 'text'
  points: number
  answers: CreateAnswer[]
}

export interface CreateAnswer {
  text: string
  isCorrect: boolean
}

export interface Test {
  id: number
  name: String
  description: String
  ownerId: number
  totalUsers: number
  averageResultPercent: number | null
  questions?: Question[]
  results?: Result[]
  userTests?: UserTest[]
  createdAt: string
}

export interface TestResult {
  userId: number
  testId: number
  isDone: false
  resultId: number | null
  user: {
    id: number
    fullname: string
    email: string
    phoneNumber: string
    jobTitle: string
    role: string
    groupId: number | null
    group: Group | null
  }
  result: Result | null
}

export interface UserTest {
  id: number
  name: string
  description: string
  ownerId: number
  isDone: boolean
  qestionsCount?: number
  result: Result | null
}

export interface UserTestDto {
  testId: number
  answers: {
    questionId: number
    answerIds?: number[] | null | undefined
    textAnswer?: string | null | undefined
  }[]
}

export interface Question {
  id: number
  text: string
  type: string
  points: number
  answers: Answer[]
}

export interface Answer {
  id: number
  text: string
  isCorrect: boolean
}

export interface Result {
  id: number
  user: User
  userId: number
  group: Group
  groupId: number
  test: Test
  testId: number
  userTest: UserTest
  score: number
  totalScore: number
}
