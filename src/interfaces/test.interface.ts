import type { Group } from './group.interface'
import type { User } from './user.interface'

export interface Test {
  id: number
  name: String
  description: String
  ownerId: number
  questions: Question[]
  results: Result[]
  userTests: UserTest[]
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
