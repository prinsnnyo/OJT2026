import type { Todo } from '~/types'

export function useTodos() {
  const api = useApi()
  const todos = useState<Todo[]>('todos', () => [])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchTodos() {
    loading.value = true
    error.value = null
    try {
      todos.value = await api.get<Todo[]>('/todos')
    }
    catch (err: unknown) {
      const message = (err as { message?: string | string[] }).message ?? 'Failed to load todos'
      error.value = Array.isArray(message) ? message.join(', ') : message
    }
    finally {
      loading.value = false
    }
  }

  async function createTodo(title: string, description?: string) {
    const created = await api.post<Todo>('/todos', { title, description })
    todos.value = [created, ...todos.value]
    return created
  }

  async function updateTodo(
    id: string,
    data: Partial<Pick<Todo, 'title' | 'description' | 'completed'>>,
  ) {
    const updated = await api.put<Todo>(`/todos/${id}`, data)
    todos.value = todos.value.map(t => t.id === id ? updated : t)
    return updated
  }

  async function deleteTodo(id: string) {
    await api.delete(`/todos/${id}`)
    todos.value = todos.value.filter(t => t.id !== id)
  }

  return {
    todos,
    loading,
    error,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
  }
}
