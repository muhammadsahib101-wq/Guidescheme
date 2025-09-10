export interface State {
  _id: string
  name: string
  __v: number
  image: string
}

export interface StateResponse {
  success: boolean
  length: number
  data: State[]
  message: string
  image: string
}