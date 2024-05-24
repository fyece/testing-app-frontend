import instance from '@/api/axios'
import type { Test, UserTest } from '@/interfaces/test.interface'
import type { User } from '@/interfaces/user.interface'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const getAllUsers = async () => {
    try {
      const { data } = await instance.get('users')
      const users: User[] = data
      return {
        status: 'success',
        users
      }
    } catch (error) {
      return {
        status: 'failed'
      }
    }
  }

  const getUserById = async (id: number) => {
    try {
      const { data } = await instance.get(`users/${id}`)
      const user: User = data
      return {
        status: 'success',
        user
      }
    } catch (error) {
      return {
        status: 'failed'
      }
    }
  }

  const getAllUserTests = async (userId: number) => {
    try {
      const { data } = await instance.get(`users/${userId}/tests`)
      const tests: UserTest[] = data
      return {
        status: 'success',
        tests
      }
    } catch (error) {
      return {
        status: 'failed'
      }
    }
  }

  return {
    getAllUsers,
    getUserById,
    getAllUserTests
  }
})
