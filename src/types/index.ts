export type Priority = 'low' | 'medium' | 'high'

export type TaskStatus = 'backlog' | 'in-progress' | 'review' | 'done'

export interface User {
  id: string
  email: string
  name: string
}

export interface Task {
  id: string
  title: string
  description?: string
  priority: Priority
  status: TaskStatus
  createdAt: string
  dueDate?: string
}

export interface Board {
  id: string
  title: string
  tasks: Task[]
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  register: (name: string, email: string, password: string) => boolean
  logout: () => void
}
