<script setup lang="ts">
import type { Todo } from '~/types'
import { LogOut } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import TodoEditDialog from '~/components/todos/TodoEditDialog.vue'
import TodoList from '~/components/todos/TodoList.vue'

definePageMeta({
  middleware: 'auth',
})

const { user, logout } = useAuth()
const { todos, loading, error, fetchTodos, updateTodo, deleteTodo } = useTodos()

const editDialogOpen = ref(false)
const selectedTodo = ref<Todo | null>(null)
const actionError = ref<string | null>(null)

onMounted(() => {
  fetchTodos()
})

function openEdit(todo: Todo) {
  selectedTodo.value = todo
  editDialogOpen.value = true
}

async function handleDelete(todo: Todo) {
  if (!confirm(`Delete "${todo.title}"?`)) return

  actionError.value = null
  try {
    await deleteTodo(todo.id)
  }
  catch (err: unknown) {
    const message = (err as { message?: string }).message
    actionError.value = message ?? 'Delete failed'
    await fetchTodos()
  }
}

async function handleToggleComplete(todo: Todo, completed: boolean) {
  if (todo.completed === completed) return

  actionError.value = null
  try {
    await updateTodo(todo.id, { completed })
  }
  catch (err: unknown) {
    const message = (err as { message?: string }).message
    actionError.value = message ?? 'Update failed'
    await fetchTodos()
  }
}
</script>

<template>
  <div class="min-h-screen bg-muted/30">
    <header class="border-b bg-background">
      <div class="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
        <div>
          <h1 class="text-xl font-semibold">
            My Todo List
          </h1>
          <p v-if="user" class="text-sm text-muted-foreground">
            Signed in as {{ user.name ?? user.email }}
          </p>
        </div>
        <Button variant="outline" @click="logout">
          <LogOut class="h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>

    <main class="mx-auto max-w-2xl space-y-4 p-4">
      <p v-if="error" class="text-sm text-destructive">
        {{ error }}
      </p>
      <p v-if="actionError" class="text-sm text-destructive">
        {{ actionError }}
      </p>

      <TodoList
        :todos="todos"
        :loading="loading"
        @edit="openEdit"
        @delete="handleDelete"
        @toggle-complete="handleToggleComplete"
        @created="fetchTodos"
      />

      <TodoEditDialog
        v-model:open="editDialogOpen"
        :todo="selectedTodo"
        @saved="editDialogOpen = false"
      />
    </main>
  </div>
</template>
