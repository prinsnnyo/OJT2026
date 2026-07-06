<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { loginSchema } from '~/schemas'

definePageMeta({
  middleware: 'guest',
  layout: false,
})

const inputClass = cn(
  'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm',
  'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
)

const { login } = useAuth()
const errorMessage = ref<string | null>(null)
const isSubmitting = ref(false)

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: toTypedSchema(loginSchema),
  initialValues: {
    email: '',
    password: '',
  },
})

const [email] = defineField('email')
const [password] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  errorMessage.value = null
  isSubmitting.value = true
  try {
    await login(values.email, values.password)
    await navigateTo('/todos')
  }
  catch (err: unknown) {
    const message = (err as { message?: string | string[] }).message
    errorMessage.value = Array.isArray(message) ? message.join(', ') : (message ?? 'Login failed')
  }
  finally {
    isSubmitting.value = false
  }
})
</script>

<template>
  <div class="flex min-h-screen items-center justify-center p-4">
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>
          Log in to enter the intern training workspace
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form class="space-y-4" novalidate @submit="onSubmit">
          <div class="space-y-2">
            <Label for="email">Email</Label>
            <input
              id="email"
              v-model="email"
              type="text"
              inputmode="email"
              :class="inputClass"
              placeholder="you@example.com"
              autocomplete="email"
            >
            <p v-if="errors.email" class="text-sm text-destructive">
              {{ errors.email }}
            </p>
          </div>

          <div class="space-y-2">
            <Label for="password">Password</Label>
            <input
              id="password"
              v-model="password"
              type="password"
              :class="inputClass"
              placeholder="••••••••"
              autocomplete="current-password"
            >
            <p v-if="errors.password" class="text-sm text-destructive">
              {{ errors.password }}
            </p>
          </div>

          <p v-if="errorMessage" class="text-sm text-destructive">
            {{ errorMessage }}
          </p>

          <Button type="submit" class="w-full" :disabled="isSubmitting">
            {{ isSubmitting ? 'Signing in...' : 'Sign in' }}
          </Button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
