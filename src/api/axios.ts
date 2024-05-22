import axios from 'axios'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const token = computed(() => localStorage.getItem('token'))

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, PUT, POST, DELETE',
    'X-Requested-With': 'XMLHttpRequest',
    Authorization: `Bearer ${token.value}`
  },
  withCredentials: false,
  validateStatus: function (status) {
    return status < 500
  }
})
instance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response.data.message === 'Unauthenticated.') {
      localStorage.removeItem('token')
      router.push({
        path: '/login',
        query: {
          backUrl: router.currentRoute.value.fullPath
        }
      })
    }
  }
)

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance
