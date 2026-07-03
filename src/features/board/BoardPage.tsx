import { useEffect } from 'react'
import { DndContext, type DragEndEvent } from '@dnd-kit/core'
import Navbar from '@/components/Navbar/Navbar'
import Column from '@/features/board/Column/Column'
import { useTaskStore } from '@/store/taskStore'
import { useAuthStore } from '@/store/authStore'
import type { TaskStatus } from '@/types'

const COLUMNS: { id: TaskStatus; label: string }[] = [
  { id: 'backlog', label: 'Backlog' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'review', label: 'Review' },
  { id: 'done', label: 'Done' },
]

function BoardPage() {
  const tasks = useTaskStore((s) => s.tasks)
  const moveTask = useTaskStore((s) => s.moveTask)
  const subscribeToTasks = useTaskStore((s) => s.subscribeToTasks)
  const user = useAuthStore((s) => s.user)

  useEffect(() => {
    if (!user) return
    const unsubscribe = subscribeToTasks(user.id)
    return unsubscribe
  }, [user])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return
    moveTask(active.id as string, over.id as TaskStatus)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-6">My Board</h1>
        <DndContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {COLUMNS.map((col) => (
              <Column
                key={col.id}
                id={col.id}
                label={col.label}
                tasks={tasks.filter((t) => t.status === col.id)}
              />
            ))}
          </div>
        </DndContext>
      </div>
    </div>
  )
}

export default BoardPage
