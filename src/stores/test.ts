import { defineStore } from 'pinia'
import instance from '@/api/axios'
import type {
  CreateTest,
  Test,
  TestResult,
  UserTest,
  UserTestDto
} from '@/interfaces/test.interface'
import { ref } from 'vue'

export const useTestsStore = defineStore('test', () => {
  const currentResults = ref<TestResult[] | null>(null)
  async function getAllUserTests() {
    try {
      const { data } = await instance.get('tests/user')
      const tests: UserTest[] = data
      if (tests) {
        return {
          status: 'success',
          tests
        }
      } else {
        return {
          status: 'failed'
        }
      }
    } catch (error) {
      return {
        status: 'failed'
      }
    }
  }

  const getAllTests = async () => {
    try {
      const { data } = await instance.get('tests')
      const tests: Test[] = data
      return {
        status: 'success',
        tests: tests
      }
    } catch (error) {
      return {
        status: 'failed'
      }
    }
  }

  async function getTestById(id: number) {
    try {
      const { data } = await instance.get(`tests/${id}`)
      const test: Test = data
      return {
        status: 'success',
        test
      }
    } catch (error) {
      return {
        status: 'failed'
      }
    }
  }

  async function getAllTestResultsByTestId(id: number) {
    try {
      const { data } = await instance.get(`tests/${id}/results`)
      const results: TestResult[] = data
      currentResults.value = results
      return {
        status: 'success',
        results
      }
    } catch (error) {
      return {
        status: 'failed'
      }
    }
  }

  async function getAllTestsResults() {
    try {
      const { data } = await instance.get(`tests/results`)
      const results: TestResult[] = data
      currentResults.value = results
      return {
        status: 'success',
        results
      }
    } catch (error) {
      return {
        status: 'failed'
      }
    }
  }

  async function createTest(testData: CreateTest) {
    try {
      const { data } = await instance.post('tests', testData)
      return {
        status: 'success',
        test: data
      }
    } catch (error) {
      return {
        status: 'failed'
      }
    }
  }

  async function submitTest(userTestDto: UserTestDto) {
    try {
      const { data } = await instance.post('tests/submit', userTestDto)
      return {
        status: 'success',
        test: data
      }
    } catch (error) {
      return {
        status: 'failed'
      }
    }
  }

  async function addUsersToTest(testId: number, usersIds: number[]) {
    try {
      const { data } = await instance.post(`tests/${testId}/users`, { usersId: usersIds })
      return {
        status: 'success',
        test: data
      }
    } catch (error) {
      return {
        status: 'failed'
      }
    }
  }

  async function addGroupsToTest(testId: number, groupsId: number[]) {
    try {
      const { data } = await instance.post(`tests/${testId}/groups`, { groupsId: groupsId })
      return {
        status: 'success',
        test: data
      }
    } catch (error) {
      return {
        status: 'failed'
      }
    }
  }

  return {
    currentResults,
    getAllTests,
    getTestById,
    getAllUserTests,
    createTest,
    getAllTestsResults,
    getAllTestResultsByTestId,
    submitTest,
    addUsersToTest,
    addGroupsToTest
  }
})
