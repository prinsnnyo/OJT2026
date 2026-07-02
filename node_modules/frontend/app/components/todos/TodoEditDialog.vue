<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { updateTodoSchema } from '~/schemas'
import type { Todo } from '~/types'
const props = defineProps<{
  todo: Todo | null
  open: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  saved: []
}>()

const inputClass = cn(
  'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm',
  'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
)

const { updateTodo } = useTodos()
const isSubmitting = ref(false)
const errorMessage = ref<string | null>(null)

const { handleSubmit, defineField, errors, resetForm, setValues } = useForm({
  validationSchema: toTypedSchema(updateTodoSchema),
  initialValues: {
    title: '',
    description: '',
    completed: false,
  },
})

const [title] = defineField('title')
const [description] = defineField('description')
const [completed] = defineField('completed')

watch(
  () => props.todo,
  (todo) => {
    if (todo) {
      setValues({
        title: todo.title,
        description: todo.description ?? '',
        completed: todo.completed,
      })
    }
    else {
      resetForm()
    }
  },
  { immediate: true },
)

function close() {
  emit('update:open', false)
}

const onSubmit = handleSubmit(async (values) => {
  if (!props.todo) return

  errorMessage.value = null
  isSubmitting.value = true
  try {
    await updateTodo(props.todo.id, {
      title: values.title,
      description: values.description || undefined,
      completed: values.completed,
    })
    emit('saved')
    close()
  }
  catch (err: unknown) {
    const message = (err as { message?: string | string[] }).message
    errorMessage.value = Array.isArray(message) ? message.join(', ') : (message ?? 'Failed to update todo')
  }
  finally {
    isSubmitting.value = false
  }
})
</script>

<template>
  <div
    v-if="open && todo"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    @click.self="close"
  >
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle>Edit task</CardTitle>
        <CardDescription>Change the task details or mark it done</CardDescription>
      </CardHeader>
      <CardContent>
        <form class="space-y-4" novalidate @submit="onSubmit">
          <div class="space-y-2">
            <Label for="edit-title">Title</Label>
            <input
              id="edit-title"
              v-model="title"
              type="text"
              :class="inputClass"
              placeholder="Todo title"
            >
            <p v-if="errors.title" class="text-sm text-destructive">
              {{ errors.title }}
            </p>
          </div>

          <div class="space-y-2">
            <Label for="edit-description">Description</Label>
            <input
              id="edit-description"
              v-model="description"
              type="text"
              :class="inputClass"
              placeholder="Optional description"
            >
            <p v-if="errors.description" class="text-sm text-destructive">
              {{ errors.description }}
            </p>
          </div>

          <div class="flex items-center gap-2">
            <Checkbox id="edit-completed" v-model:checked="completed" />
            <Label for="edit-completed">Mark as completed</Label>
          </div>

          <p v-if="errorMessage" class="text-sm text-destructive">
            {{ errorMessage }}
          </p>

          <div class="flex justify-end gap-2">
            <Button type="button" variant="outline" @click="close">
              Cancel
            </Button>
            <Button type="submit" :disabled="isSubmitting">
              {{ isSubmitting ? 'Saving...' : 'Save changes' }}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
