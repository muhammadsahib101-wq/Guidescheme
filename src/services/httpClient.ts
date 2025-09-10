import { API_BASE_URL } from "@/constants/confiq"
import axios from 'axios'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default apiClient