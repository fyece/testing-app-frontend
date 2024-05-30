import { defineStore } from 'pinia'
import instance from '@/api/axios'
import type { CreateTest, Test, TestResult, UserTest } from '@/interfaces/test.interface'

export const useTestsStore = defineStore('test', () => {
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

  return { getAllTests, getTestById, getAllUserTests, createTest, getAllTestResultsByTestId }
})
