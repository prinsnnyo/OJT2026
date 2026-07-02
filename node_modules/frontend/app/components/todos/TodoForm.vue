<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { cn } from '@/lib/utils'
import { createTodoSchema } from '~/schemas'

const emit = defineEmits<{
  created: []
}>()

const inputClass = cn(
  'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm',
  'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
)

const { createTodo } = useTodos()
const isSubmitting = ref(false)
const errorMessage = ref<string | null>(null)

const { handleSubmit, defineField, errors, resetForm } = useForm({
  validationSchema: toTypedSchema(createTodoSchema),
  initialValues: {
    title: '',
    description: '',
  },
})

const [title] = defineField('title')
const [description] = defineField('description')

const onSubmit = handleSubmit(async (values) => {
  errorMessage.value = null
  isSubmitting.value = true
  try {
    await createTodo(values.title, values.description || undefined)
    resetForm()
    emit('created')
  }
  catch (err: unknown) {
    const message = (err as { message?: string | string[] }).message
    errorMessage.value = Array.isArray(message) ? message.join(', ') : (message ?? 'Failed to create todo')
  }
  finally {
    isSubmitting.value = false
  }
})
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Add todo</CardTitle>
      <CardDescription>Create a new task</CardDescription>
    </CardHeader>
    <CardContent>
      <form class="space-y-4" novalidate @submit="onSubmit">
        <div class="space-y-2">
          <Label for="todo-title">Title</Label>
          <input id="todo-title" v-model="title" type="text" :class="inputClass" placeholder="What needs to be done?">
          <p v-if="errors.title" class="text-sm text-destructive">
            {{ errors.title }}
          </p>
        </div>

        <div class="space-y-2">
          <Label for="todo-description">Description (optional)</Label>
          <input id="todo-description" v-model="description" type="text" :class="inputClass" placeholder="Add more details...">
          <p v-if="errors.description" class="text-sm text-destructive">
            {{ errors.description }}
          </p>
        </div>

        <p v-if="errorMessage" class="text-sm text-destructive">
          {{ errorMessage }}
        </p>

        <Button type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'Adding...' : 'Add todo' }}
        </Button>
      </form>
    </CardContent>
  </Card>
</template>
