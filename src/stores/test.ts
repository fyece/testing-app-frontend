import { defineStore } from 'pinia'
import instance from '@/api/axios'
import type { UserTest } from '@/interfaces/test.interface'

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

  return { getAllUserTests }
})
