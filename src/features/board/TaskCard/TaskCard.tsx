import { useState } from 'react'
import type { Task } from '@/types'
import { useTaskStore } from '@/store/taskStore'
import { useDraggable } from '@dnd-kit/core'
import TaskModal from '@/features/board/TaskModal/TaskModal'

interface Props {
  task: Task
}

const priorityStyles = {
  low: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-700',
}

function TaskCard({ task }: Props) {
  const deleteTask = useTaskStore((s) => s.deleteTask)
  const [showModal, setShowModal] = useState(false)

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    })

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={`bg-white rounded-lg p-3 shadow-sm flex flex-col gap-2 group ${isDragging ? 'opacity-50' : ''}`}
      >
        <div className="flex items-start justify-between gap-2">
          <span
            {...listeners}
            {...attributes}
            className="text-sm font-medium text-gray-900 cursor-grab active:cursor-grabbing flex-1 select-none"
          >
            ⠿ {task.title}
          </span>
          <button
            onClick={() => deleteTask(task.id)}
            className="text-gray-300 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 text-xs shrink-0"
          >
            ✕
          </button>
        </div>

        <div
          onClick={() => setShowModal(true)}
          className="flex flex-col gap-2 cursor-pointer"
        >
          {task.description && (
            <p className="text-xs text-gray-400 leading-relaxed">
              {task.description}
            </p>
          )}

          <div className="flex items-center justify-between">
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityStyles[task.priority]}`}
            >
              {task.priority}
            </span>
            {task.dueDate && (
              <span className="text-xs text-gray-400">
                {new Date(task.dueDate)
                  .toLocaleDateString('en-GB')
                  .replace(/\//g, '.')}
              </span>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <TaskModal
          defaultStatus={task.status}
          task={task}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}

export default TaskCard
