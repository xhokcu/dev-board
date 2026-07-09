import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTaskStore } from '@/store/taskStore'
import { useAuthStore } from '@/store/authStore'
import type { Task, TaskStatus } from '@/types'
import { ChevronDown } from 'lucide-react'

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']),
  dueDate: z.string().optional(),
})

type TaskFormData = z.infer<typeof taskSchema>

interface Props {
  defaultStatus: TaskStatus
  onClose: () => void
  task?: Task
}

function TaskModal({ defaultStatus, onClose, task }: Props) {
  const addTask = useTaskStore((s) => s.addTask)
  const updateTask = useTaskStore((s) => s.updateTask)
  const user = useAuthStore((s) => s.user)
  const isEditing = !!task

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      priority: task?.priority || 'medium',
      dueDate: task?.dueDate || '',
    },
  })

  const titleInputRef = useRef<HTMLInputElement | null>(null)
  const { ref: titleRegisterRef, ...titleRegisterRest } = register('title')

  useEffect(() => {
    titleInputRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const onSubmit = async (data: TaskFormData) => {
    if (isEditing) {
      await updateTask(task.id, data)
    } else {
      if (!user) return
      await addTask({ ...data, status: defaultStatus }, user.id)
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
        className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl flex flex-col gap-4"
      >
        <div className="flex items-center justify-between">
          <h2
            id="task-modal-title"
            className="text-lg font-semibold text-gray-900"
          >
            {isEditing ? 'Edit Task' : 'New Task'}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-gray-500 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="task-title"
            className="text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="task-title"
            {...titleRegisterRest}
            ref={(el) => {
              titleRegisterRef(el)
              titleInputRef.current = el
            }}
            placeholder="Task title"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
          />
          {errors.title && (
            <span className="text-xs text-red-500">{errors.title.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="task-description"
            className="text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="task-description"
            {...register('description')}
            placeholder="Optional description"
            rows={3}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 resize-none"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col gap-1 flex-1">
            <label
              htmlFor="task-priority"
              className="text-sm font-medium text-gray-700"
            >
              Priority
            </label>
            <div className="relative">
              <select
                id="task-priority"
                {...register('priority')}
                className="w-full appearance-none rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 pr-8"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                <ChevronDown size={14} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1 flex-1">
            <label
              htmlFor="task-due-date"
              className="text-sm font-medium text-gray-700"
            >
              Due Date
            </label>
            <input
              id="task-due-date"
              {...register('dueDate')}
              type="date"
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-primary-500"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-2">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="flex-1 bg-primary-700 hover:bg-primary-800 text-white py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            {isSubmitting
              ? 'Saving...'
              : isEditing
                ? 'Save Changes'
                : 'Create Task'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskModal
