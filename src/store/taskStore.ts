import { create } from 'zustand'
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { Task, TaskStatus } from '@/types'

interface TaskState {
  tasks: Task[]
  isLoading: boolean
  subscribeToTasks: (userId: string) => () => void
  addTask: (
    task: Omit<Task, 'id' | 'createdAt'>,
    userId: string
  ) => Promise<void>
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  moveTask: (id: string, status: TaskStatus) => Promise<void>
}

export const useTaskStore = create<TaskState>()((set, get) => ({
  tasks: [],
  isLoading: false,

  subscribeToTasks: (userId) => {
    set({ isLoading: true })
    const q = query(collection(db, 'tasks'), where('userId', '==', userId))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[]
      set({ tasks, isLoading: false })
    })
    return unsubscribe
  },

  addTask: async (task, userId) => {
    await addDoc(collection(db, 'tasks'), {
      ...task,
      userId,
      createdAt: new Date().toISOString(),
    })
  },

  updateTask: async (id, updates) => {
    await updateDoc(doc(db, 'tasks', id), updates)
  },

  deleteTask: async (id) => {
    await deleteDoc(doc(db, 'tasks', id))
  },

  moveTask: async (id, status) => {
    await updateDoc(doc(db, 'tasks', id), { status })
  },
}))
