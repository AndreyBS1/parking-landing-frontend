import axios from 'axios'
import { BASE_API_URL } from '../constants/env-vars.constant'

const instance = axios.create({
  baseURL: BASE_API_URL,
})

export { instance as baseClient }
