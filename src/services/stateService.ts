import { State, StateResponse } from '@/types/type'
import apiClient from './httpClient'


export const getAllStates = async (): Promise<State[]> => {
  try {
    const response = await apiClient.get<StateResponse>('getAllStates')
    return response.data.data
  } catch (error) {
    console.error('Error fetching states:', error)
    return []
  }
} 