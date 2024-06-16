import { defineStore } from 'pinia'
import instance from '@/api/axios'
import type { Result } from '@/interfaces/test.interface'

export const userResultService = defineStore('result', () => {
  async function getResultByTestId(id: number) {
    try {
      const { data } = await instance.get(`tests/results/${id}`)
      const result: Result = data
      return {
        status: 'success',
        result
      }
    } catch (error) {
      return {
        status: 'failed',
        result: null
      }
    }
  }

  return { getResultByTestId }
})
