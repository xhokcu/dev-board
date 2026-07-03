import { useState } from 'react'
import { useDroppable } from '@dnd-kit/core'
import type { Task, TaskStatus } from '@/types'
import TaskCard from '@/features/board/TaskCard/TaskCard'
import TaskModal from '@/features/board/TaskModal/TaskModal'

interface Props {
  id: TaskStatus
  label: string
  tasks: Task[]
}

const columnStyles: Record<TaskStatus, { bg: string; dot: string }> = {
  backlog: { bg: 'bg-gray-200', dot: 'bg-gray-400' },
  'in-progress': { bg: 'bg-blue-50', dot: 'bg-blue-400' },
  review: { bg: 'bg-yellow-50', dot: 'bg-yellow-400' },
  done: { bg: 'bg-green-50', dot: 'bg-green-400' },
}

function Column({ id, label, tasks }: Props) {
  const [showModal, setShowModal] = useState(false)
  const { setNodeRef, isOver } = useDroppable({ id })
  const style = columnStyles[id]

  return (
    <div
      className={`${style.bg} rounded-xl p-3 flex flex-col gap-3 min-h-[300px] lg:min-h-[500px]`}
    >
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${style.dot}`} />
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-xs bg-white text-gray-500 rounded-full px-2 py-0.5">
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="text-gray-400 hover:text-primary-500 transition-colors text-lg leading-none"
        >
          +
        </button>
      </div>

      <div
        ref={setNodeRef}
        className={`flex flex-col gap-2 flex-1 rounded-lg transition-colors ${isOver ? 'bg-primary-100' : ''}`}
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {showModal && (
        <TaskModal defaultStatus={id} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}

export default Column
