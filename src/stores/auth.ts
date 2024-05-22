import instance from '@/api/axios'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  async function login(email: string, password: string) {
    try {
      const { data } = await instance.post('auth/login', { email, password })
      if (data.access_token) {
        localStorage.setItem('token', data.access_token)
        return {
          status: 'success'
        }
      }
      return {
        status: 'failed',
        message: 'Неверный логин или пароль'
      }
    } catch (error) {
      console.warn(error)
      localStorage.removeItem('token')
      return {
        status: 'failed',
        message: 'Ошибка входа'
      }
    }
  }

  const getProfile = async () => {
    try {
      const { data } = await instance.get('auth/profile')
      if (data.id) {
        const { role } = data
        localStorage.setItem('role', role)
        return {
          status: 'success'
        }
      } else {
        localStorage.removeItem('role')
        return {
          status: 'failed'
        }
      }
    } catch (error) {
      console.warn(error)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
  }

  return { login, getProfile, logout }
})
