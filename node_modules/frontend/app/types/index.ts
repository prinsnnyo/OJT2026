export interface User {
  id: string
  email: string
  name: string | null
}

export interface Todo {
  id: string
  title: string
  description: string | null
  completed: boolean
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  accessToken: string
  user: User
}

export interface ApiError {
  message: string | string[]
  statusCode: number
}
