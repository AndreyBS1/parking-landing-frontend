import { Mutex } from 'async-mutex'
import axios, { AxiosError, HttpStatusCode } from 'axios'
import { BASE_API_URL } from '../constants/env-vars.constant'
import { useAuthStore } from '../stores/use-auth-store.hook'

const instance = axios.create({
  baseURL: BASE_API_URL,
})

const mutex = new Mutex()

instance.interceptors.request.use(async (config) => {
  if (mutex.isLocked()) {
    await mutex.waitForUnlock()
  }
  const { accessToken } = useAuthStore.getState()
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

instance.interceptors.response.use(undefined, async (error: AxiosError) => {
  if (error.response?.status === HttpStatusCode.Unauthorized) {
    useAuthStore.setState({ accessToken: null })
    return
  }
  throw error
})

export { instance as adminClient }
