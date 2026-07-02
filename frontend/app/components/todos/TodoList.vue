<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { Pencil, Plus, Trash2 } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { createTodoSchema } from '~/schemas'
import type { Todo } from '~/types'
defineProps<{
  todos: Todo[]
  loading?: boolean
}>()

const emit = defineEmits<{
  edit: [todo: Todo]
  delete: [todo: Todo]
  toggleComplete: [todo: Todo, completed: boolean]
  created: []
}>()

const inputClass = cn(
  'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm',
  'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
)

const { createTodo } = useTodos()
const isSubmitting = ref(false)
const addError = ref<string | null>(null)

const { handleSubmit, defineField, errors, resetForm } = useForm({
  validationSchema: toTypedSchema(createTodoSchema),
  initialValues: {
    title: '',
    description: '',
  },
})

const [title] = defineField('title')
const [description] = defineField('description')

const onAdd = handleSubmit(async (values) => {
  addError.value = null
  isSubmitting.value = true
  try {
    await createTodo(values.title, values.description || undefined)
    resetForm()
    emit('created')
  }
  catch (err: unknown) {
    const message = (err as { message?: string | string[] }).message
    addError.value = Array.isArray(message) ? message.join(', ') : (message ?? 'Failed to add task')
  }
  finally {
    isSubmitting.value = false
  }
})
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>My tasks</CardTitle>
      <CardDescription>Add, edit, complete, or delete your tasks</CardDescription>
    </CardHeader>
    <CardContent class="space-y-6">
      <form class="space-y-3" novalidate @submit="onAdd">
        <div class="flex flex-col gap-2 sm:flex-row">
          <input
            v-model="title"
            type="text"
            :class="inputClass"
            placeholder="What needs to be done?"
          >
          <Button type="submit" class="shrink-0" :disabled="isSubmitting">
            <Plus class="h-4 w-4" />
            {{ isSubmitting ? 'Adding...' : 'Add task' }}
          </Button>
        </div>
        <input
          v-model="description"
          type="text"
          :class="inputClass"
          placeholder="Description (optional)"
        >
        <p v-if="errors.title" class="text-sm text-destructive">
          {{ errors.title }}
        </p>
        <p v-if="errors.description" class="text-sm text-destructive">
          {{ errors.description }}
        </p>
        <p v-if="addError" class="text-sm text-destructive">
          {{ addError }}
        </p>
      </form>

      <div v-if="loading" class="py-8 text-center text-sm text-muted-foreground">
        Loading tasks...
      </div>

      <div v-else-if="todos.length === 0" class="rounded-lg border border-dashed py-10 text-center text-sm text-muted-foreground">
        No tasks yet. Add your first task above.
      </div>

      <ul v-else class="divide-y rounded-lg border">
        <li
          v-for="todo in todos"
          :key="todo.id"
          class="flex items-start gap-3 p-4 transition-colors hover:bg-muted/40"
        >
          <Checkbox
            class="mt-0.5"
            :checked="todo.completed"
            @update:checked="(checked) => checked !== 'indeterminate' && emit('toggleComplete', todo, checked)"
          />

          <div class="min-w-0 flex-1">
            <p
              class="font-medium"
              :class="todo.completed ? 'text-muted-foreground line-through' : ''"
            >
              {{ todo.title }}
            </p>
            <p v-if="todo.description" class="mt-1 text-sm text-muted-foreground">
              {{ todo.description }}
            </p>
          </div>

          <div class="flex shrink-0 gap-1">
            <Button
              variant="ghost"
              size="icon"
              title="Edit task"
              @click="emit('edit', todo)"
            >
              <Pencil class="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              title="Delete task"
              class="text-destructive hover:text-destructive"
              @click="emit('delete', todo)"
            >
              <Trash2 class="h-4 w-4" />
            </Button>
          </div>
        </li>
      </ul>
    </CardContent>
  </Card>
</template>
